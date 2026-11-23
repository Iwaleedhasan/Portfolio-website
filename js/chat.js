// Floating AI Assistant Chat Widget for Waleed Hassan
// Fully Theme-Adaptive (Light/Dark), Mobile-Optimized, and Human Conversational
(function() {
  const KNOWLEDGE = {
    greetings: [
      "Hello! Welcome to Waleed's portfolio. I'm his interactive assistant. How can I help you today?",
      "Hi there! Glad to have you here. I can tell you all about Waleed's projects, skills, education, or how to get in touch with him.",
      "Hey! Welcome! Feel free to ask me anything about Waleed's work, tech stack, or background."
    ],
    howAreYou: "I'm doing great, thank you for asking! I'm here and ready to help you explore Waleed's software engineering journey. What would you like to know?",
    food: "Waleed is a big fan of pizza! Especially a hot, cheesy pizza while engineering code late at night. What kind of food do you like?",
    about: "Waleed Hassan is a Computer Science undergraduate at the University of Engineering and Technology (UET), Lahore, living in Gujranwala, Pakistan. He specializes in responsive modern web development, conversational AI architectures, relational database systems, and algorithmic software engineering.",
    education: `Here is Waleed's educational background:

• **BSc Computer Science (2024 – Present)**
University of Engineering and Technology (UET), Lahore.
Currently pursuing undergraduate studies focusing on data structures, algorithms, relational database architectures, and software engineering.

• **FSc Pre-Engineering (2022 – 2024)**
Punjab Group of Colleges (PGC), Gujranwala.
Graduated in 2024 with a strong academic foundation in mathematics, physics, and analytical problem-solving.

• **Matriculation in Science (2020 – 2022)**
Jadeed Dastgir Ideal High School, Gujranwala.
Completed secondary school education in 2022 with high academic distinction in core sciences and mathematics.`,

    projects: `Here are Waleed's 4 featured engineering projects:

1. **Assignment Management System**
An algorithmic workflow coordination system built in Python utilizing custom Data Structures and Queue Logic. It automates student assignment submissions, deadlines, and evaluations.

2. **Thesis Management System**
A relational database application designed with SQL and MySQL. It coordinates undergraduate thesis proposals, manages supervisor allocations, and tracks evaluation milestones.

3. **Solitaire Game**
A low-latency desktop card game engineered in C++. It features deterministic deck shuffling algorithms, legal move verification, and efficient state machines.

4. **Inventory Management System**
An object-oriented desktop application built in C# and .NET. It features automated stock threshold alerts, catalog ledgers, and consistent transaction logging.`,

    skills: `Waleed's technical skills and proficiencies include:

• **Programming Languages:** TypeScript, JavaScript (ES6+), Python, C++, C#, SQL, HTML5, CSS3.
• **Web & Frontend:** React, Astro, Tailwind CSS, Responsive Mobile-First Design, WCAG AA Accessibility.
• **AI Engineering:** Conversational AI Architectures, Prompt Engineering, Client-Side RAG, Gemini API, OpenAI API.
• **Databases & Systems:** MySQL, Relational Database Schema Design, Node.js, Serverless Functions.
• **Developer Tools:** Git, GitHub, Linux / Bash, Vite, npm, Vercel.`,

    experience: `Waleed's academic and practical experience:

• **Undergraduate Studies in Computer Science (2024 – Present)**
Active studies and software engineering at University of Engineering and Technology (UET), Lahore.

• **Data Entry Specialist at H&R Mega Market (Verified Employment)**
Managed operational catalog records, audited transactions, and maintained accurate inventory logging with high attention to detail.

• **Software & Web Engineering Practice**
Built modern responsive web applications, low-latency C++ algorithmic games, and relational MySQL database systems.`,

    contact: `You can reach Waleed directly through any of the following channels:

• **Direct Email:** [waleed2206420@gmail.com](mailto:waleed2206420@gmail.com)
• **Location:** Gujranwala, Pakistan · UET Lahore
• **LinkedIn:** [linkedin.com/in/waleed-hassan-98768b330](https://www.linkedin.com/in/waleed-hassan-98768b330)
• **GitHub:** [github.com/Iwaleedhasan](https://github.com/Iwaleedhasan)

You can also send a direct message using the contact form at the bottom of this website!`,

    fallback: "I'd love to help with that! You can ask me about Waleed's education at UET Lahore, his 4 featured projects, his technical skills, his favorite food (pizza!), or how to get in touch with him. Feel free to tap one of the quick options above or type your question!"
  };

  function formatMarkdown(text) {
    if (!text) return "";
    let clean = text.replace(/\\n/g, "\n");
    clean = clean.replace(/\r\n/g, "\n");

    const sections = clean.split(/\n\n+/);
    return sections.map(sec => {
      let lines = sec.split("\n").map(l => l.trim()).filter(Boolean);
      if (lines.length === 0) return "";

      const isBullet = lines.every(l => l.startsWith("• ") || l.startsWith("- "));
      const isNumbered = lines.every(l => /^\d+\.\s/.test(l));

      if (isBullet) {
        const lis = lines.map(l => {
          let content = l.replace(/^[•\-]\s*/, "");
          return `<li style="margin-bottom: 6px;">${parseInline(content)}</li>`;
        }).join("");
        return `<ul style="margin: 6px 0 10px 0; padding-left: 20px; list-style-type: disc;">${lis}</ul>`;
      }

      if (isNumbered) {
        const lis = lines.map(l => {
          let content = l.replace(/^\d+\.\s*/, "");
          return `<li style="margin-bottom: 6px;">${parseInline(content)}</li>`;
        }).join("");
        return `<ol style="margin: 6px 0 10px 0; padding-left: 20px; list-style-type: decimal;">${lis}</ol>`;
      }

      return `<p style="margin: 0 0 8px 0; line-height: 1.55;">${lines.map(parseInline).join("<br/>")}</p>`;
    }).join("");
  }

  function parseInline(str) {
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline; font-weight: 600;">$1 ↗</a>');
  }

  function initChat() {
    // Inject Theme-Aware Styles for Chat Widget
    const style = document.createElement('style');
    style.id = 'waleed-chat-styles';
    style.textContent = `
      .waleed-chat-fab {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 999;
        background: var(--sc-ink, #f5f4f0);
        color: var(--sc-canvas, #101217);
        border: 1px solid var(--line, rgba(255,255,255,0.14));
        border-radius: 999px;
        padding: 12px 20px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: inherit;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 12px 32px rgba(0,0,0,0.35);
        transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s;
      }
      .waleed-chat-fab:hover {
        transform: translateY(-2px) scale(1.04);
        box-shadow: 0 16px 40px rgba(0,0,0,0.45);
      }
      .waleed-chat-panel {
        position: fixed;
        bottom: 84px;
        right: 24px;
        width: min(400px, calc(100vw - 32px));
        height: 540px;
        max-height: calc(100svh - 110px);
        background: var(--sc-surface, #141416);
        color: var(--sc-ink, #f5f4f0);
        border: 1px solid var(--line, rgba(255, 255, 255, 0.14));
        border-radius: 20px;
        box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
        z-index: 1000;
        overflow: hidden;
        font-family: inherit;
        transform: translateY(16px) scale(0.96);
        opacity: 0;
        pointer-events: none;
        transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
      }
      .waleed-chat-panel.is-open {
        transform: translateY(0) scale(1);
        opacity: 1;
        pointer-events: auto;
      }
      .chat-header {
        padding: 14px 18px;
        border-bottom: 1px solid var(--line, rgba(255,255,255,0.08));
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: var(--surface-strong, #1a1a1e);
      }
      .chat-messages {
        flex: 1;
        padding: 16px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 12px;
        box-sizing: border-box;
      }
      .chat-bubble-user {
        align-self: flex-end;
        background: var(--sc-ink, #282830);
        color: var(--sc-canvas, #ffffff);
        padding: 10px 16px;
        border-radius: 16px 16px 4px 16px;
        font-size: 13.5px;
        max-width: 82%;
        line-height: 1.45;
        word-break: break-word;
      }
      .chat-bubble-ai {
        align-self: flex-start;
        background: var(--surface-strong, rgba(255,255,255,0.06));
        color: var(--sc-ink, #f5f4f0);
        padding: 12px 16px;
        border-radius: 16px 16px 16px 4px;
        font-size: 13.5px;
        max-width: 90%;
        line-height: 1.5;
        border: 1px solid var(--line, rgba(255,255,255,0.08));
        word-break: break-word;
      }
      .chat-chip {
        background: var(--surface-strong, rgba(255,255,255,0.08));
        border: 1px solid var(--line, rgba(255,255,255,0.12));
        color: var(--sc-ink, #e5e5e7);
        padding: 6px 12px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        white-space: nowrap;
        transition: background 0.15s, transform 0.15s;
        font-family: inherit;
      }
      .chat-chip:hover {
        background: var(--accent-wash, rgba(255,255,255,0.14));
        transform: translateY(-1px);
      }
      .chat-footer {
        padding: 12px 14px;
        border-top: 1px solid var(--line, rgba(255,255,255,0.08));
        display: flex;
        gap: 8px;
        background: var(--surface-strong, #18181c);
      }
      .chat-input {
        flex: 1;
        background: var(--sc-surface, rgba(255,255,255,0.06));
        border: 1px solid var(--line, rgba(255,255,255,0.12));
        border-radius: 10px;
        padding: 10px 14px;
        color: var(--sc-ink, #fff);
        font-size: 13.5px;
        outline: none;
        font-family: inherit;
      }
      .chat-input:focus {
        border-color: var(--sc-ink, #fff);
      }
      .chat-send-btn {
        background: var(--sc-ink, #f5f4f0);
        color: var(--sc-canvas, #101217);
        border: none;
        border-radius: 10px;
        padding: 0 16px;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.2s;
      }
      .chat-send-btn:hover {
        opacity: 0.9;
      }
      @media (max-width: 600px) {
        .waleed-chat-fab {
          bottom: 18px;
          right: 18px;
          padding: 10px 16px;
          font-size: 13px;
        }
        .waleed-chat-panel {
          bottom: 74px;
          right: 12px;
          left: 12px;
          width: auto;
          height: min(520px, calc(100svh - 96px));
          border-radius: 18px;
        }
      }
    `;
    document.head.appendChild(style);

    // 1. Create Floating Action Button (FAB)
    const fab = document.createElement('button');
    fab.className = 'waleed-chat-fab';
    fab.setAttribute('aria-label', "Open Waleed's AI Assistant");
    fab.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      <span>Ask AI</span>
    `;

    // 2. Create Chat Panel
    const panel = document.createElement('div');
    panel.className = 'waleed-chat-panel';
    panel.innerHTML = `
      <div class="chat-header">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="position: relative; width: 34px; height: 34px; border-radius: 50%; overflow: hidden; border: 1.5px solid var(--line, rgba(255,255,255,0.2)); flex-shrink: 0;">
            <img src="./profile.jpg" alt="Waleed Hassan" style="width: 100%; height: 100%; object-fit: cover; object-position: top center; filter: grayscale(40%);">
            <span style="position: absolute; bottom: 1px; right: 1px; width: 8px; height: 8px; background: #10b981; border: 1.5px solid #1a1a1e; border-radius: 50%;"></span>
          </div>
          <div>
            <div style="font-weight: 700; font-size: 14px; color: var(--sc-ink);">Waleed's Assistant</div>
            <div style="font-size: 11px; color: var(--sc-ink-soft); display: flex; align-items: center; gap: 4px;">
              <span>Online</span> · <span>Answers instantly</span>
            </div>
          </div>
        </div>
        <button id="chat-close-btn" aria-label="Close assistant" style="background: none; border: none; color: var(--sc-ink-soft); cursor: pointer; padding: 6px; font-size: 20px; line-height: 1; border-radius: 6px;">✕</button>
      </div>

      <div class="chat-messages" id="chat-messages">
        <div class="chat-bubble-ai">
          <strong style="color: var(--sc-ink); font-size: 14px;">Welcome to Waleed's Portfolio! 👋</strong><br/>
          I'm Waleed's personal assistant. Ask me anything about his projects, skills, educational journey at UET Lahore, or feel free to say hello!
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 6px; padding: 2px 0;" id="chat-chips">
          <button class="chat-chip" data-q="projects">Featured Projects 📁</button>
          <button class="chat-chip" data-q="skills">Tech Skills ⚡</button>
          <button class="chat-chip" data-q="education">Education 🎓</button>
          <button class="chat-chip" data-q="experience">Experience 💼</button>
          <button class="chat-chip" data-q="food">Favorite Food 🍕</button>
          <button class="chat-chip" data-q="contact">Contact Waleed ✉️</button>
        </div>
      </div>

      <form class="chat-footer" id="chat-input-form">
        <input type="text" class="chat-input" id="chat-text-input" placeholder="Ask about projects, education, skills..." autocomplete="off">
        <button type="submit" class="chat-send-btn" aria-label="Send message">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </form>
    `;

    document.body.appendChild(fab);
    document.body.appendChild(panel);

    let isOpen = false;
    function toggleChat(open) {
      isOpen = typeof open === 'boolean' ? open : !isOpen;
      panel.classList.toggle('is-open', isOpen);
      if (isOpen) {
        setTimeout(() => panel.querySelector('#chat-text-input').focus(), 150);
      }
    }

    fab.addEventListener('click', () => toggleChat());
    panel.querySelector('#chat-close-btn').addEventListener('click', () => toggleChat(false));

    const messagesContainer = panel.querySelector('#chat-messages');

    function appendMessage(sender, rawText) {
      const msg = document.createElement('div');
      msg.className = sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai';
      msg.innerHTML = formatMarkdown(rawText);
      messagesContainer.appendChild(msg);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function respondTo(query) {
      const q = query.toLowerCase().trim();
      let answer = "";

      // 1. Casual English & Friendly Greetings
      if (/^(hi|hello|hey|salam|assalam|aoa|hola|good\s*(morning|afternoon|evening)|sup|wassup)\b/.test(q) || q === "hi" || q === "hello") {
        const rand = KNOWLEDGE.greetings[Math.floor(Math.random() * KNOWLEDGE.greetings.length)];
        answer = rand;
      } else if (q.includes('how are you') || q.includes('how r u') || q.includes('how do you do')) {
        answer = KNOWLEDGE.howAreYou;
      } else if (q.includes('food') || q.includes('pizza') || q.includes('eat') || q.includes('dish') || q.includes('favorite meal') || q.includes('favourite food')) {
        answer = KNOWLEDGE.food;
      }
      // 2. Education & Academics
      else if (q.includes('education') || q.includes('degree') || q.includes('study') || q.includes('studies') || q.includes('university') || q.includes('college') || q.includes('school') || q.includes('uet') || q.includes('fsc') || q.includes('matric') || q.includes('punjab group') || q.includes('jadeed')) {
        answer = KNOWLEDGE.education;
      }
      // 3. Featured Projects
      else if (q.includes('project') || q.includes('thesis') || q.includes('assignment') || q.includes('solitaire') || q.includes('inventory') || q.includes('portfolio work') || q.includes('build')) {
        answer = KNOWLEDGE.projects;
      }
      // 4. Skills & Tech Stack
      else if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('language') || q.includes('python') || q.includes('react') || q.includes('c++') || q.includes('c#') || q.includes('sql') || q.includes('ai') || q.includes('tools')) {
        answer = KNOWLEDGE.skills;
      }
      // 5. Work & Career Experience
      else if (q.includes('experience') || q.includes('career') || q.includes('job') || q.includes('employment') || q.includes('mega market') || q.includes('work')) {
        answer = KNOWLEDGE.experience;
      }
      // 6. Contact & Hiring
      else if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('touch') || q.includes('reach') || q.includes('talk') || q.includes('call') || q.includes('linkedin') || q.includes('github') || q.includes('location')) {
        answer = KNOWLEDGE.contact;
      }
      // 7. Who is Waleed
      else if (q.includes('who are you') || q.includes('who is waleed') || q.includes('about') || q.includes('bio') || q.includes('tell me about')) {
        answer = KNOWLEDGE.about;
      }
      // 8. Fallback
      else {
        answer = KNOWLEDGE.fallback;
      }

      // Thinking indicator
      const thinking = document.createElement('div');
      thinking.style.cssText = 'font-size: 12px; color: var(--sc-ink-soft); font-style: italic; align-self: flex-start; padding: 4px 12px;';
      thinking.textContent = 'Typing...';
      messagesContainer.appendChild(thinking);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      setTimeout(() => {
        thinking.remove();
        appendMessage('assistant', answer);
      }, 350);
    }

    panel.querySelectorAll('.chat-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const qKey = chip.getAttribute('data-q');
        appendMessage('user', chip.textContent);
        respondTo(qKey);
      });
    });

    const form = panel.querySelector('#chat-input-form');
    const input = panel.querySelector('#chat-text-input');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const val = input.value.trim();
      if (!val) return;
      appendMessage('user', val);
      input.value = '';
      respondTo(val);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChat);
  } else {
    initChat();
  }
})();
