const webpack = require('webpack');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const isCiBuild = !!process.env.CI;
let API_KEY;

if (isCiBuild) {
  API_KEY = process.env.API_KEY;
} else {
  const config = require('./secrets');
  process.env.API_KEY = config.API_KEY;
}

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',

  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === 'production' ? false : 'inline-source-map',

  entry: {
    ui: './src/app/index.tsx', // The entry point for your UI code
    code: './src/plugin/controller.ts', // The entry point for your plugin code
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // Converts TypeScript code to JavaScript
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
  },

  // Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
  plugins: [
    new webpack.EnvironmentPlugin(['API_KEY']),
    new CopyPlugin([{from: 'manifest.json', to: 'manifest.json'}]),
    new HtmlWebpackPlugin({
      template: './src/app/index.html',
      filename: 'ui.html',
      inlineSource: '.(js)$',
      chunks: ['ui'],
    }),
    new HtmlWebpackInlineSourcePlugin(),
  ],
});
