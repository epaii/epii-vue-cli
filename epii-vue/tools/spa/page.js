const work_dir = process.cwd();
const vue_tpl_dir = __dirname + "/vue";
const HtmlWebpackPlugin = require("html-webpack-plugin")
const page_list = require("../page_list");
const create_router = require("../create_router");
const inject = require("../inject.js")
const fs = require("fs");
let getEntries = () => {
    let entries = {};
    let htmls = [];

    let page = "index";
    let html_file = vue_tpl_dir + "/index.html";
    if(fs.existsSync(work_dir+"/hooks/index.html")){
        html_file = work_dir+"/hooks/index.html";
    }else  if(fs.existsSync(work_dir+"/hooks/template.html")){
        html_file = work_dir+"/hooks/template.html";
    }
    let loadingHtml = "加载中";
    if(fs.existsSync(work_dir+"/hooks/loading.html")){
        loadingHtml =  fs.readFileSync(work_dir+"/hooks/loading.html");
    }

    entries[page] = vue_tpl_dir + `/index.js`
    htmls.push(new HtmlWebpackPlugin({
        template: html_file,
        filename: page + ".html",
        chunks: [page],
        loadingContent:loadingHtml
    }));

    return {
        entries: entries,
        htmlPlugins: htmls
    }

}

page_list.watch((_pages) => {
    create_router(_pages, work_dir + "/runtime/spa_router.js")
})
create_router(page_list.getPages(), work_dir + "/runtime/spa_router.js")




module.exports = {
    getPages: getEntries,
    onFileChange: page_list.watch
}
