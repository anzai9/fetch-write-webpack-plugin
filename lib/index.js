import fs from 'fs-extra'
import path from 'path'
import { promisify } from 'util'

import fetch from 'node-fetch'

export const standardizeFilePath = file => {
  file.name = file.name?.replace(/\\/g, '/')
  file.path = file.path?.replace(/\\/g, '/')
  return file
}

export const fetchRetry = (url, options = {}) => {
  const defaultOptions = {
    retries: 3,
    retryDelay: 1000,
    retryOn: false
  }
  const opts = Object.assign({}, defaultOptions, options)
  const { retries, retryDelay, retryOn, ...fetchOpts } = opts
  return new Promise((resolve, reject) => {
    const wrappedFetch = async attempt => {
      try {
        const res = await fetch(url, fetchOpts)
        resolve(res)
      } catch (err) {
        if (retryOn && attempt < retries) {
          retry(attempt)
        }
        reject(err)
      }
    }

    const retry = attempt => {
      setTimeout(() => {
        wrappedFetch(++attempt)
      }, retryDelay)
    }

    wrappedFetch(0)
  })
}

export const fetchAll = (config = {}, callback) => {
  const { opts, logger } = config
  return Promise.all(
    opts.map(async config => {
      const { fetchOpts, output } = config
      const { url, ...opts } = fetchOpts
      try {
        const res = await fetchRetry(url, opts)
        const resJson = await res.json()
        callback(output, resJson, logger)
      } catch (err) {
        logger.error(err)
      }
    })
  )
}

export const preProcessOptions = (isArray, options) => {
  const { opts, compiler } = options
  const mapOpts = isArray ? opts : [opts]
  const config = mapOpts.map(opt => {
    const outputFolder = compiler.options.output.path
    const { output: { name, ext, basePath } = {} } = opt || {}
    const { name: stdName, path: stdPath } = standardizeFilePath({
      name,
      path: basePath
    })
    const filename = ext
      ? `${stdName}${ext.charAt(0) === '.' ? 'ext' : `.${ext}`}`
      : stdName
    const dest = stdPath
      ? path.resolve(process.cwd(), stdPath, filename)
      : path.resolve(outputFolder, filename)
    return {
      ...opt,
      output: dest
    }
  })
  return {
    ...options,
    opts: config
  }
}

class FetchAndWritePlugin {
  constructor(options) {
    this.options = { opts: options }
  }

  genFile = async (filename, fileContent, logger) => {
    try {
      await promisify(fs.outputFileSync)(filename, JSON.stringify(fileContent))
    } catch (err) {
      logger.error(err)
    }
  }

  apply(compiler) {
    const plugin = { name: 'FetchAndWritePlugin' }

    if (!compiler.options.output || !compiler.options.output.path) {
      console.warn(
        'fetch-write-webpack-plugin: output path not defined. Plugin disabled...'
      )

      return
    }

    compiler.hooks.beforeRun.tapAsync(plugin, async (compilation, callback) => {
      const logger = compilation.getLogger
        ? compilation.getLogger(plugin)
        : console
      logger.debug('before run...')
      const { options } = this
      options.compiler = compiler
      options.logger = logger

      if (!options.opts) {
        const newError = new Error(
          '[FetchJsonWebpackPlugin]: the config cannot be empty'
        )
        logger.error(newError.message)
      }
      const isArray = Array.isArray(options.opts)

      if (isArray && !options.opts.length) {
        const newError = new Error(
          '[FetchJsonWebpackPlugin]: the config cannot be empty'
        )
        logger.error(newError.message)
      }

      try {
        const config = preProcessOptions(isArray, options)
        await fetchAll(config, this.genFile)
      } catch (err) {
        logger.error(err)
      }
      logger.debug('finishing beforeRun...')
      callback()
    })
  }
}

export default FetchAndWritePlugin
