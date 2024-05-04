'use strict'

const assert = require('assert')
const matchPairs = require('../index')
const markdown = require('markdown-it');
const md = markdown();
const marker = require('markdown-it-mark');
const md2 = markdown().use(matchPairs).use(marker);

describe('CJS', () => {
  it('require', () => {
    assert.strictEqual(md.render('abc'), '<p>abc</p>\n')
  });
  
  it('matchPairs', () => {
    assert.strictEqual(md.render('**abc=**abc'), '<p>**abc=**abc</p>\n')
    assert.strictEqual(md2.render('**abc=**abc'), '<p><strong>abc=</strong>abc</p>\n')
    
    assert.strictEqual(md.render('中文**=测试=**中文'), '<p>中文**=测试=**中文</p>\n')
    assert.strictEqual(md2.render('中文**=测试=**中文'), '<p>中文<strong>=测试=</strong>中文</p>\n')
  });
})
