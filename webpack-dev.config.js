var path = require("path");
module.exports = {
  entry: {
    app: ["./src/scripts.js"]
  },
  output: {
    path: path.resolve(__dirname, "dev"),
    publicPath: "/js",
    filename: "bundle.js"
  }
};
