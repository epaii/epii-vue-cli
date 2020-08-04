const path = require('path')
const fs = require('fs')
const htmlWebpackPlugin = require("html-webpack-plugin")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const work_dir = process.cwd();
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const deldir = require("../tools/deldir.js");
const merger = require("webpack-merge")
deldir(work_dir + "/runtime");

const webpack_config_file = path.resolve(work_dir + "/config/webpack.config.js");
let webpack_config = {};
if (fs.existsSync(webpack_config_file))
    webpack_config = require(webpack_config_file);


let getConfig = (app_page_type) => {
    let m_page = null
    if (app_page_type === "spa")
        m_page = require(__dirname + "/../tools/spa/page.js");
    else {
        m_page = require(__dirname + "/../tools/mpa/pages.js");
    }
    getConfig.getPages = m_page.getPages;
    const pages = m_page.getPages();
    return merger({

        entry: pages.entries,
        output: {
            filename: "js[name].[hash:8].js",
            publicPath: '/',
            path: path.resolve(work_dir + '/dist/' + app_page_type),

        },
        module: {
            rules: [{
                test: /\.js$/,
                exclude: path.resolve(__dirname, "../node_modules/"),
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                use: ['vue-loader'],
                exclude: "/node_modules/"
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                // 打包图片
                test: /\.(jpg|png|gif)$/,
                use: {
                    // loader: 'file-loader',
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        outputPath: 'images/',
                        limit: 1,
                        esModule: false,
                    },
                },
            },
            { // 处理字体
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'font/',
                    },
                },

            },{
                test: /\.svg/,
                use: ['file-loader']
            }

            ]
        },
        plugins: [
            new VueLoaderPlugin(),
            ...pages.htmlPlugins
        ],
        resolveLoader: {
            modules: [path.resolve(__dirname, '../../node_modules'), path.resolve(work_dir + '/node_modules')]
        },
        resolve: {
            modules: [path.resolve(work_dir + '/node_modules'), path.resolve(__dirname, '../../node_modules')],
            extensions: ['.vue', ".js", ".ts"],
            alias: {
                'vue$': path.resolve(__dirname, '../../node_modules/vue/dist/vue.js'),
                '@page': path.resolve(work_dir + '/src/pages'),
                '@project': path.resolve(work_dir)

            }
        }
    }, webpack_config);

}

module.exports = getConfig;
