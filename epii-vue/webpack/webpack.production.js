const path = require('path')
const merger = require("webpack-merge").merge
const work_dir = process.cwd();
let config = {};
const fs = require("fs");
let config_base_file = path.resolve(work_dir + "/config/config.base.js");
const config_file = path.resolve(work_dir+ "/config/config.production.js");
if (fs.existsSync(config_file))
    config = require(config_file);

    if (fs.existsSync(config_base_file)) {
        config = Object.assign(require(config_base_file), config);
    }
    

const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const webpack = require("webpack")
const webpack_config_file = path.resolve(work_dir+"/config/webpack.production.js");
let webpack_config = {};
if (fs.existsSync(webpack_config_file))
    webpack_config = require(webpack_config_file);

module.exports = merger(require(path.resolve(__dirname, "webpack.base")), {

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