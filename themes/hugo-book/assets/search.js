'use strict';

{{ $searchDataFile := printf "%s.search-data.js" .Language.Lang }}
{{ $searchData := resources.Get "search-data.js" | resources.ExecuteAsTemplate $searchDataFile . | resources.Minify | resources.Fingerprint }}

(function () {
  const input = document.querySelector('#book-search-input');
  const resultsPanel = document.querySelector('#book-search-results');
  const resultsInner = document.querySelector('#book-search-results-inner');
  const spinner = document.querySelector('.book-search-spinner');

  if (!input || !resultsPanel || !resultsInner) return;

  const SNIPPET_RADIUS = 40;
  const MAX_FULLTEXT = 30;
  const IN_PAGE_INITIAL = 3;
  const FULL_TEXT_INITIAL = 5;
  const LOAD_MORE_COUNT = 8;

  let activeIndex = -1;
  let allInPageHits = [];
  let allFullTextHits = [];
  let inPageShown = 0;
  let fullTextShown = 0;
  let currentQuery = '';
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
    if (!event.target.closest('.book-search') && !event.target.closest('#book-search-results')) {
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
    allInPageHits = [];
    allFullTextHits = [];
    inPageShown = 0;
    fullTextShown = 0;
    currentQuery = input.value.trim();

    if (!currentQuery) {
      hideResults();
      return;
    }

    // In-page search (always available, no FlexSearch needed)
    allInPageHits = searchInPage(currentQuery);

    // Full-text search (needs FlexSearch index)
    if (typeof window.bookSearchIndex !== 'undefined') {
      // Build search query from n-grams only (not full words) to avoid
      // FlexSearch treating unmatched tokens as AND filters.
      var searchTokens = [];
      var cjkRe2 = /[\u4e00-\u9fff\u3400-\u4dbf\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]+/g;
      var cjk2;
      while ((cjk2 = cjkRe2.exec(currentQuery)) !== null) {
        var s = cjk2[0];
        if (s.length === 1) { searchTokens.push(s); }
        else { for (var b = 0; b < s.length - 1; b++) searchTokens.push(s.substring(b, b + 2)); }
      }
      var latinRe2 = /[a-zA-Z0-9\u00c0-\u024f]+/g;
      var latin2;
      while ((latin2 = latinRe2.exec(currentQuery)) !== null) {
        var w = latin2[0].toLowerCase();
        if (w.length >= 3) { for (var t = 0; t <= w.length - 3; t++) searchTokens.push(w.substring(t, t + 3)); }
        else { searchTokens.push(w); }
      }
      var searchQuery = searchTokens.length > 0 ? searchTokens.join(' ') : currentQuery;
      const rawHits = window.bookSearchIndex.search(searchQuery, { limit: MAX_FULLTEXT, bool: 'or' });
      if (rawHits && rawHits.length > 0) {
        allFullTextHits = buildResults(rawHits, currentQuery);
      }
    }

    if (allInPageHits.length === 0 && allFullTextHits.length === 0) {
      showMessage('{{ i18n "No results found" }}');
      showResults();
      return;
    }

    renderSections();
    showResults();
  }

  function buildResults(rawHits, query) {
    const store = window.bookSearchStore;
    if (!store) return [];

    // Current page path (to skip it in full-text results)
    var currentPath = window.location.pathname;

    const terms = tokenizeQuery(query);
    const results = [];

    for (let i = 0; i < rawHits.length; i++) {
      const hit = rawHits[i];
      const id = hit.id;
      const page = store[id];
      if (!page) continue;
      // Skip current page (already shown in "在本页中")
      if (page.href === currentPath || page.href === currentPath + '/') continue;

      const snippet = extractSnippet(page.content, terms, query);
      results.push({
        id: id,
        href: page.href,
        title: page.title,
        section: page.section,
        snippet: snippet,
        allTerms: terms,
        chapter: page.chapter
      });
    }

    // Sort by chapter number ascending, pages without chapter go last
    results.sort(function (a, b) {
      var ca = a.chapter, cb = b.chapter;
      if (ca == null) ca = 9999;
      if (cb == null) cb = 9999;
      return ca - cb;
    });

    return results;
  }

  function tokenizeQuery(query) {
    // CJK: unigrams + bigrams + full. Latin: full word + trigrams.
    const terms = [];

    const cjkRe = /[\u4e00-\u9fff\u3400-\u4dbf\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]+/g;
    var cjk;
    while ((cjk = cjkRe.exec(query)) !== null) {
      var seq = cjk[0];
      for (var i = 0; i < seq.length; i++) {
        terms.push(seq[i]);
      }
      if (seq.length > 1) {
        for (var j = 0; j < seq.length - 1; j++) {
          terms.push(seq.substring(j, j + 2));
        }
        terms.push(seq);
      }
    }

    // Latin: full word + trigrams
    const latinRe = /[a-zA-Z0-9\u00c0-\u024f]+/g;
    var latin;
    while ((latin = latinRe.exec(query)) !== null) {
      var word = latin[0].toLowerCase();
      terms.push(word);
      if (word.length >= 3) {
        for (var k = 0; k <= word.length - 3; k++) {
          terms.push(word.substring(k, k + 3));
        }
      }
    }

    return terms;
  }

  function extractSnippet(content, terms, rawQuery) {
    if (!content) return content ? content.substring(0, 150).replace(/\s+/g, ' ').trim() + '…' : '';

    // First try to find the raw query as a substring
    var lowerContent = content.toLowerCase();
    var rawLower = rawQuery ? rawQuery.toLowerCase() : '';
    var bestPos = -1;
    var bestLen = 0;
    var bestMatch = rawQuery || '';

    if (rawLower) {
      bestPos = lowerContent.indexOf(rawLower);
      if (bestPos !== -1) {
        bestLen = rawLower.length;
      }
    }

    // Fall back to tokenized terms if raw query not found
    if (bestPos === -1 && terms && terms.length > 0) {
      for (var i = 0; i < terms.length; i++) {
        var pos = lowerContent.indexOf(terms[i].toLowerCase());
        if (pos !== -1 && (bestPos === -1 || pos < bestPos || (pos === bestPos && terms[i].length > bestLen))) {
          bestPos = pos;
          bestLen = terms[i].length;
          bestMatch = terms[i];
        }
      }
    }

    if (bestPos === -1) {
      return content.substring(0, 150).replace(/\s+/g, ' ').trim() + '…';
    }

    var start = Math.max(0, bestPos - SNIPPET_RADIUS);
    var end = Math.min(content.length, bestPos + bestLen + SNIPPET_RADIUS);

    // Adjust to word boundaries for Latin text
    if (start > 0) {
      var spaceBefore = content.lastIndexOf(' ', start + 20);
      if (spaceBefore > start - 20 && spaceBefore < start + 20) start = spaceBefore + 1;
    }
    if (end < content.length) {
      var spaceAfter = content.indexOf(' ', end - 20);
      if (spaceAfter > end - 20 && spaceAfter < end + 20) end = spaceAfter;
    }

    var snippet = content.substring(start, end).replace(/\s+/g, ' ').trim();
    if (start > 0) snippet = '…' + snippet;
    if (end < content.length) snippet = snippet + '…';

    // Highlight the best match
    if (bestMatch) {
      var escaped = bestMatch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      snippet = snippet.replace(new RegExp('(' + escaped + ')', 'gi'), '<mark>$1</mark>');
    }

    return snippet;
  }

  // ── In-page search ───────────────────────────────────

  function searchInPage(query) {
    var content = document.querySelector('.book-page');
    if (!content) return [];

    var lowerQ = query.toLowerCase();
    var results = [];
    var seenPositions = {}; // deduplicate by position

    var walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, null, false);
    while (walker.nextNode()) {
      var text = walker.currentNode.textContent;
      var lowerText = text.toLowerCase();
      var idx = 0;
      while ((idx = lowerText.indexOf(lowerQ, idx)) !== -1) {
        // Skip TOC / list areas
        var el = walker.currentNode.parentElement;
        var skip = false;
        while (el && el !== content) {
          var tag = el.tagName;
          if (tag === 'UL' || tag === 'OL' || tag === 'NAV' || tag === 'LI' ||
              (tag === 'DIV' && el.className && el.className.indexOf('toc') !== -1)) {
            skip = true; break;
          }
          el = el.parentElement;
        }
        if (!skip) {
          // Find nearest heading for context
          var node = walker.currentNode.parentElement;
          var headingText = '';
          var prev = node.previousElementSibling;
          while (prev) {
            if (/^H[1-6]$/.test(prev.tagName)) {
              headingText = prev.textContent.trim().replace(/^#+\s*/, '');
              break;
            }
            prev = prev.previousElementSibling;
          }
          if (!headingText) {
            var p = node.parentElement;
            while (p && p !== content) {
              var ps = p.previousElementSibling;
              while (ps) {
                if (/^H[1-6]$/.test(ps.tagName)) {
                  headingText = ps.textContent.trim().replace(/^#+\s*/, '');
                  break;
                }
                ps = ps.previousElementSibling;
              }
              if (headingText) break;
              p = p.parentElement;
            }
          }

          // Extract snippet around this match
          var posInText = idx;
          var start = Math.max(0, posInText - SNIPPET_RADIUS);
          var end = Math.min(text.length, posInText + query.length + SNIPPET_RADIUS);
          var snippet = text.substring(start, end).replace(/\s+/g, ' ').trim();
          if (start > 0) snippet = '…' + snippet;
          if (end < text.length) snippet = snippet + '…';

          // Highlight terms
          var escapedQ = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          snippet = snippet.replace(new RegExp('(' + escapedQ + ')', 'gi'), '<mark>$1</mark>');

          // Deduplicate by position in page
          var pagePos = idx + (walker.currentNode.parentElement.getBoundingClientRect().top + window.pageYOffset);
          var posKey = Math.round(pagePos / 100);
          if (!seenPositions[posKey]) {
            seenPositions[posKey] = true;
            results.push({
              type: 'inpage',
              snippet: snippet,
              heading: headingText,
              scrollTarget: walker.currentNode.parentElement,
              matchText: text.substring(idx, idx + query.length)
            });
          }
        }
        idx += query.length;
      }
    }
    return results;
  }

  // ── Rendering ────────────────────────────────────────

  function renderSections() {
    resultsInner.innerHTML = '';

    var queryParam = currentQuery ? '?q=' + encodeURIComponent(currentQuery) : '';
    var hasInPage = allInPageHits.length > 0;
    var hasFullText = allFullTextHits.length > 0;

    // ── In-page section ──
    if (hasInPage) {
      var sectionDiv = document.createElement('div');
      sectionDiv.className = 'book-search-section';

      var header = document.createElement('div');
      header.className = 'book-search-section-header';
      header.textContent = '{{ i18n "On this page" }}';
      sectionDiv.appendChild(header);

      var list = document.createElement('div');
      list.className = 'book-search-section-list';
      list.setAttribute('data-section', 'inpage');
      sectionDiv.appendChild(list);

      renderHitList(list, allInPageHits, IN_PAGE_INITIAL, inPageShown, 'inpage', queryParam, function (count) {
        inPageShown = count;
        refreshListDisplay(list, allInPageHits, count, 'inpage', queryParam);
      });

      resultsInner.appendChild(sectionDiv);
    }

    // ── Separator ──
    if (hasInPage && hasFullText) {
      var sep = document.createElement('div');
      sep.className = 'book-search-separator';
      resultsInner.appendChild(sep);
    }

    // ── Full-text section ──
    if (hasFullText) {
      var ftDiv = document.createElement('div');
      ftDiv.className = 'book-search-section';

      var ftHeader = document.createElement('div');
      ftHeader.className = 'book-search-section-header';
      ftHeader.textContent = '{{ i18n "In the book" }}';
      ftDiv.appendChild(ftHeader);

      var ftList = document.createElement('div');
      ftList.className = 'book-search-section-list';
      ftList.setAttribute('data-section', 'fulltext');
      ftDiv.appendChild(ftList);

      renderHitList(ftList, allFullTextHits, FULL_TEXT_INITIAL, fullTextShown, 'fulltext', queryParam, function (count) {
        fullTextShown = count;
        refreshListDisplay(ftList, allFullTextHits, count, 'fulltext', queryParam);
      });

      resultsInner.appendChild(ftDiv);
    }

    // Reset counts after render
    if (!hasInPage) inPageShown = 0;
    if (!hasFullText) fullTextShown = 0;
  }

  function renderHitList(container, hits, initial, shown, type, queryParam, loadMoreFn) {
    var count = shown > 0 ? Math.min(shown, hits.length) : Math.min(initial, hits.length);
    if (type === 'inpage') inPageShown = count;
    else fullTextShown = count;

    for (var i = 0; i < count; i++) {
      var hit = hits[i];
      var item;

      if (type === 'inpage') {
        item = document.createElement('span');
        item.className = 'book-search-result-item book-search-result-inpage';
        item.setAttribute('tabindex', '0');
        item.addEventListener('click', function (hit) {
          return function (e) {
            e.preventDefault();
            scrollToInPageMatch(hit);
            hideResults();
          };
        }(hit));
      } else {
        item = document.createElement('a');
        item.className = 'book-search-result-item';
        item.href = hit.href + queryParam;
      }

      item.setAttribute('role', 'option');

      var headingHTML = hit.heading ? '<span class="book-search-result-heading">' + escapeHTML(hit.heading) + '</span>' : '';
      var titleHTML = type === 'fulltext' ? '<span class="book-search-result-title">' + escapeHTML(hit.title) + '</span>' : '';

      item.innerHTML = titleHTML + headingHTML + '<span class="book-search-result-snippet">' + hit.snippet + '</span>';

      container.appendChild(item);
    }

    // "Load more" button
    if (count < hits.length) {
      var moreBtn = document.createElement('button');
      moreBtn.className = 'book-search-more-btn';
      moreBtn.textContent = '{{ i18n "More" }}';
      moreBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        loadMoreFn(Math.min(count + LOAD_MORE_COUNT, hits.length));
      });
      container.appendChild(moreBtn);
    }
  }

  function refreshListDisplay(container, hits, count, type, queryParam) {
    // Clear and re-render with more items
    container.innerHTML = '';

    for (var i = 0; i < count; i++) {
      var hit = hits[i];
      var item;

      if (type === 'inpage') {
        item = document.createElement('span');
        item.className = 'book-search-result-item book-search-result-inpage';
        item.setAttribute('tabindex', '0');
        item.addEventListener('click', function (hit) {
          return function (e) {
            e.preventDefault();
            scrollToInPageMatch(hit);
            hideResults();
          };
        }(hit));
      } else {
        item = document.createElement('a');
        item.className = 'book-search-result-item';
        item.href = hit.href + queryParam;
      }

      item.setAttribute('role', 'option');

      var headingHTML = hit.heading ? '<span class="book-search-result-heading">' + escapeHTML(hit.heading) + '</span>' : '';
      var titleHTML = type === 'fulltext' ? '<span class="book-search-result-title">' + escapeHTML(hit.title) + '</span>' : '';

      item.innerHTML = titleHTML + headingHTML + '<span class="book-search-result-snippet">' + hit.snippet + '</span>';
      container.appendChild(item);
    }

    // "Load more" button
    if (count < hits.length) {
      var moreBtn = document.createElement('button');
      moreBtn.className = 'book-search-more-btn';
      moreBtn.textContent = '{{ i18n "More" }}';
      moreBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        refreshListDisplay(container, hits, Math.min(count + LOAD_MORE_COUNT, hits.length), type, queryParam);
        if (type === 'inpage') inPageShown = Math.min(count + LOAD_MORE_COUNT, hits.length);
        else fullTextShown = Math.min(count + LOAD_MORE_COUNT, hits.length);
      });
      container.appendChild(moreBtn);
    }
  }

  function scrollToInPageMatch(hit) {
    if (!hit.scrollTarget) return;
    // Scroll the target element into view
    hit.scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Briefly highlight nearby text
    var range = document.createRange();
    var walker = document.createTreeWalker(hit.scrollTarget, NodeFilter.SHOW_TEXT);
    var node = walker.nextNode();
    if (node) {
      var lower = node.textContent.toLowerCase();
      var idx = lower.indexOf(currentQuery.toLowerCase());
      if (idx !== -1) {
        range.setStart(node, idx);
        range.setEnd(node, idx + currentQuery.length);
        var mark = document.createElement('mark');
        mark.style.cssText = 'background:#fff3b0;border-radius:2px;padding:1px 2px;transition:background 0.8s';
        try { range.surroundContents(mark); } catch(e) {}
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
        }, 2500);
      }
    }
  }

  function showMessage(msg) {
    resultsInner.innerHTML =
      '<div class="book-search-result-empty">' + escapeHTML(msg) + '</div>';
  }

  function clearResults() {
    resultsInner.innerHTML = '';
    allInPageHits = [];
    allFullTextHits = [];
    inPageShown = 0;
    fullTextShown = 0;
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
    resultsPanel.style.maxHeight = Math.min(600, availableHeight) + 'px';
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
