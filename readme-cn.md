# markdown-match-pairs

这是一个修正 markdown-it 对于加粗逻辑的插件。

## 问题

默认情况，markdown-it 识别 `**` 是否可以作为标签闭合的原则是这样的
- 如果左边有空格，那么 `open = true`
- 如果右边有空格，那么 `close = true`
- 如果都不是空格，看是否有特殊字符 `+-=` 之类的关键字符，或者其他语言的分割符比如 `：` 中文的分号，如果有这些符号也作为空格处理

这导致了以下解析结果
```js
render('**==foo==**') === '<p>**<mark>foo</mark>**</p>';
render('**中文：**中文') === '<p>**中文：**中文</p>';
```

实际情况，这里都期望是输出一个 strong 标签。

## 实现逻辑

这个实现逻辑是这样的，插入一个函数在 `balance_pairs` 之前。在 inline 的 rule 解析完成以后，对 delimiters 进行修正，修正以后，`**` 是否可以闭合取决于前面是否有没有 open 的 `**`.

使用这个插件以后，上面例子输出如下

```js
render('**==foo==**') === '<p><strong><mark>foo</mark></strong></p>';
render('**中文：**中文') === '<p><strong>中文：</strong>中文</p>';
```


## install

```
npm install markdown-match-pairs --save
```

## Usage

```js
var md = require('markdown-it')()
            .use(require('markdown-it-mark'));
```

## 测试

本插件从 markdown-it 仓库把现有的用例都复制过来了，保证老的用例是通过的。

## License

MIT