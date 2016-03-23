var path = require('path');

var PATHS = {
  dist: path.resolve(__dirname + '/' + 'dist'),
  src: path.resolve(__dirname)
};

module.exports = {
  entry: {
    app: PATHS.src
  },

  output: {
    path: PATHS.dist,
    filename: "dist.js"
  },

  devtool: 'eval',

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react']
        }
      },
      {
        test: /\.scss$/,
        loader: [
          'style',
          'css?sourceMap',
          'sass?sourceMap'
        ]
      }
    ]
  },

  sassLoader: {
    includePaths: [path.resolve(__dirname, "./src/scss")]
  }
};
