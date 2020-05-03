<h1 style="text-align:center">fetch-write-webpack-plugin</h1>
<div style="text-align:center">
  <a href="https://www.npmjs.com/package/fetch-write-webpack-plugin" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/fetch-write-webpack-plugin.svg">
  </a>
  <img alt="Version" src="https://github.com/anzai9/fetch-write-webpack-plugin/workflows/Publish/badge.svg">
  <a href="https://github.com/anzai9/fetch-write-webpack-plugin/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/anzai9/fetch-write-webpack-plugin" />
  </a>
</div>

Webpack plugin that would fetch the data source and write the file on build time 🚀

## Install

```sh
npm i -D fetch-write-webpack-plugin
```

```sh
yarn add --dev fetch-write-webpack-plugin
```

This is a [webpack](http://webpack.js.org/) plugin that could fetch the data on the other server and generate the corresponding files that you want bundle at the build time.

## Usage

The plugin support fetch multiple data sources and build them each other before the compile.

webpack.config.js

```javascript
const FetchWritePlugin = require('fetch-write-webpack-plugin')

module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new FetchWritePlugin([
      {
        fetchOpts: {
          url: 'http://localhost:4080/get/style',
          retryOn: true,
          headers: {
            'Content-Type': 'application/json'
          }
        },
        output: {
          name: 'style.json',
          basePath: './static/bundle'
        }
      },
      {
        fetchOpts: {
          url: 'http://localhost:4080/get/name',
          retryOn: true,
          headers: {
            'Content-Type': 'application/json'
          }
        },
        output: {
          name: 'name',
          ext: 'json'
        }
      }
    ])
  ]
}
```

This will fetch to the data from `http://host/data/you/want` and generate the file at `./static/name.json`.

If you have multiple data sources and file you want to generate on run time, you could use an array to wrap all configure.

Want to know more detail. [Ref](https://github.com/anzai9/fetch-write-webpack-plugin/blob/master/exapmle/webapck.config.js)

## Options

### The plugin's signature:

**webpack.config.js**

```javasript
module.exports = {
  plugins: [new CopyPlugin([{fetchOpts, output}, ...])]
}
```

### Fetch Options

| Name       | Type           | Default     | Description                                        |
| ---------- | -------------- | ----------- | -------------------------------------------------- |
| url        | `string`       | `undefined` | data source's url                                  |
| method     | `{GET | POST}` | `GET`       | fetch method                                       |
| headers    | `any`          | `undefined` | http headers                                       |
| body       | `any`          | `undefined` | http body                                          |
| retryOn    | `boolean`      | `false`     | determine the retry fetch whether turn on or not   |
| retries    | `number`       | `3`         | retry count only work while the retry on is `true` |
| retryDelay | `number`       | `1000`      | retry delay only work while the retry on is `true` |

### Output Options

| Name     | Type     | Default               | Description           |
| -------- | -------- | --------------------- | --------------------- |
| name     | `string` | `undefined`           | filename              |
| ext      | `string` | `undefined`           | file extension        |
| basePath | `string` | `webapck output path` | output file base path |

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

[MIT](https://github.com/anzai9/fetch-write-webpack-plugin/blob/master/LICENSE) licensed.
