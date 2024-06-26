# markdown-match-pairs

[![CI](https://github.com/shepherdwind/match-pairs/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/shepherdwind/match-pairs/actions)
[![NPM version](https://img.shields.io/npm/v/markdown-match-pairs.svg?style=flat)](https://www.npmjs.org/package/markdown-match-pairs)
[![Coverage Status](https://img.shields.io/coveralls/shepherdwind/match-pairs/master.svg?style=flat)](https://coveralls.io/r/shepherdwind/match-pairs?branch=master)


This is a plugin that fixes the logic for bold text in [markdown-it](https://github.com/markdown-it/markdown-it).

> This issue has been encountered by many people, and there have been many discussions about it, such as
> - outline/outline/issues/6683
> - commonmark/commonmark-spec/issues/650

## Issue

By default, markdown-it identifies whether `**` can be closed based on the following rules:

- If there is a space on the left, then `open = true`
- If there is a space on the right, then `close = true`
- If neither side has a space, it checks for special characters such as `+-=` or other language separators for example Chinese semicolons `：`. If these symbols are present, they are treated as spaces.

This leads to the following parsing results:

```js
render('**==foo==**abc') === '<p>**<mark>foo</mark>**abc</p>';
render('**中文：**中文') === '<p>**中文：**中文</p>';
```

In reality, we expect both cases to output a strong tag.

## Implementation Logic

The implementation logic is as follows: insert a function before `balance_pairs`. After completing inline rule parsing, adjust the delimiters. After adjustment, whether `**` can be closed depends on whether there was an open `**` before it.

After using this plugin, the above examples will output as follows:

```js
render('**==foo==**abc') === '<p><strong><mark>foo</mark></strong>abc</p>';
render('**中文：**中文') === '<p><strong>中文：</strong>中文</p> ';
```

## Install

```
npm install markdown-match-pairs --save
```

## Usage

```js
var md = require('markdown-it')()
         .use(require('markdown-match-pairs'));
```

## Testing

This plugin has copied **all existing test cases from the markdown-it repository to ensure that old test cases pass**.

## License

MIT
