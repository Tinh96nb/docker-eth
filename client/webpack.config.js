const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

const basePath = path.resolve(__dirname);
console.log(basePath);

const dir = {
  app: `${basePath}/src`,
  public: `${basePath}/public`,
  build: `${basePath}/dist`,
}

module.exports = {
  entry: `${dir.app}/index.js`,
  output: {
    filename: "app.js?v=[hash]",
    path: dir.build
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /node_modules/,
        use: [{
          loader: "file-loader",
          options: {}
        }]
      }
    ]
  },
  devtool: "source-map",
  // fix router refresh not get path
  devServer: {
    historyApiFallback: true
  },
  node: {
    fs: "empty"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${dir.public}/index.html`
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.DefinePlugin({
      API_ADDRESS: JSON.stringify('http://localhost:3003')
    })
  ],
  resolve: {
    modules: [dir.app, dir.public, "node_modules"],
    extensions: [".js", ".jsx", ".json", "png", "jpg", "svg", ".css"]
  }
};