const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  name: "client",
  target: "web",
  entry: "./src/client.jsx",
  output: {
    path: path.join(__dirname, "dist/public"),
    publicPath: "/static/",
    filename: "bundle.[hash:6].js"
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
        loader: "ignore-loader"
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 4096,
              name: "[name].[hash:6].[ext]",
              outputPath: "images/"
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
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new CopyWebpackPlugin([{ from: "src/assets/favicons", to: "favicons" }]),
    new ManifestPlugin(),
    new CompressionPlugin({ test: /\.js/, asset: "[path].gz" })
  ],
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      react: "preact-compat",
      "react-dom": "preact-compat"
    }
  }
};
