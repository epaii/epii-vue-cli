const path = require('path')
const merger = require("webpack-merge")
const work_dir = process.cwd();
let config = {};
const fs = require("fs");
const config_file = path.resolve(work_dir+ "/config/config.production.js");
if (fs.existsSync(config_file))
    config = require(config_file);

const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const webpack = require("webpack")
const webpack_config_file = path.resolve(work_dir+"/config/webpack.production.js");
let webpack_config = {};
if (fs.existsSync(webpack_config_file))
    webpack_config = require(webpack_config_file);

module.exports = merger(require(path.resolve(__dirname, "webpack.base"))(process.argv.indexOf("--mpa") > 0 ? "mpa" : "spa"), {

    mode: "production",

    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["images", "*.js", "*.LICENSE", ".html"]
        }),
        new webpack.DefinePlugin({
            'APP_CONFIG': JSON.stringify(config)
        })

    ]
},webpack_config);