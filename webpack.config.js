// libs
const path = require('path')
// plugins
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MinimizeCssAssetWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
// loaders
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const filename = (ext) =>
  isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

const optimization = () => {
  const configObj = {
    splitChunks: {
      chunks: 'all',
    },
  }

  if (isProd) {
    configObj.minimizer = [
      new MinimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin(),
    ]
  }

  return configObj
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './index.ts',
  devtool: isProd ? false : 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `./js/${filename('js')}`,
    publicPath: '',
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, 'src'),
    },
    open: false,
    compress: true,
    hot: true,
    port: 3000,
  },
  optimization: optimization(),
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.pug'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `./css/${filename('css')}`,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/'),
          to: path.resolve(__dirname, 'dist/assets/'),
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return (
                  path.relative(path.dirname(resourcePath), context) + '/style/'
                )
              },
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `./assets/img/${filename('[ext]')}`,
            },
          },
        ],
      },
      {
        test: /\.(?:|ttf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `./assets/fonts/${filename('[ext]')}`,
            },
          },
        ],
      },
    ],
  },
}
