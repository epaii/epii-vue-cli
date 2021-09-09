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

    return {
        entries: entries,
        htmlPlugins: htmls
    }

}
 
page_list.watch((_pages)=>{
    create_router(_pages,work_dir+"/runtime/spa_router.js")
})
create_router(page_list.getPages(),work_dir+"/runtime/spa_router.js")




module.exports = {
    getPages: getEntries,
    onFileChange:page_list.watch
}
