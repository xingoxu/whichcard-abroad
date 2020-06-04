const path = require('path');
const WebpackBarPlugin = require('webpackbar');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode:
    process.env.NODE_ENV === 'production'
      ? 'production'
      : 'development',
  devtool: false,
  entry: {
    server: path.resolve(
      __dirname,
      './server.ts'
    ),
    serverless: path.resolve(
      __dirname,
      './serverless.ts'
    )
  },
  output: {
    path: path.resolve(
      __dirname,
      './.nuxt/dist'
    ),
    filename: '[name].js',
    libraryTarget: 'commonjs'
  },
  resolve: {
    extensions: [
      '.js',
      '.ts',
      '.json',
      '.tsx'
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile:
                'tsconfig-server.json'
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  target: 'node',
  externals: ['nuxt'],
  optimization: {
    minimize: false
  },
  stats: 'errors-only',
  externals: [
    // /^sass$/,
    // /^fibers$/,
    /^fsevents$/,
    /^fs$/,
    /^events$/,
    /^nuxt$/
  ],
  plugins: [
    new WebpackBarPlugin({
      name: 'Serverless',
      color: '#228be6'
    })
  ]
};
