'use strict';

// Theme toggle — runs after DOM is ready
(function () {
  function setTheme(theme) {
    if (theme === 'light' || theme === 'dark') {
      document.documentElement.setAttribute('data-theme', theme);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('book-theme', theme);
    updateToggleButtons(theme);
  }

  function updateToggleButtons(current) {
    var buttons = document.querySelectorAll('.book-theme-toggle button');
    buttons.forEach(function (btn) {
      var val = btn.getAttribute('data-theme-value');
      btn.classList.toggle('active', val === current);
    });
  }

  function getCurrentTheme() {
    return localStorage.getItem('book-theme') || 'auto';
  }

  // Initialize toggle buttons
  document.addEventListener('DOMContentLoaded', function () {
    var toggles = document.querySelectorAll('.book-theme-toggle button');
    if (toggles.length === 0) return;

    var current = getCurrentTheme();
    updateToggleButtons(current);

    toggles.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var val = this.getAttribute('data-theme-value');
        setTheme(val);
      });
    });
  });
})();
