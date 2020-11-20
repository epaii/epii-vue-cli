module.paths.push(...module.parent.paths)
const webpack = require('webpack')
const path = require("path");
module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
				Eapp:"eapp-uni"
            })
        ]
    }
}