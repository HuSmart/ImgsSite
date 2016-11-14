module.exports = {
  entry: {
    web: './src/entries/main.js'
    // test: './test/enter.js',
  },
  output: {
    // path: __dirname + '/test/build/',
    path: __dirname + '/build/',
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
  }
  // ,
  // resolve: {
  //   alias: {
  //     'vue$': 'vue/dist/vue.js'
  //   }
  // }
}
