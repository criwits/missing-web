'use strict';

{{ $searchDataFile := printf "%s.search-data.js" .Language.Lang }}
{{ $searchData := resources.Get "search-data.js" | resources.ExecuteAsTemplate $searchDataFile . | resources.Minify | resources.Fingerprint }}

(function () {
  const input = document.querySelector('#book-search-input');
  const resultsPanel = document.querySelector('#book-search-results');
  const resultsInner = document.querySelector('#book-search-results-inner');
  const spinner = document.querySelector('.book-search-spinner');

  if (!input || !resultsPanel || !resultsInner) return;

  const SNIPPET_RADIUS = 80;    // chars around match
  const MAX_RESULTS = 10;       // max results to show

  let activeIndex = -1;
  let currentHits = [];
  let initialized = false;

  // ── Event listeners ──────────────────────────────────

  input.addEventListener('focus', init);
  input.addEventListener('input', debounce(search, 200));
  input.addEventListener('keydown', handleKeyNav);

  // Hotkey: press 's' or '/' anywhere to focus search
  document.addEventListener('keypress', function (event) {
    if (input === document.activeElement) return;
    const char = String.fromCharCode(event.charCode);
    const hotkeys = input.getAttribute('data-hotkeys') || '';
    if (hotkeys.indexOf(char) >= 0) {
      input.focus();
      event.preventDefault();
    }
  });

  // Close results on outside click
  document.addEventListener('click', function (event) {
    if (!event.target.closest('.book-search')) {
      hideResults();
    }
  });

  // Re-position results on scroll/resize
  window.addEventListener('scroll', updateResultsPosition, { passive: true });
  window.addEventListener('resize', updateResultsPosition, { passive: true });

  // ── Initialization (lazy) ────────────────────────────

  function init() {
    if (initialized) return;
    initialized = true;
    input.removeEventListener('focus', init);

    // Move results panel to <body> so it escapes the sidebar's
    // will-change:transform containing block and can use fixed positioning.
    document.body.appendChild(resultsPanel);

    spinner.classList.remove('hidden');

    loadScript('{{ "flexsearch.min.js" | relURL }}', function () {
      loadScript('{{ $searchData.RelPermalink }}', function () {
        spinner.classList.add('hidden');
        if (input.value) search();
      });
    });
  }

  // ── Search ───────────────────────────────────────────

  function search() {
    clearResults();
    activeIndex = -1;
    currentHits = [];

    const query = input.value.trim();
    if (!query) {
      hideResults();
      return;
    }

    if (typeof window.bookSearchIndex === 'undefined') {
      showMessage('{{ i18n "Search" }}...');
      showResults();
      return;
    }

    // Query FlexSearch
    const rawHits = window.bookSearchIndex.search(query, MAX_RESULTS * 2);

    if (!rawHits || rawHits.length === 0) {
      showMessage('{{ i18n "No results found" }}');
      showResults();
      return;
    }

    // Build enriched results with snippets
    currentHits = buildResults(rawHits, query);

    if (currentHits.length === 0) {
      showMessage('{{ i18n "No results found" }}');
      showResults();
      return;
    }

    renderResults(currentHits);
    showResults();
  }

  function buildResults(rawHits, query) {
    const store = window.bookSearchStore;
    if (!store) return [];

    const terms = tokenizeQuery(query);
    const results = [];

    for (let i = 0; i < Math.min(rawHits.length, MAX_RESULTS); i++) {
      const hit = rawHits[i];
      const id = hit.id;
      const page = store[id];
      if (!page) continue;

      const snippet = extractSnippet(page.content, terms);
      results.push({
        id: id,
        href: page.href,
        title: page.title,
        section: page.section,
        snippet: snippet,
        allTerms: terms
      });
    }

    return results;
  }

  function tokenizeQuery(query) {
    // Match the index tokenizer: CJK → bigrams + full word, Latin → lowercase
    const terms = [];

    const cjkRe = /[\u4e00-\u9fff\u3400-\u4dbf\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]+/g;
    var cjk;
    while ((cjk = cjkRe.exec(query)) !== null) {
      var seq = cjk[0];
      if (seq.length === 1) {
        terms.push(seq);
      } else {
        for (var j = 0; j < seq.length - 1; j++) {
          terms.push(seq.substring(j, j + 2));
        }
        terms.push(seq); // full word boost
      }
    }

    // Latin/numbers: lowercase whole words
    const latinRe = /[a-zA-Z0-9\u00c0-\u024f]+/g;
    var latin;
    while ((latin = latinRe.exec(query)) !== null) {
      terms.push(latin[0].toLowerCase());
    }

    return terms;
  }

  function extractSnippet(content, terms) {
    if (!content || terms.length === 0) return '';

    const lowerContent = content.toLowerCase();
    let bestPos = -1;
    let bestTerm = '';

    // Find the first occurrence of any search term
    for (let i = 0; i < terms.length; i++) {
      const pos = lowerContent.indexOf(terms[i].toLowerCase());
      if (pos !== -1 && (bestPos === -1 || pos < bestPos)) {
        bestPos = pos;
        bestTerm = terms[i];
      }
    }

    if (bestPos === -1) {
      // Try matching FlexSearch's internal tokenization
      // Fall back to first 150 chars
      return content.substring(0, 150).replace(/\s+/g, ' ').trim() + '…';
    }

    const termLen = bestTerm.length;
    let start = Math.max(0, bestPos - SNIPPET_RADIUS);
    let end = Math.min(content.length, bestPos + termLen + SNIPPET_RADIUS);

    // Adjust to word boundaries for Latin text
    if (start > 0) {
      const spaceBefore = content.lastIndexOf(' ', start + 20);
      if (spaceBefore > start - 20 && spaceBefore < start + 20) {
        start = spaceBefore + 1;
      }
    }
    if (end < content.length) {
      const spaceAfter = content.indexOf(' ', end - 20);
      if (spaceAfter > end - 20 && spaceAfter < end + 20) {
        end = spaceAfter;
      }
    }

    let snippet = content.substring(start, end).replace(/\s+/g, ' ').trim();

    // Add ellipsis
    if (start > 0) snippet = '…' + snippet;
    if (end < content.length) snippet = snippet + '…';

    // Highlight all matching terms
    terms.forEach(function (term) {
      if (!term) return;
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp('(' + escaped + ')', 'gi');
      snippet = snippet.replace(regex, '<mark>$1</mark>');
    });

    return snippet;
  }

  // ── Rendering ────────────────────────────────────────

  function renderResults(hits) {
    resultsInner.innerHTML = '';

    // Pass search query via URL param for scroll-to-highlight on target page
    const query = input.value.trim();
    const queryParam = query ? '?q=' + encodeURIComponent(query) : '';

    hits.forEach(function (hit, idx) {
      const item = document.createElement('a');
      item.className = 'book-search-result-item';
      item.href = hit.href + queryParam;
      item.setAttribute('role', 'option');
      item.setAttribute('aria-posinset', idx + 1);
      item.setAttribute('aria-setsize', hits.length);

      if (idx === 0) item.classList.add('active');

      // var sectionHTML = '';
      // if (hit.section) {
        // sectionHTML = '<span class="book-search-result-section">' + escapeHTML(hit.section) + '</span>';
      // }

      item.innerHTML =
        '<span class="book-search-result-title">' + escapeHTML(hit.title) + '</span>' +
        // sectionHTML +
        '<span class="book-search-result-snippet">' + hit.snippet + '</span>';

      item.addEventListener('click', function (e) {
        // Allow normal navigation
      });

      resultsInner.appendChild(item);
    });
  }

  function showMessage(msg) {
    resultsInner.innerHTML =
      '<div class="book-search-result-empty">' + escapeHTML(msg) + '</div>';
  }

  function clearResults() {
    resultsInner.innerHTML = '';
  }

  function showResults() {
    resultsPanel.classList.add('visible');
    updateResultsPosition();
  }

  function hideResults() {
    resultsPanel.classList.remove('visible');
    activeIndex = -1;
  }

  function updateResultsPosition() {
    if (!resultsPanel.classList.contains('visible')) return;

    // Position the results panel as a fixed dropdown below the search input,
    // avoiding clipping from the sidebar's overflow:hidden container.
    var inputRect = input.getBoundingClientRect();

    resultsPanel.style.top = (inputRect.bottom + 4) + 'px';
    resultsPanel.style.left = inputRect.left + 'px';
    resultsPanel.style.width = inputRect.width + 'px';

    // Ensure the dropdown fits within the viewport
    var maxBottom = window.innerHeight - 16;
    var panelTop = inputRect.bottom + 4;
    var availableHeight = maxBottom - panelTop;
    resultsPanel.style.maxHeight = Math.min(420, availableHeight) + 'px';
  }

  // ── Keyboard navigation ──────────────────────────────

  function handleKeyNav(event) {
    var items = resultsInner.querySelectorAll('.book-search-result-item');

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (items.length === 0) return;
        activeIndex = Math.min(activeIndex + 1, items.length - 1);
        updateActive(items);
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (items.length === 0) return;
        activeIndex = Math.max(activeIndex - 1, 0);
        updateActive(items);
        break;

      case 'Enter':
        if (activeIndex >= 0 && items[activeIndex]) {
          event.preventDefault();
          items[activeIndex].click();
        }
        break;

      case 'Escape':
        event.preventDefault();
        hideResults();
        input.blur();
        break;
    }
  }

  function updateActive(items) {
    items.forEach(function (item, i) {
      item.classList.toggle('active', i === activeIndex);
    });
    // Scroll active item into view
    if (items[activeIndex]) {
      items[activeIndex].scrollIntoView({ block: 'nearest' });
    }
  }

  // ── Utilities ────────────────────────────────────────

  function escapeHTML(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function debounce(fn, delay) {
    var timer;
    return function () {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(context, args); }, delay);
    };
  }

  function loadScript(src, callback) {
    var script = document.createElement('script');
    script.defer = true;
    script.async = false;
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
  }

  // ── Page-load: scroll to & highlight search term ─────

  (function handleQueryParam() {
    var q = new URLSearchParams(window.location.search).get('q');
    if (!q) return;

    var content = document.querySelector('.book-page');
    if (!content) return;

    var lowerQ = q.toLowerCase();

    // Find a match in body text, skipping TOC / lists near the top
    var walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, null, false);
    var matchNode = null, matchOffset = 0;

    while (walker.nextNode()) {
      var text = walker.currentNode.textContent;
      var idx = text.toLowerCase().indexOf(lowerQ);
      if (idx === -1) continue;

      // Skip if inside a list, nav, or too close to the top
      var el = walker.currentNode.parentElement;
      var skip = false;
      while (el && el !== content) {
        var tag = el.tagName;
        if (tag === 'UL' || tag === 'OL' || tag === 'NAV' || tag === 'LI' ||
            (tag === 'DIV' && el.className && el.className.indexOf('toc') !== -1)) {
          skip = true;
          break;
        }
        el = el.parentElement;
      }
      if (skip) continue;

      // Also skip if within first 300px of content (page intro / metadata area)
      var rect = walker.currentNode.parentElement.getBoundingClientRect();
      if (rect.top + window.pageYOffset < 300) continue;

      matchNode = walker.currentNode;
      matchOffset = idx;
      break;
    }

    if (!matchNode) return;

    // Highlight the match
    var range = document.createRange();
    range.setStart(matchNode, matchOffset);
    range.setEnd(matchNode, matchOffset + q.length);
    var mark = document.createElement('mark');
    mark.style.cssText = 'background:#fff3b0;border-radius:2px;padding:1px 2px;transition:background 0.8s';
    range.surroundContents(mark);

    // Find nearest heading and scroll
    setTimeout(function () {
      var markTop = mark.getBoundingClientRect().top + window.pageYOffset;
      var headings = content.querySelectorAll('h1[id],h2[id],h3[id],h4[id]');
      var nearest = null;

      for (var i = headings.length - 1; i >= 0; i--) {
        var hTop = headings[i].getBoundingClientRect().top + window.pageYOffset;
        if (hTop <= markTop + 20) {
          nearest = headings[i];
          break;
        }
      }

      if (nearest) {
        var top = nearest.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      } else {
        var mTop = mark.getBoundingClientRect().top + window.pageYOffset - 120;
        window.scrollTo({ top: Math.max(0, mTop), behavior: 'smooth' });
      }
    }, 150);

    // Fade out highlight after 3.5 seconds
    setTimeout(function () {
      mark.style.background = 'transparent';
      setTimeout(function () {
        var parent = mark.parentNode;
        if (parent) {
          while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
          parent.removeChild(mark);
          parent.normalize();
        }
      }, 800);
    }, 3500);
  })();

})();
