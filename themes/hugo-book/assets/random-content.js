'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const containers = document.querySelectorAll('.random-contents');
  containers.forEach(function (container) {
    const items = container.querySelectorAll('.random-content-item');
    if (items.length === 0) return;

    // Pick one random item to show
    const chosen = Math.floor(Math.random() * items.length);
    items[chosen].style.display = '';
  });
});
