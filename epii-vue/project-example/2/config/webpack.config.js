const webpack = require("webpack");
module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      Eapp: "eapp-h5-plus-vue",
    }),
  ],
};
