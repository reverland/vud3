var path = require('path')
var webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve('./dist'),
    publicPath: '/dist/',
    library: 'vud3',
    libraryTarget: 'umd',
    filename: 'vud3.min.js'
  },
  resolve: {
    extensions: ['.js', '.json'],
    modules: [
      resolve('./src'),
      resolve('./node_modules')
    ],
    alias: {
      'src': resolve('./src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [resolve('./src'), resolve('./test')],
        enforce: 'pre',
        use: [{loader: 'eslint-loader', options: {rules: {semi: 0}}}],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('./src'), resolve('./test')]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: false
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}

if (process.env.NODE_ENV === 'test') {
  module.exports.devtool = '#inline-source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"testing"'
      }
    })
  ])
}
