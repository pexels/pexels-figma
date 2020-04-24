<<<<<<< HEAD
const webpack = require("webpack");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
=======
const webpack = require('webpack');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
>>>>>>> 4e4ad2cee3db030acb0e296733d78f03a4e66249
const isCiBuild = !!process.env.CI;
let API_KEY;

if (isCiBuild) {
  API_KEY = process.env.API_KEY;
} else {
<<<<<<< HEAD
  const config = require("./secrets");
=======
  const config = require('./secrets');
>>>>>>> 4e4ad2cee3db030acb0e296733d78f03a4e66249
  process.env.API_KEY = config.API_KEY;
}

module.exports = (env, argv) => ({
<<<<<<< HEAD
  mode: argv.mode === "production" ? "production" : "development",

  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === "production" ? false : "inline-source-map",

  entry: {
    ui: "./src/ui.ts", // The entry point for your UI code
    code: "./src/code.ts", // The entry point for your plugin code
=======
  mode: argv.mode === 'production' ? 'production' : 'development',

  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === 'production' ? false : 'inline-source-map',

  entry: {
    ui: './src/app/index.tsx', // The entry point for your UI code
    code: './src/plugin/controller.ts', // The entry point for your plugin code
>>>>>>> 4e4ad2cee3db030acb0e296733d78f03a4e66249
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
<<<<<<< HEAD
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
=======
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
>>>>>>> 4e4ad2cee3db030acb0e296733d78f03a4e66249
          },
        },
      },
      // Converts TypeScript code to JavaScript
<<<<<<< HEAD
      { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },

      // Enables including CSS by doing "import './file.css'" in your TypeScript code
      {
        test: /\.css$/,
        loader: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
    ],
  },

  resolve: {
    extensions: [".wasm", ".mjs", ".js", ".json", ".ts"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"), // Compile into a folder called "dist"
=======
      {test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/},

      // Enables including CSS by doing "import './file.css'" in your TypeScript code
      {test: /\.css$/, loader: [{loader: 'style-loader'}, {loader: 'css-loader'}]},

      // Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
      {test: /\.(png|jpg|gif|webp)$/, loader: [{loader: 'url-loader'}]},

      // Convert SVG to React components
      {test: /\.svg$/, use: ['@svgr/webpack']},
    ],
  },

  // Webpack tries these extensions for you if you omit the extension like "import './file'"
  resolve: {extensions: ['.tsx', '.ts', '.jsx', '.js']},

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'), // Compile into a folder called "dist"
>>>>>>> 4e4ad2cee3db030acb0e296733d78f03a4e66249
  },

  // Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
  plugins: [
<<<<<<< HEAD
    new webpack.EnvironmentPlugin(["API_KEY"]),
    new CopyPlugin([{ from: "manifest.json", to: "manifest.json" }]),
    new HtmlWebpackPlugin({
      template: "./src/ui.html",
      filename: "ui.html",
      inlineSource: ".(js)$",
      chunks: ["ui"],
=======
    new webpack.EnvironmentPlugin(['API_KEY']),
    new CopyPlugin([{from: 'manifest.json', to: 'manifest.json'}]),
    new HtmlWebpackPlugin({
      template: './src/app/index.html',
      filename: 'ui.html',
      inlineSource: '.(js)$',
      chunks: ['ui'],
>>>>>>> 4e4ad2cee3db030acb0e296733d78f03a4e66249
    }),
    new HtmlWebpackInlineSourcePlugin(),
  ],
});
