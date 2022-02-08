Math typesetting using KaTex in Gitbook
==============

As the gitbook official plugin named katex was not maintained. So here is the enhanced version basesd the [official version](https://github.com/GitbookIO/plugin-katex).

## New features
- Display math has `\tag` rendered on the right, like `\usepackage{amsmath}` in LaTeX. 
- Outputs HTML for visual rendering and includes MathML for accessibility.
- Using Katex 0.11.1

## Install

Use it for your book, by adding to your book.json:

```
{
    "plugins": ["katex-pp"]
}
```

then run `gitbook install`.

## Usage

```
Inline math: $$\int_{-\infty}^\infty g(x) dx$$


Block math:

$$
\int_{-\infty}^\infty g(x) dx
$$

Block math with (tag):

$$
\tag{hi} x+y^{2x}
$$

Block math with tag:
$$
\tag*{hi} x+y^{2x}
$$

Or using the templating syntax:

{% math %}\int_{-\infty}^\infty g(x) dx{% endblock %}
```




