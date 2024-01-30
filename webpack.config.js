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
  const defaults = {
    DEV_PORT: 8000,
    BUILD_MODE: mode,
    TELEMETRY_SERVICE_NAME: 'my-app',
    TELEMETRY_COLLECTOR_URL: 'https://api.honeycomb.io:443/v1/traces',
    TELEMETRY_COLLECTOR_HEADER: 'x-honeycomb-team',
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
  const publicPath = mode === 'development' ? `https://localhost:${process.env.DEV_PORT}/` : process.env.APP_URL
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
    entry: path.resolve(__dirname, 'index.js'),
    output: {
      filename: 'index.js',
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
