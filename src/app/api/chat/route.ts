import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { portfolioData } from "@/data/portfolio";
import { checkRateLimit } from "@/lib/rate-limit";

const chatSchema = z.object({
  message: z.string().min(1).max(500),
});

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check: Max 15 requests per 10 mins
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const rateLimit = checkRateLimit(ip, 15, 10 * 60 * 1000);

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many messages. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    // 2. Body Validation & Sanitization
    const rawBody = await req.json();
    const parseResult = chatSchema.safeParse(rawBody);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid message payload." },
        { status: 400 }
      );
    }

    // Strip HTML tags for defense against XSS / injection
    const userMessage = parseResult.data.message.replace(/<[^>]*>/g, "").trim();

    // 3. Fallback Smart Portfolio Responder (Grounded strictly in Waleed's Data Layer)
    const lower = userMessage.toLowerCase();
    let reply = `I'm Waleed Hassan's AI Assistant. ${portfolioData.bioSummary}`;

    if (lower.includes("skill") || lower.includes("tech") || lower.includes("stack") || lower.includes("languages")) {
      reply = `Waleed's core tech stack spans:\\n• **Languages & Frameworks**: TypeScript, JavaScript, Python, C++, C#, React, Astro, Tailwind CSS.\\n• **AI Engineering**: Conversational AI Architecture, Client-Side RAG, Prompt Engineering, Gemini & OpenAI APIs.\\n• **Databases & Tools**: SQL, MySQL, Relational Schema Design, Git, Linux.`;
    } else if (lower.includes("project") || lower.includes("thesis") || lower.includes("assignment") || lower.includes("solitaire") || lower.includes("inventory")) {
      reply = `Waleed's 4 core featured projects include:\\n1. **Assignment Management System** (Algorithms & DSA in Python)\\n2. **Thesis Management System** (Normalized Relational Database in MySQL)\\n3. **Solitaire Game** (Low-latency game loop & state machine in C++)\\n4. **Inventory Management System** (Object-oriented retail store system in C#).`;
    } else if (lower.includes("education") || lower.includes("university") || lower.includes("uet") || lower.includes("degree")) {
      reply = `Waleed is currently pursuing his BSc in Computer Science at the prestigious **University of Engineering and Technology (UET), Lahore**, focusing on algorithms, database systems, and full-stack web architectures.`;
    } else if (lower.includes("experience") || lower.includes("work") || lower.includes("job") || lower.includes("mega market")) {
      reply = `Waleed's professional experience includes:\\n• **BSc Computer Science** @ UET Lahore (Present)\\n• **Data Entry Specialist** at H&R Mega Market (Catalog data consistency, transaction audits, and inventory logging)\\n• Active practice areas across Frontend Web Development, Desktop Systems, and Game Development.`;
    } else if (lower.includes("contact") || lower.includes("email") || lower.includes("hire") || lower.includes("reach")) {
      reply = `You can get in touch with Waleed directly at **${portfolioData.email}** or connect on LinkedIn ([linkedin.com/in/waleed-hassan-98768b330](${portfolioData.socials.linkedin})) and GitHub ([github.com/Waleedhasn](${portfolioData.socials.github})).`;
    }

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
