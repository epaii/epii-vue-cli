const path = require('path')
const fs = require('fs')
const {
    VueLoaderPlugin
} = require('vue-loader')
const work_dir = process.cwd();
const deldir = require("../tools/deldir.js");
const merger = require("webpack-merge").merge
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
deldir(work_dir + "/runtime");

const webpack_config_file = path.resolve(work_dir + "/config/webpack.config.js");
let webpack_config = {};
if (fs.existsSync(webpack_config_file))
    webpack_config = require(webpack_config_file);


const pagesManger = require("../tools/pages_manager.js").getPages();

const buildType = require("../tools/build_type.js");
let config_base_file = path.resolve(work_dir + "/config/config.base.js");
let build_config = { remUnit: 75 };
if (fs.existsSync(config_base_file)) {
    build_config = Object.assign(build_config, require(config_base_file));
}


let config = merger({
    devtool: false,
    entry: pagesManger.entries,
    output: {
        filename: "js/[name].[chunkhash:8].js",
        publicPath: '',
        path: path.resolve(work_dir + '/dist/' + buildType.getBuildType()),

    },

    module: {
        rules: [{
            test: /\.vue$/,
            use: ['vue-loader']
        },
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', {//'style-loader'
                loader: 'px2rem-loader',
                options: {
                    remUnit: build_config.remUnit,
                    remPrecision: 8
                }
            }],
        },
        {
            // 打包图片
            test: /\.(jpe?g|png|gif)$/,
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
            type: 'javascript/auto'
        },
        { // 处理字体
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: {
                loader: 'file-loader',
                options: {
                    outputPath: 'font/',
                },
            },

        }, {
            test: /\.svg/,
            use: ['file-loader']
        },
        {
            test: /\.less$/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'px2rem-loader',
                    options: {
                        remUnit: build_config.remUnit,
                        remPrecision: 8
                    }
                }, 'less-loader'
            ]
        },
        {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', {
                loader: 'px2rem-loader',
                options: {
                    remUnit: build_config.remUnit,
                    remPrecision: 8
                }
            }, 'sass-loader']
        },
        {
            test: /\.(mp3|mp4)$/,
            loader: 'url-loader',
            options: {
                name: 'audios/[name].[ext]',
                limit: 10,
                esModule: false,
            }
        }

        ]
    },
    plugins: [
        new OptimizeCssAssetsWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
            // 输出的css文件名不变的意思
        }),
        new VueLoaderPlugin(),
        ...pagesManger.htmlPlugins
    ],
    resolveLoader: {
        modules: [path.resolve(__dirname, '../../node_modules'), path.resolve(work_dir + '/node_modules')]
    },
    resolve: {
        modules: [path.resolve(work_dir + '/node_modules'), path.resolve(__dirname, '../../node_modules')],
        extensions: ['.vue', ".js", ".ts"],
        alias: {
            '@': path.resolve(work_dir),
            '@page': path.resolve(work_dir + '/src/pages'),
            '@project': path.resolve(work_dir)

        }
    }
}, webpack_config);



module.exports = config;