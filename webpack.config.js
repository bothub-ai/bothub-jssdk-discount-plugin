const path = require('path')
const webpack = require('webpack')

const config = {
  entry: {
    app: path.resolve(__dirname, './src/app.js')
  },
  output: {
    path: path.resolve(__dirname, './dist/'),
    publicPath: '/dist/',
    filename: 'discount.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {}
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        loader: ['style-loader', 'css-loader', 'less-loader'],
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    })
  ],
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      app: path.resolve(__dirname, 'app'),
      views: path.resolve(__dirname, 'views'),
      routes: path.resolve(__dirname, 'routes'),
      vue$: 'vue/dist/vue.common.js'
    },
  },
  devtool: '#eval-source-map',
  devServer: {
    historyApiFallback: {
      index: 'index.html',
    },
    index: 'index.html',
    noInfo: true,
    contentBase: '.',
    host: '0.0.0.0',
    port: 80,
    disableHostCheck: true
  }
}

if (process.env.NODE_ENV === 'production') {
  process.noDeprecation = true
  config.devtool = false
  config.resolve.alias.vue$ = 'vue/dist/vue.runtime.esm.js'
  config.plugins = (config.plugins || []).concat([
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
  ])
}

module.exports = config
