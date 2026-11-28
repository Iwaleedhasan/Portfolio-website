// Floating Interactive Portfolio Assistant Widget for Waleed Hassan
// Theme-Adaptive (Light/Dark), XSS-Safe, Keyboard Accessible & Mobile-Optimized
(function() {
  const KNOWLEDGE = {
    greetings: [
      "Hello! Welcome to Waleed's portfolio. I'm his interactive portfolio assistant. How can I help you today?",
      "Hi there! Glad to have you here. I can tell you about Waleed's projects, skills, education, or how to contact him.",
      "Hey! Welcome! Feel free to ask me anything about Waleed's work, tech stack, or background."
    ],
    howAreYou: "I'm doing great, thank you for asking! I'm here and ready to help you explore Waleed's software engineering work. What would you like to know?",
    food: "Waleed is a big fan of pizza! Especially a hot, cheesy pizza while coding late at night. What kind of food do you like?",
    gender: "Waleed is male (he/him). He is a Software Engineer and Computer Science undergraduate at UET Lahore.",
    about: "Waleed Hassan is a Software Engineer and Computer Science undergraduate at the University of Engineering and Technology (UET), Lahore, living in Gujranwala, Pakistan. He focuses on responsive web development, database systems, and algorithmic software engineering.",
    education: `Here is Waleed's educational background:

• **BSc Computer Science (2024 – Present)**
University of Engineering and Technology (UET), Lahore.
Pursuing undergraduate studies focusing on data structures, algorithms, relational database architectures, and software engineering.

• **FSc Pre-Engineering (2022 – 2024)**
Punjab Group of Colleges (PGC), Gujranwala.
Graduated in 2024 with a foundation in mathematics, physics, and analytical problem-solving.

• **Matriculation in Science (2020 – 2022)**
Jadeed Dastgir Ideal High School, Gujranwala.
Completed secondary school education in 2022 with distinction in core sciences and mathematics.`,

    projects: `Here are Waleed's 4 featured projects:

1. **Assignment Management System**
A workflow coordination application built in Python utilizing Data Structures and Queue Logic to organize submissions, deadlines, and evaluations.

2. **Thesis Management System**
A relational database application designed with SQL and MySQL to coordinate thesis proposals, supervisor allocations, and evaluation milestones.

3. **Solitaire Game**
A desktop card game engineered in C++ featuring deck shuffling algorithms, legal move verification, and state machine logic.

4. **Inventory Management System**
An object-oriented C# desktop application featuring automated stock threshold alerts, catalog ledgers, and transaction logging.`,

    skills: `Waleed's technical skills and tools include:

• **Programming Languages:** Python, C++, C#, JavaScript (ES6+), SQL, HTML5, CSS3.
• **Web & Frontend:** Responsive Mobile-First Design, Semantic HTML, CSS Grid & Flexbox, Vercel Serverless Functions.
• **Databases & Systems:** MySQL, Relational Schema Design, Data Structures & Algorithms, OOP.
• **Developer Tools:** Git, GitHub, Linux / Bash, Visual Studio, VS Code.`,

    experience: `Waleed's academic and practical experience:

• **Undergraduate Studies in Computer Science (2024 – Present)**
Active coursework and software projects at University of Engineering and Technology (UET), Lahore.

• **Data Entry Specialist at H&R Mega Market (Verified Employment)**
Managed operational catalog records, audited transactions, and maintained accurate inventory logging with high attention to detail.

• **Software & Web Engineering Practice**
Built responsive web interfaces, C++ algorithmic game systems, and relational MySQL database applications.`,

    contact: `You can reach Waleed directly through any of these channels:

• **Direct Email:** [waleed2206420@gmail.com](mailto:waleed2206420@gmail.com)
• **Location:** Gujranwala, Pakistan · UET Lahore
• **LinkedIn:** [linkedin.com/in/waleed-hassan-98768b330](https://www.linkedin.com/in/waleed-hassan-98768b330)
• **GitHub (Portfolio):** [github.com/Iwaleedhasan](https://github.com/Iwaleedhasan)
• **GitHub (Coursework):** [github.com/Waleedhasn](https://github.com/Waleedhasn)

You can also send a direct message using the contact form at the bottom of this website!`,

    fallback: "I'd love to help with that! You can ask me about Waleed's education at UET Lahore, his 4 featured projects, his technical skills, his favorite food (pizza!), or how to contact him."
  };

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function isSafeUrl(url) {
    return /^(https?:\/\/|mailto:)/i.test(url.trim());
  }

  function parseInline(escapedStr) {
    return escapedStr
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, function(_, label, rawHref) {
        const href = rawHref.replace(/&amp;/g, '&').trim();
        if (!isSafeUrl(href)) return label;
        const safeHref = escapeHtml(href);
        const external = /^https?:\/\//i.test(href) ? ' target="_blank" rel="noopener noreferrer"' : '';
        return `<a href="${safeHref}"${external} style="color: inherit; text-decoration: underline; font-weight: 600;">${label} ↗</a>`;
      });
  }

  function formatMarkdownSafe(text) {
    if (!text) return '';
    const clean = escapeHtml(text).replace(/\\n/g, '\n').replace(/\r\n/g, '\n');
    const sections = clean.split(/\n\n+/);

    return sections.map(sec => {
      const lines = sec.split('\n').map(l => l.trim()).filter(Boolean);
      if (lines.length === 0) return '';

      const isBullet = lines.every(l => l.startsWith('• ') || l.startsWith('- '));
      const isNumbered = lines.every(l => /^\d+\.\s/.test(l));

      if (isBullet) {
        const lis = lines.map(l => {
          const content = l.replace(/^[•\-]\s*/, '');
          return `<li style="margin-bottom: 6px;">${parseInline(content)}</li>`;
        }).join('');
        return `<ul style="margin: 6px 0 10px 0; padding-left: 20px; list-style-type: disc;">${lis}</ul>`;
      }

      if (isNumbered) {
        const lis = lines.map(l => {
          const content = l.replace(/^\d+\.\s*/, '');
          return `<li style="margin-bottom: 6px;">${parseInline(content)}</li>`;
        }).join('');
        return `<ol style="margin: 6px 0 10px 0; padding-left: 20px; list-style-type: decimal;">${lis}</ol>`;
      }

      return `<p style="margin: 0 0 8px 0; line-height: 1.55;">${lines.map(parseInline).join('<br/>')}</p>`;
    }).join('');
  }

  function matchIntent(query) {
    const q = String(query || '').toLowerCase().trim();

    if (/^(hi|hello|hey|salam|assalam|aoa|hola|good\s*(morning|afternoon|evening)|sup|wassup)\b/.test(q)) {
      return KNOWLEDGE.greetings[Math.floor(Math.random() * KNOWLEDGE.greetings.length)];
    }
    if (/\b(how are you|how r u|how do you do)\b/.test(q)) {
      return KNOWLEDGE.howAreYou;
    }
    if (/\b(gender|sex|male|female|boy|girl|pronouns?)\b/.test(q)) {
      return KNOWLEDGE.gender;
    }
    if (/\b(food|pizza|eat|dish|favorite meal|favourite food)\b/.test(q)) {
      return KNOWLEDGE.food;
    }
    if (/\b(contact|email|gmail|hire|touch|reach|talk|call|linkedin|github|location|available|details)\b/.test(q)) {
      return KNOWLEDGE.contact;
    }
    if (/\b(education|degree|study|studies|university|college|school|uet|fsc|matric|punjab|jadeed|academic)\b/.test(q)) {
      return KNOWLEDGE.education;
    }
    if (/\b(projects?|thesis|assignment|solitaire|inventory|portfolio)\b/.test(q)) {
      return KNOWLEDGE.projects;
    }
    if (/\b(experience|career|job|employment|mega market)\b/.test(q)) {
      return KNOWLEDGE.experience;
    }
    if (/\b(skills?|stack|tech|languages?|python|javascript|html|css|sql|mysql|ai|tools?|frameworks?)\b/.test(q) || /\bc\+\+|\bc#/i.test(q)) {
      return KNOWLEDGE.skills;
    }
    if (/\b(who are you|who is waleed|about|bio|tell me about)\b/.test(q)) {
      return KNOWLEDGE.about;
    }
    return KNOWLEDGE.fallback;
  }

  function initChat() {
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
        visibility: hidden;
        pointer-events: none;
        transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease, visibility 0.25s;
      }
      .waleed-chat-panel.is-open {
        transform: translateY(0) scale(1);
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
      }
      .waleed-chat-header {
        padding: 14px 18px;
        border-bottom: 1px solid var(--line, rgba(255,255,255,0.08));
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: var(--surface-strong, #1a1a1e);
      }
      .waleed-chat-messages {
        flex: 1;
        padding: 16px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 12px;
        box-sizing: border-box;
      }
      .waleed-chat-bubble-user {
        align-self: flex-end;
        background: var(--sc-ink, #282830);
        color: var(--sc-canvas, #ffffff);
        padding: 10px 16px;
        border-radius: 16px 16px 4px 16px;
        font-size: 13.5px;
        max-width: 82%;
        line-height: 1.45;
        word-break: break-word;
        white-space: pre-wrap;
      }
      .waleed-chat-bubble-ai {
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
      .waleed-chat-chip {
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
      .waleed-chat-chip:hover {
        background: var(--accent-wash, rgba(255,255,255,0.14));
        transform: translateY(-1px);
      }
      .waleed-chat-footer {
        padding: 12px 14px;
        border-top: 1px solid var(--line, rgba(255,255,255,0.08));
        display: flex;
        gap: 8px;
        background: var(--surface-strong, #18181c);
      }
      .waleed-chat-input {
        flex: 1;
        min-width: 0;
        background: var(--sc-surface, rgba(255,255,255,0.06));
        border: 1px solid var(--line, rgba(255,255,255,0.12));
        border-radius: 10px;
        padding: 10px 14px;
        color: var(--sc-ink, #fff);
        font-size: 16px;
        outline: none;
        font-family: inherit;
      }
      .waleed-chat-input:focus {
        border-color: var(--sc-ink, #fff);
      }
      .waleed-chat-send-btn {
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
      .waleed-chat-send-btn:hover {
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

    const fab = document.createElement('button');
    fab.type = 'button';
    fab.className = 'waleed-chat-fab';
    fab.setAttribute('aria-label', "Open Waleed's Assistant");
    fab.setAttribute('aria-expanded', 'false');
    fab.setAttribute('aria-controls', 'waleed-assistant-dialog');
    fab.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      <span>Ask Assistant</span>
    `;

    const panel = document.createElement('div');
    panel.id = 'waleed-assistant-dialog';
    panel.className = 'waleed-chat-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'false');
    panel.setAttribute('aria-label', "Waleed's Portfolio Assistant");
    panel.setAttribute('aria-hidden', 'true');
    panel.innerHTML = `
      <div class="waleed-chat-header">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="position: relative; width: 34px; height: 34px; border-radius: 50%; overflow: hidden; border: 1.5px solid var(--line, rgba(255,255,255,0.2)); flex-shrink: 0;">
            <img src="./profile.jpg" alt="Waleed Hassan" style="width: 100%; height: 100%; object-fit: cover; object-position: top center; filter: grayscale(40%);">
            <span style="position: absolute; bottom: 1px; right: 1px; width: 8px; height: 8px; background: #10b981; border: 1.5px solid #1a1a1e; border-radius: 50%;"></span>
          </div>
          <div>
            <div style="font-weight: 700; font-size: 14px; color: var(--sc-ink);">Waleed's Assistant</div>
            <div style="font-size: 11px; color: var(--sc-ink-soft); display: flex; align-items: center; gap: 4px;">
              <span>Online</span> · <span>Instant answers</span>
            </div>
          </div>
        </div>
        <button type="button" id="waleed-chat-close-btn" aria-label="Close assistant" style="background: none; border: none; color: var(--sc-ink-soft); cursor: pointer; padding: 6px; font-size: 20px; line-height: 1; border-radius: 6px;">✕</button>
      </div>

      <div class="waleed-chat-messages" id="waleed-chat-messages">
        <div class="waleed-chat-bubble-ai">
          <strong style="color: var(--sc-ink); font-size: 14px;">Welcome to Waleed's Portfolio! 👋</strong><br/>
          I'm Waleed's portfolio assistant. Ask me anything about his projects, skills, educational journey at UET Lahore, or feel free to say hello!
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 6px; padding: 2px 0;" id="waleed-chat-chips">
          <button type="button" class="waleed-chat-chip" data-q="projects">Featured Projects 📁</button>
          <button type="button" class="waleed-chat-chip" data-q="skills">Tech Skills ⚡</button>
          <button type="button" class="waleed-chat-chip" data-q="education">Education 🎓</button>
          <button type="button" class="waleed-chat-chip" data-q="experience">Experience 💼</button>
          <button type="button" class="waleed-chat-chip" data-q="food">Favorite Food 🍕</button>
          <button type="button" class="waleed-chat-chip" data-q="contact">Contact Waleed ✉️</button>
        </div>
      </div>

      <form class="waleed-chat-footer" id="waleed-chat-input-form">
        <label for="waleed-chat-text-input" class="sr-only">Ask about Waleed</label>
        <input type="text" class="waleed-chat-input" id="waleed-chat-text-input" placeholder="Ask about projects, education, skills..." autocomplete="off">
        <button type="submit" class="waleed-chat-send-btn" aria-label="Send message">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </form>
    `;

    document.body.appendChild(fab);
    document.body.appendChild(panel);

    let isOpen = false;
    function toggleChat(open) {
      isOpen = typeof open === 'boolean' ? open : !isOpen;
      panel.classList.toggle('is-open', isOpen);
      panel.setAttribute('aria-hidden', String(!isOpen));
      fab.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) {
        setTimeout(() => panel.querySelector('#waleed-chat-text-input').focus(), 150);
      } else {
        fab.focus();
      }
    }

    fab.addEventListener('click', () => toggleChat());
    panel.querySelector('#waleed-chat-close-btn').addEventListener('click', () => toggleChat(false));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && isOpen) toggleChat(false);
    });

    const messagesContainer = panel.querySelector('#waleed-chat-messages');

    function appendMessage(sender, rawText) {
      const msg = document.createElement('div');
      msg.className = sender === 'user' ? 'waleed-chat-bubble-user' : 'waleed-chat-bubble-ai';
      if (sender === 'user') {
        msg.textContent = rawText;
      } else {
        msg.innerHTML = formatMarkdownSafe(rawText);
      }
      messagesContainer.appendChild(msg);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function respondTo(query) {
      const answer = matchIntent(query);

      const thinking = document.createElement('div');
      thinking.style.cssText = 'font-size: 12px; color: var(--sc-ink-soft); font-style: italic; align-self: flex-start; padding: 4px 12px;';
      thinking.textContent = 'Typing...';
      messagesContainer.appendChild(thinking);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      setTimeout(() => {
        thinking.remove();
        appendMessage('assistant', answer);
      }, 220);
    }

    panel.querySelectorAll('.waleed-chat-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const qKey = chip.getAttribute('data-q');
        appendMessage('user', chip.textContent);
        respondTo(qKey);
      });
    });

    const form = panel.querySelector('#waleed-chat-input-form');
    const input = panel.querySelector('#waleed-chat-text-input');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const val = input.value.trim();
      if (!val) return;
      appendMessage('user', val);
      input.value = '';
      respondTo(val);
    });
  }

  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initChat);
    } else {
      initChat();
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { escapeHtml, formatMarkdownSafe, matchIntent };
  }
})();
