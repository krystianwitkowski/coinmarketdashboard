import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  context: path.resolve(__dirname, '../src'),
  entry: {
    home: 'pages/home/index.js',
    signin: 'pages/signin/index.js',
    success: 'pages/success/index.js',
    dashboard: 'pages/dashboard/index.js',
    verify: 'pages/verify/index.js'
  },
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../src')
  },
  resolve:{
    alias: {
      sass: path.resolve(__dirname, '../src/sass/'),
      reusable: path.resolve(__dirname, '../src/reusable/')
    },
    modules: ['node_modules', path.resolve(__dirname, '../src')]
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../src'),
    watchContentBase: true,
    hot: true,
    port: 3001
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: ['babel-loader', {
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-formatter-pretty')
          }
        }]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            config: {
              ctx: {
                env: process.env.NODE_ENV
              }
            }
          }
        }, 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: true
            }
          }
        ]
      },
      {
       test: /\.html$/i,
       loader: 'html-loader',
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: '../src/pages/home/index.html',
      template: '../src/pages/home/home.html',
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      filename: '../src/pages/signin/index.html',
      template: '../src/pages/signin/signin.html',
      chunks: ['signin']
    }),
    new HtmlWebpackPlugin({
      filename: '../src/pages/success/index.html',
      template: '../src/pages/success/success.html',
      chunks: ['success']
    }),
    new HtmlWebpackPlugin({
      filename: '../src/pages/dashboard/index.html',
      template: '../src/pages/dashboard/dashboard.html',
      chunks: ['dashboard']
    }),
    new HtmlWebpackPlugin({
      filename: '../src/pages/verify/index.html',
      template: '../src/pages/verify/verify.html',
      chunks: ['verify']
    })
  ]
}
