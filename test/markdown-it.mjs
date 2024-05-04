import { fileURLToPath } from 'node:url'
import generate from 'markdown-it-testgen'
import matchPairs from '../index.mjs'
import markdownit from 'markdown-it'

describe('markdown-it', function () {
  const md = markdownit({
    html: true,
    langPrefix: '',
    typographer: true,
    linkify: true
  }).use(matchPairs)

  generate(fileURLToPath(new URL('fixtures/markdown-it', import.meta.url)), md)
})
