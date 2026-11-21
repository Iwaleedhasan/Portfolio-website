// 3D Folder Interaction & Project Details Panel
(function() {
  function initFolders() {
    const folders = document.querySelectorAll('.project-folder');
    const panel = document.getElementById('project-details-panel');
    if (!folders.length || !panel) return;

    const toolbarTitle = panel.querySelector('.project-panel-toolbar span');
    const closeBtn = panel.querySelector('.project-panel-toolbar button');
    const studies = panel.querySelectorAll('.project-study');

    folders.forEach(folder => {
      folder.addEventListener('pointermove', e => {
        if (e.pointerType !== 'mouse') return;
        const rect = folder.getBoundingClientRect();
        const lean = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
        folder.style.setProperty('--folder-lean', `${lean}deg`);
      });

      folder.addEventListener('pointerleave', () => {
        folder.style.setProperty('--folder-lean', '0deg');
      });

      folder.addEventListener('click', (e) => {
        e.preventDefault();
        const folderId = folder.getAttribute('data-folder-id');
        openProject(folderId);
      });
    });

    function openProject(folderId) {
      folders.forEach(f => {
        const isCurrent = f.getAttribute('data-folder-id') === folderId;
        f.setAttribute('aria-expanded', String(isCurrent));
      });

      let found = false;
      studies.forEach(study => {
        const pid = study.getAttribute('data-project-id');
        if (pid === folderId) {
          study.removeAttribute('hidden');
          study.style.display = 'block';
          found = true;
          if (toolbarTitle) {
            toolbarTitle.textContent = study.getAttribute('data-category') || 'Project details';
          }
        } else {
          study.setAttribute('hidden', '');
          study.style.display = 'none';
        }
      });

      panel.removeAttribute('hidden');
      panel.style.display = 'block';
      panel.focus({ preventScroll: true });

      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
      panel.scrollIntoView({ behavior, block: 'start' });
    }

    function closeProject() {
      panel.setAttribute('hidden', '');
      panel.style.display = 'none';
      folders.forEach(f => f.setAttribute('aria-expanded', 'false'));
      const activeFolder = document.querySelector('.project-folder[aria-expanded="true"]');
      if (activeFolder) activeFolder.focus();
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeProject();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFolders);
  } else {
    initFolders();
  }
})();
