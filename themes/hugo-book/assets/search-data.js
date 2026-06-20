'use strict';

(function () {
  const indexCfg = {{ with i18n "bookSearchConfig" }}
    {{ . }};
  {{ else }}
   {};
  {{ end }}

  indexCfg.doc = {
    id: 'id',
    field: ['title', 'content'],
    store: ['id', 'title', 'href', 'section'],
  };

  const index = FlexSearch.create('balance', indexCfg);
  window.bookSearchIndex = index;

  // Content store for snippet extraction
  window.bookSearchStore = [];

  {{- $pages := where .Site.Pages "Kind" "in" (slice "page" "section") -}}
  {{- $pages = where $pages "Params.booksearchexclude" "!=" true -}}
  {{- $pages = where $pages "Content" "not in" (slice nil "") -}}

  {{ range $index, $page := $pages }}
  index.add({
    'id': {{ $index }},
    'href': '{{ $page.RelPermalink }}',
    'title': {{ (partial "docs/title" $page) | jsonify }},
    'section': {{ (partial "docs/title" $page.Parent) | jsonify }},
    'content': {{ $page.Plain | jsonify }}
  });
  window.bookSearchStore[{{ $index }}] = {
    'href': '{{ $page.RelPermalink }}',
    'title': {{ (partial "docs/title" $page) | jsonify }},
    'section': {{ (partial "docs/title" $page.Parent) | jsonify }},
    'content': {{ $page.Plain | jsonify }},
    'chapter': {{ with $page.Params.chapter }}{{ . }}{{ else }}9999{{ end }}
  };
  {{- end -}}
})();
