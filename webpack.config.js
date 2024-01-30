import path from 'path'
import webpack from 'webpack'
import { fileURLToPath } from 'url'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function setEnvDefaults({ mode = 'production' }) {
  const DEV_PORT = process.env.DEV_PORT || 8000

  /** @type {Object<string, *>} */
  const defaults = {
    DEV_PORT,
    BUILD_MODE: mode,
    TELEMETRY_SERVICE_NAME: 'my-app',
    TELEMETRY_COLLECTOR_URL: 'https://api.honeycomb.io:443/v1/traces',
    TELEMETRY_COLLECTOR_HEADER: 'x-honeycomb-team',
    // RENDER_EXTERNAL_URL is added by render.com when the app is built in that environment
    APP_URL: process.env.RENDER_EXTERNAL_URL || `http://localhost:${DEV_PORT}`,
  }

  Object.keys(defaults).forEach((key) => {
    if (!process.env[key]) {
      // @ts-ignore
      process.env[key] = defaults[key]
    }
  })

  return process.env
}

/**
 * @param {{types: boolean}} arg
 * @param {{mode: 'production'|'development'}} argv
 * */
export default ({ types = true }, { mode }) => {
  setEnvDefaults({ mode })
  const publicPath = `${process.env.APP_URL}/`

  const typeChecking = types
    ? [
        {
          test: /\.js?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ]
    : []

  return {
    entry: path.resolve(__dirname, 'src/app-enter.js'),
    output: {
      filename: 'app-enter.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath,
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      https: true,
      historyApiFallback: true,
      port: process.env.DEV_PORT,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      },
    },
    devtool: 'source-map',
    module: {
      rules: [
        //comment out below line to disable type checking
        ...typeChecking,
      ],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [path.join(__dirname, 'dist/**/*')],
      }),
      new webpack.DefinePlugin(
        Object.keys(process.env).reduce((acc, key) => {
          // @ts-ignore
          acc[`process.env.${key}`] = JSON.stringify(process.env[key])
          return acc
        }, {})
      ),
      new HtmlWebpackPlugin({
        template: 'index.html',
      }),
    ],
  }
}
