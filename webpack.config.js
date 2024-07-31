const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [new TsconfigPathsPlugin()],
    alias: {
      components: path.resolve(__dirname, "src/components/"),
      contexts: path.resolve(__dirname, "src/contexts/"),
      pages: path.resolve(__dirname, "src/pages/"),
      routes: path.resolve(__dirname, "src/routes/"),
      services: path.resolve(__dirname, "src/services/"),
      styles: path.resolve(__dirname, "src/styles/"),
      tests: path.resolve(__dirname, "src/tests/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
