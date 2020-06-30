 const work_dir = process.cwd();
const vue_tpl_dir = __dirname + "/vue";
const HtmlWebpackPlugin = require("html-webpack-plugin")
const page_list = require("../page_list");
const create_router = require("../create_router");
const inject = require("../inject.js")
let getEntries = () => {
    let entries = {};
    let htmls = [];

    let page = "index";
    
    entries[page] = vue_tpl_dir + `/index.js`
    htmls.push(new HtmlWebpackPlugin({
        template: vue_tpl_dir + "/index.html",
        filename: page + ".html",
        chunks: [page]
    }));
    let pages_list_tmp = page_list.getPages();
   
     create_router(pages_list_tmp,work_dir+"/runtime/spa_router.js")
  
    
    return {
        entries: entries,
        htmlPlugins: htmls
    }

}
 
module.exports = {
    getPages: getEntries

}
