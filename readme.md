# markdown-match-pairs

[![CI](https://github.com/shepherdwind/match-pairs/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/shepherdwind/match-pairs/actions)
[![NPM version](https://img.shields.io/npm/v/markdown-match-pairs.svg?style=flat)](https://www.npmjs.org/package/markdown-match-pairs)
[![Coverage Status](https://img.shields.io/coveralls/shepherdwind/match-pairs/master.svg?style=flat)](https://coveralls.io/r/shepherdwind/match-pairs?branch=master)


This is a plugin that fixes the logic for bold text in markdown-it.

## Issue

By default, markdown-it identifies whether `**` can be closed based on the following rules:

- If there is a space on the left, then `open = true`
- If there is a space on the right, then `close = true`
- If neither side has a space, it checks for special characters such as `+-=` or other language separators like `:` or Chinese semicolons. If these symbols 
- are present, they are treated as spaces.

This leads to the following parsing results:

```js
render('**==foo==**') === '<p>**<mark>foo</mark>**</p>';
render('**中文：**中文') === '<p>**中文：**中文</p>';
```

In reality, we expect both cases to output a strong tag.

## Implementation Logic

The implementation logic is as follows: insert a function before `balance_pairs`. After completing inline rule parsing, adjust the delimiters. After adjustment, whether `**` can be closed depends on whether there was an open `**` before it.

After using this plugin, the above examples will output as follows:

```js
render('**==foo==**') === '<p><strong><mark>foo</mark></strong></p>';
render(' **Chinese:** Chinese ') === ' < p > < strong > Chinese: </ strong > Chinese </ p > ';
```

## Install

```
npm install markdown-match-pairs --save
```

## Usage

```js
var md = require('markdown-it')()
.use(require('markdown-it-mark'));
```

## Testing

This plugin has copied all existing test cases from the markdown-it repository to ensure that old test cases pass.

## License

MIT