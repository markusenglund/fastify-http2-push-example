const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require("webpack-node-externals");
const autoprefixer = require("autoprefixer");

module.exports = {
  name: "server",
  target: "node",
  node: {
    __dirname: false
  },
  externals: [
    nodeExternals({
      whitelist: []
    })
  ],
  entry: "./src/server/server.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "server.js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              minimize: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [autoprefixer()]
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              emitFile: false,
              limit: 4096,
              name: "[name].[hash].[ext]",
              publicPath: "/static/images/"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                enabled: false
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin()],
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      react: "preact-compat",
      "react-dom": "preact-compat"
    }
  }
};
