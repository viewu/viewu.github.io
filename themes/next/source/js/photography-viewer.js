'use strict';

(() => {
  let active;

  function show(index) {
    if (!active || index < 0 || index >= active.links.length) return;
    active.index = index;
    const { dialog, links, image } = active;
    image.alt = links[index].querySelector('img').alt;
    image.src = links[index].href;
    dialog.querySelector('.photo-viewer-position').textContent = `${index + 1} / ${links.length}`;
    dialog.querySelector('.photo-viewer-prev').setAttribute('aria-disabled', String(index === 0));
    dialog.querySelector('.photo-viewer-next').setAttribute('aria-disabled', String(index === links.length - 1));
  }

  // PJAX replaces the gallery markup; one delegated listener also handles newly loaded galleries.
  document.addEventListener('click', event => {
    const action = event.target.closest('[data-photo-action]');
    if (action && active?.dialog.open && active.dialog.contains(action)) {
      if (action.dataset.photoAction === 'close') active.dialog.close();
      else show(active.index + (action.dataset.photoAction === 'next' ? 1 : -1));
      return;
    }

    const link = event.target.closest('.photo-collection .photo-view');
    if (!link || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const dialog = link.closest('.photography-page').querySelector('.photo-viewer');
    if (typeof dialog?.showModal !== 'function') return;
    const links = [...link.closest('.photo-collection').querySelectorAll('.photo-view')];
    const state = { dialog, links, image: dialog.querySelector('.photo-viewer-image') };
    active = state;
    event.preventDefault();
    show(links.indexOf(link));
    dialog.showModal();
    dialog.addEventListener('close', () => {
      if (active !== state) return;
      active = null;
      state.image.removeAttribute('src');
      if (link.isConnected) link.focus({ preventScroll: true });
    }, { once: true });
  });

  document.addEventListener('keydown', event => {
    if (!active?.dialog.open || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return;
    event.preventDefault();
    show(active.index + (event.key === 'ArrowRight' ? 1 : -1));
  });

  document.addEventListener('pjax:send', () => {
    if (active?.dialog.open) active.dialog.close();
  });
})();
