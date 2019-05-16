'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const crypto = require('crypto')
function md5 (data) {
  return crypto.createHash('md5').update(data, 'utf8').digest('hex')
}
exports.md5 = md5
function sha256 (data) {
  return crypto.createHash('sha256').update(data, 'utf8').digest('hex')
}
exports.sha256 = sha256
