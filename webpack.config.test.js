const path = require('path')
const FetchWritePlugin = require('./dist/index').default

module.exports = {
  mode: 'development',
  entry: './test/template/index.js',
  output: {
    filename: 'test.js',
    path: path.resolve(__dirname, 'test')
  },
  plugins: [
    new FetchWritePlugin([
      {
        fetchOpts: {
          url: 'http://localhost:4080/get/matcher',
          retryOn: true,
          headers: {
            'Content-Type': 'application/json'
          }
        },
        to: {
          name: 'matcher.json',
          toPath: './static/bundle'
        }
      }
    ])
  ]
}
