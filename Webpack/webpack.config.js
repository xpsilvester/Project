const path = require('path');
const root_path = path.resolve(__dirname);
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  mode: 'production',
  entry: {  //配置多个入口文件打包成多个代码块
    price: path.resolve(root_path, 'src/js/price.js')
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(root_path, 'content/js')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(root_path, 'node_modules'),
        include: root_path
      },
      {
        test: /\.scss/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '../css/[name].min.css',
      allChunks: true
    })
  ]
}