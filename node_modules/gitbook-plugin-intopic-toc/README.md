# GitBook plugin: InTopic TOC

![Build Status](https://api.travis-ci.org/zanfab/gitbook-plugin-intopic-toc.svg)
[![npm version](https://img.shields.io/npm/v/gitbook-plugin-intopic-toc/latest.svg)](https://www.npmjs.com/package/gitbook-plugin-intopic-toc)
[![npm Downloads](https://img.shields.io/npm/dt/gitbook-plugin-intopic-toc.svg)](https://www.npmjs.com/package/gitbook-plugin-intopic-toc)

This GitBook plugin adds an inline table of contents (TOC) to each page based on configurable selectors. Inline TOC can be enabled or disabled by default or on individual pages. TOC is placed on the right side and moves to top for smaller devices automatically.

Inline TOC stays at the top of the page when scrolling using a sticky effect. Current position is highlighted by a scrollspy effect.

![Inline TOC in desktop and mobile mode](https://user-images.githubusercontent.com/44210522/79138004-0df58180-7db4-11ea-9df4-95cd42e1f251.gif)

Plugin uses [gumshoe](https://github.com/cferdinandi/gumshoe) and [anchorjs](https://github.com/bryanbraun/anchorjs) to implement functionality.

## Installation

### Step #1 - Update book.json file

1. In you gitbook's book.json file, add `intopic-toc` to plugins list.
2. In pluginsConfig, configure the plugin so it does fit your needs. A custom setup is not mandatory.

**Sample `book.json` file for gitbook version 2.0.0+**

```json
{
  "plugins": [
    "intopic-toc"
  ]
}
```

**Sample `book.json` file for gitbook version 2.0.0+ and custom heading**

```json
{
  "plugins": [
    "intopic-toc"
  ],
  "pluginsConfig": {
    "intopic-toc": {
      "label": "In this article"
    }
  }
}
```

**Sample `book.json` file for gitbook version 2.0.0+  and multilingual headings**

```json
{
  "plugins": [
    "intopic-toc"
  ],
  "pluginsConfig": {
    "intopic-toc": {
      "label": {
        "de": "In diesem Artikel",
        "en": "In this article"
      }
    }
  }
}
```

Note: Above snippets can be used as complete `book.json` file, if one of these matches your requirements and your book doesn't have one yet.

### Step #2 - gitbook commands

1. Run `gitbook install`. It will automatically install `intopic-toc` gitbook plugin for your book. This is needed only once.
2. Build your book (`gitbook build`) or serve (`gitbook serve`) as usual.

## Usage

For basic usage, the only thing you have to do is install the plugin. For advanced scenarios see following configuration sample.

```json
{
  "plugins": [
    "intopic-toc"
  ],
  "pluginsConfig": {
    "intopic-toc": {
      "selector": ".markdown-section h1, .markdown-section h2, .markdown-section h3, .markdown-section h4, .markdown-section h5, .markdown-section h6",
      "mode": "nested",
      "maxDepth": 2,
      "isCollapsed": false,
      "isScrollspyActive": true,
      "visible": true,
      "label": {
        "de": "In diesem Artikel",
        "en": "In this article"
      },
    }
  }
}
```

| Property | Description                                                  | Default value        |
| -------- | ------------------------------------------------------------ | -------------------- |
| selector | Selector used to find elements to put anchors on - only HTML headings h1 - h6 are allowed. | .markdown-section h1, .markdown-section h2, .markdown-section h3, .markdown-section h4, .markdown-section h5, .markdown-section h6 |
| mode | Defines how plugin will be rendered. Possible values: 'flat' or 'nested'. | nested |
| maxDepth | Defines the amount of headings which should be considered during rendering. | 6 |
| isCollapsed | Defines whether the items are collapsed by default and are only expanded when activated. (Only considered when mode = 'nested') | true |
| isScrollspyActive | Defines whether scrollspy effect should be applied. | true |
| visible | Defines whether to show the navigation on every page | true |
| label | Label which is used as heading for the navigation. Could be a single string or an object for multilingual setups | In this article |

### Visibility

If `visible` parameter set to true and you want to hide the TOC on a single page, add the front matter item `isTocVisible: false` to the top of the Markdown file like this:

```markdown
---
isTocVisible: false
---
# My awesome documentation

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, ...
```

The specific front matter `isTocVisible` overrides the `visible` parameter from global configuration.

### Headings

Heading are identified using `selector` property of the plugin. Usually there is no need to adjust the default value. For customizations see following sections.

By default, the plugin chooses the top-level navigation items by searching for headings at the first identified heading level using `selector` property value, then works its way down (`<h1/>`, then `<h2/>`, etc.) It will stop when it finds the first set of headings where more than one exists at that level. For example (assuming we do not have modified the `selector` property):

```html
<h1>Title</h1>
...
<h2>1 Section 1</h2>
<h3>1.1 Subsection</h3>
...
<h4>1.1.1 Subsection</h4>
...
<h3>1.2 Subsection</h3>
...
<h2>2 Section 2</h2>
<h3>2.1 Subsection</h3>
...
```

The plugin would see there’s only one `<h1>`, then that `<h2>` appears two times. Then it stops and identified level becomes the top-level navigation items in the table of contents. Following headings under those (the `<h3>`s and `<h4>`s in this case) would be the next levels in the navigation.

Described mechanism applies to all `flat` and `nested` mode. Rendering depth could be limited by specifying `maxDepth` property value.

Resulting table of contents using mode = `flat` and `maxDepth` = 2 would look like:

```text
1 Section 1
1.1 Subsection
1.2 Subsection
2 Section 2
2.1 Subsection
```

Resulting table of contents using mode = `nested` and `maxDepth` = 2 would look like:

```text
1 Section 1
  1.1 Subsection
  1.2 Subsection
2 Section 2
  2.1 Subsection
```

## Troubleshooting

If inline TOC does not look as expected, check if your `book.json` is valid according to this documentation.

## Changelog

05/03/2020 - Added support for different layout modes along with improved scrollspy experience

01/07/2019 - Used [gumshoe scrollspy script](https://github.com/cferdinandi/gumshoe) for a better experience

01/05/2019 - Initial Release
