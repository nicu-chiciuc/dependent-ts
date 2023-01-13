
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./tsdx-dependent.cjs.production.min.js')
} else {
  module.exports = require('./tsdx-dependent.cjs.development.js')
}
