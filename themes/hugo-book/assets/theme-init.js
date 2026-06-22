'use strict';

// Apply saved theme immediately to prevent FOUC
(function () {
  var saved = localStorage.getItem('book-theme');
  if (saved === 'light' || saved === 'dark') {
    document.documentElement.setAttribute('data-theme', saved);
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
})();
