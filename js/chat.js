// Floating AI Assistant Chat Widget for Waleed Hassan
(function() {
  const waleedKnowledge = {
    about: "I'm Waleed Hassan, a Computer Science undergraduate at the University of Engineering and Technology (UET), Lahore, based in Gujranwala, Pakistan. I specialize in responsive web development, conversational AI architectures, relational database systems, and algorithmic software engineering.",
    projects: "My 4 featured projects include:\\n• **Assignment Management System**: Algorithmic workflow coordination system automating submissions, deadlines, and evaluations utilizing optimized data structures (Python, DSA, Queue Logic).\\n• **Thesis Management System**: Relational database application coordinating undergraduate thesis proposals, evaluations, and supervisor allocations (SQL, MySQL, Relational Schema).\\n• **Solitaire Game**: Low-latency card game built in C++ featuring deck shuffling logic, legal move verification algorithms, and low-latency state machines (C++, Game Logic, Algorithms).\\n• **Inventory Management System**: Object-oriented store and stock management desktop application featuring automated thresholds, catalog ledgers, and transaction logging (C#, OOP, Store Architecture).",
    stack: "My core technical stack spans:\\n• **Languages & Frameworks**: TypeScript, JavaScript (ES6+), Python, C++, C#, React, Astro, Tailwind CSS, HTML5, CSS3, Lucide React.\\n• **AI Engineering**: Conversational AI Architecture, Client-Side RAG, Prompt Engineering, Gemini API, OpenAI API, Anthropic API.\\n• **Databases & Tools**: SQL, MySQL, Relational Schema Design, Git, GitHub, Linux / Bash, npm, Vite, WCAG AA Accessibility, Mobile-First Architecture.",
    experience: "• **BSc Computer Science** @ University of Engineering and Technology (UET), Lahore (Present, Undergraduate Studies)\\n• **Data Entry Specialist** at H&R Mega Market (Verified Employment: Catalog data consistency, transaction audits, inventory logging)\\n• **Web Development Practice**: Responsive mobile-first interfaces, WCAG AA accessibility, client-side RAG integrations\\n• **Application Development Practice**: Object-oriented software in C# and normalized MySQL schemas\\n• **Game Development Practice**: Low-latency state machines, deck shuffling algorithms, and rule verification in C++.",
    contact: "You can reach me directly via email at **grw2206420@outlook.com** or connect with me on LinkedIn ([linkedin.com/in/waleed-hassan-98768b330](https://www.linkedin.com/in/waleed-hassan-98768b330)) and GitHub ([github.com/Iwaleedhasan](https://github.com/Iwaleedhasan))."
  };

  function initChat() {
    // 1. Create Floating Action Button (FAB)
    const fab = document.createElement('button');
    fab.className = 'chat-fab';
    fab.setAttribute('aria-label', "Open Waleed's AI Assistant");
    fab.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999;
      background: #f5f4f0;
      color: #101217;
      border: none;
      border-radius: 999px;
      padding: 12px 18px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: var(--sc-font-text, 'Space Grotesk', sans-serif);
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(0,0,0,0.6);
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s;
    `;
    fab.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      <span>Ask AI</span>
    `;

    fab.addEventListener('mouseenter', () => fab.style.transform = 'scale(1.05)');
    fab.addEventListener('mouseleave', () => fab.style.transform = 'scale(1)');

    // 2. Create Chat Panel
    const panel = document.createElement('div');
    panel.className = 'chat-panel';
    panel.style.cssText = `
      position: fixed;
      bottom: 84px;
      right: 24px;
      width: min(380px, calc(100vw - 48px));
      height: 520px;
      background: #141416;
      color: #f5f4f0;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 18px;
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.7);
      display: flex;
      flex-direction: column;
      z-index: 1000;
      overflow: hidden;
      font-family: var(--sc-font-text, 'Space Grotesk', sans-serif);
      transform: translateY(20px) scale(0.95);
      opacity: 0;
      pointer-events: none;
      transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
    `;

    panel.innerHTML = `
      <div style="padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: space-between; background: #1a1a1e;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 30px; height: 30px; border-radius: 50%; background: #333; overflow: hidden; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.2);">
            <img src="./bg.jpg" alt="Waleed Hassan" style="width: 100%; height: 100%; object-fit: cover; object-position: top center;">
          </div>
          <div>
            <div style="font-weight: 600; font-size: 14px; color: #fff;">Waleed's Assistant</div>
            <div style="font-size: 11px; color: #9a9ba1;">Answers instantly about my work</div>
          </div>
        </div>
        <button id="chat-close-btn" style="background: none; border: none; color: #9a9ba1; cursor: pointer; padding: 4px; font-size: 18px; line-height: 1;">✕</button>
      </div>

      <div id="chat-messages" style="flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px;">
        <div style="padding: 12px; background: rgba(255,255,255,0.04); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); font-size: 13px; line-height: 1.5;">
          <strong style="color: #fff;">Get to know Waleed's work.</strong><br>
          Hi there! I can tell you about Waleed's projects, algorithmic systems, database architectures, tech stack, or academic background at UET Lahore.
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 6px;" id="chat-chips">
          <button class="chat-chip" data-q="projects" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1); color: #e5e5e7; padding: 6px 12px; border-radius: 999px; font-size: 12px; cursor: pointer; text-align: left;">Featured Projects 📁</button>
          <button class="chat-chip" data-q="stack" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1); color: #e5e5e7; padding: 6px 12px; border-radius: 999px; font-size: 12px; cursor: pointer; text-align: left;">Tech Stack ⚡</button>
          <button class="chat-chip" data-q="experience" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1); color: #e5e5e7; padding: 6px 12px; border-radius: 999px; font-size: 12px; cursor: pointer; text-align: left;">Experience 💼</button>
          <button class="chat-chip" data-q="contact" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1); color: #e5e5e7; padding: 6px 12px; border-radius: 999px; font-size: 12px; cursor: pointer; text-align: left;">Contact ✉️</button>
        </div>
      </div>

      <form id="chat-input-form" style="padding: 12px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; gap: 8px; background: #18181c;">
        <input type="text" id="chat-text-input" placeholder="Ask about Waleed..." style="flex: 1; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 10px 14px; color: #fff; font-size: 13px; outline: none; font-family: inherit;">
        <button type="submit" style="background: #f5f4f0; color: #101217; border: none; border-radius: 8px; padding: 0 14px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </form>
    `;

    document.body.appendChild(fab);
    document.body.appendChild(panel);

    let isOpen = false;
    function toggleChat(open) {
      isOpen = typeof open === 'boolean' ? open : !isOpen;
      if (isOpen) {
        panel.style.opacity = '1';
        panel.style.transform = 'translateY(0) scale(1)';
        panel.style.pointerEvents = 'auto';
        panel.querySelector('#chat-text-input').focus();
      } else {
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(20px) scale(0.95)';
        panel.style.pointerEvents = 'none';
      }
    }

    fab.addEventListener('click', () => toggleChat());
    panel.querySelector('#chat-close-btn').addEventListener('click', () => toggleChat(false));

    const messagesContainer = panel.querySelector('#chat-messages');

    function appendMessage(sender, text) {
      const msg = document.createElement('div');
      msg.style.cssText = sender === 'user'
        ? 'align-self: flex-end; background: #282830; color: #f5f4f0; padding: 8px 14px; border-radius: 12px 12px 2px 12px; font-size: 13px; max-width: 82%; line-height: 1.4;'
        : 'align-self: flex-start; background: rgba(255,255,255,0.06); color: #f5f4f0; padding: 10px 14px; border-radius: 12px 12px 12px 2px; font-size: 13px; max-width: 90%; line-height: 1.45; border: 1px solid rgba(255,255,255,0.06);';

      const formatted = text.replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>').replace(/\\n/g, '<br>');
      msg.innerHTML = formatted;
      messagesContainer.appendChild(msg);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function respondTo(query) {
      const q = query.toLowerCase();
      let answer = waleedKnowledge.about;

      if (q.includes('project') || q.includes('thesis') || q.includes('assignment') || q.includes('solitaire') || q.includes('inventory')) {
        answer = waleedKnowledge.projects;
      } else if (q.includes('stack') || q.includes('skill') || q.includes('python') || q.includes('react') || q.includes('c++') || q.includes('sql') || q.includes('ai')) {
        answer = waleedKnowledge.stack;
      } else if (q.includes('experience') || q.includes('uet') || q.includes('mega market') || q.includes('education') || q.includes('lahore')) {
        answer = waleedKnowledge.experience;
      } else if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('touch') || q.includes('reach')) {
        answer = waleedKnowledge.contact;
      }

      const thinking = document.createElement('div');
      thinking.style.cssText = 'font-size: 12px; color: #9a9ba1; font-style: italic; align-self: flex-start;';
      thinking.textContent = 'Thinking...';
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
