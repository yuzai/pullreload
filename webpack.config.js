var path = require('path');
var webpack = require('webpack');

module.exports = {
  context:path.resolve(__dirname,'./src'),
  entry:{
    pullreload:'./pullreload.js'
  },
  output:{
    filename:'[name].min.js',
    path:path.resolve(__dirname,'./dist'),
    publicPath:'/',
  },
  // devtool: "cheap-eval-source-map",
  devServer:{
    contentBase:path.resolve(__dirname,'./dev'),
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        use:[{
          loader:'babel-loader',
          options:{
            presets:['es2015']
          },
        }],
        exclude:/node_modules/
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader'],
        exclude:/bootstrap.css/,
      }
    ]
  }
};
