import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
const ImageminPlugin = require('imagemin-webpack-plugin').default;
import imageminMozjpeg from 'imagemin-mozjpeg';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

export default {
  context: path.resolve(__dirname, '../src'),
  entry: {
    home: 'pages/home/index.js',
    signin: 'pages/signin/index.js',
    success: 'pages/success/index.js',
    dashboard: 'pages/dashboard/index.js',
    verify: 'pages/verify/index.js'
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'assets/js/[name].bundle.js'
  },
  resolve:{
    alias: {
      sass: path.resolve(__dirname, '../src/sass/'),
      reusable: path.resolve(__dirname, '../src/reusable/'),
      pages: path.resolve(__dirname, '../src/pages/')
    },
    modules: ['node_modules', path.resolve(__dirname, '../src')]
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                ctx: {
                  env: process.env.NODE_ENV
                }
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/img',
          publicPath: '../img'
        }
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].min.css',
      chunkFilename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      filename: 'home.html',
      template: '../src/pages/home/home.html',
      cache: true,
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      filename: 'signin.html',
      template: '../src/pages/signin/signin.html',
      cache: true,
      chunks: ['signin']
    }),
    new HtmlWebpackPlugin({
      filename: 'success.html',
      template: '../src/pages/success/success.html',
      cache: true,
      chunks: ['success']
    }),
    new HtmlWebpackPlugin({
      filename: 'dashboard.html',
      template: '../src/pages/dashboard/dashboard.html',
      cache: true,
      chunks: ['dashboard']
    }),
    new HtmlWebpackPlugin({
      filename: 'verify.html',
      template: '../src/pages/verify/verify.html',
      cache: true,
      chunks: ['verify']
    }),
    new CopyPlugin([
      { from: 'assets/img/icons', to: 'assets/img/icons' },
    ]),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
        plugins: [
          imageminMozjpeg({
            quality: 75,
            progressive: true
        })
      ],
      optipng: {
        optimizationLevel: 3
      },
      jpegtran: null,
      cacheFolder: path.resolve(__dirname, '../src/cache-img')
    })
  ]
}
