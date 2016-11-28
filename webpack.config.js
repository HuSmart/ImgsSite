module.exports = {
  entry: {
    web: './src/entries/main.js',
    init: './src/entries/init.js',
    admin: './src/entries/admin-main.js'
  },
  output: {
    // path: __dirname + '/test/build/',
    path: __dirname + '/build/',
    publicPath: '/dev/',
    filename: '[name]-build.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue'
        // },
        // {
        //   test: /\.json$/,
        //   loader: 'json'
      }
    ]
  },
  babel: {
    presets: ['es2015']
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  }

}
