const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const MiniCssPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle-[fullhash].js",
    clean: true,
  },
  plugins: [
    new HtmlPlugin({
      template: "./src/index.html",
    }),
    new MiniCssPlugin({
      filename: "[name]-[fullhash].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/emoticons', to: 'emoticons' }
      ],
    }),
  ],
  devServer: {
    port: 5556,
    static: {
      directory: path.join(__dirname, "build"),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssPlugin.loader, "css-loader"],
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    edge: "17",
                    firefox: "60",
                    chrome: "67",
                    safari: "11.1",
                  },
                },
              ],
              ["@babel/preset-react"],
            ],
          },
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
        test: /\.js$/,
    })],
  },
};
