const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  mode: "production",
  performance: {
    //hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  entry: [path.resolve(__dirname, "../src/index.js")],
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "../dist"),
   // assetModuleFilename: 'static/[hash][ext][query]'
  },
  devtool: "source-map",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, "../static") }],
    }),
    new HtmlWebpackPlugin({
      filename: "./index.html", //relative to root of the application
      template: path.resolve(__dirname, "../src/index.html"),
      title: "dilllly",
      minify: true,
    }),
    new MiniCSSExtractPlugin(),
    //  new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      // HTML
      {
        test: /\.html$/,
        loader: "html-loader",
       
      },

      // JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },

      // CSS
      {
        test: /\.css$/i,
        use: [MiniCSSExtractPlugin.loader, "css-loader"],
      },

      // // Images
      {
        //test: /\.(jpg|png|gif)$/,
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset',
        generator: {
          emit: false,
        },
        use: [
          {
           loader: "file-loader",
            options: {
              outputPath: "static/textures/",
            },
          },
        ],
      },
      // Models
      {
        test: /\.(glb|fbx)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "static/models/",
            },
          },
        ],
      },

      // Fonts
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "static/",
            },
          },
        ],
      },
    ],
  },
};
