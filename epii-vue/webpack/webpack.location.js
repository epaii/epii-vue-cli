const path = require('path')
const merger = require("webpack-merge")
const work_dir = process.cwd();
const loc_dir = path.resolve(work_dir+'/dev');
const webpack = require("webpack")
const autoRouter = require('../plugin/auto-route.js');
let config = {};
const fs = require("fs");
let config_file = path.resolve(work_dir+ "/config/config.development.js");
 
if (fs.existsSync(config_file))
    config = require(config_file);

const webpack_config_file = path.resolve(work_dir+ "/config/webpack.development.js");
let webpack_config = {};
if (fs.existsSync(webpack_config_file))
    webpack_config = require(webpack_config_file);
 
  

module.exports = merger( require(path.resolve(__dirname, "webpack.base"))(process.argv.indexOf("--mpa") > 0 ? "mpa" : "spa"), {
    mode: "development",
    devtool: "source-map",
    output: {
        path: loc_dir
    },
    plugins: [
        new autoRouter(),
        new webpack.DefinePlugin({
            'APP_CONFIG': JSON.stringify(config)
        }),
        new webpack.HotModuleReplacementPlugin() 
        // new BundleAnalyzerPlugin()
    ],
    devServer: {
       
        contentBase: loc_dir,
        overlay: true,
        stats: "errors-only",
        inline: true,
        open: true,
        hot: true,
        
        historyApiFallback: {
            index: '/index.html'
        }
    }
},webpack_config);