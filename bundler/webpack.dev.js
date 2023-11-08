const { merge } = require("webpack-merge");
const commonConfiguration = require("./webpack.config.js");
const ip = require("fix-esm").require("internal-ip");
const portFinderSync = require("portfinder-sync");
const path = require("path");

const infoColor = (_message) => {
  return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`;
};

module.exports = merge(commonConfiguration, {
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "src"),
    },
    port: portFinderSync.getPort(8080),
    open: true,
    https: false,
    
  },
  output:{
    assetModuleFilename: "[name].[ext]"
  },
});
