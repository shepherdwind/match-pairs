'use strict'
const matchPairs = require('../');

exports.render = async (str) => {
  return (await import('markdown-it')).default().use(matchPairs).render(str)
}
