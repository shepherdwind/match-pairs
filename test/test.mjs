import { fileURLToPath } from 'node:url'
import markdownIt from 'markdown-it'
import generate from 'markdown-it-testgen'
import matchPairs from '../index.mjs'
import mark from 'markdown-it-mark'

describe('markdown-it-mark', function () {
  const md = markdownIt().use(matchPairs).use(mark)

  generate(fileURLToPath(new URL('fixtures/match_pairs.txt', import.meta.url)), md)
})