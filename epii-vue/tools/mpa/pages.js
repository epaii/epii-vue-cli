const glob = require("glob");
const fs = require("fs");
const path = require("path")
const work_dir = process.cwd();
let  page_dir = path.resolve(work_dir + "/src");
const runtime_pages = work_dir + "/runtime/pages";
const vue_tpl_dir = __dirname + "/vue";
const vue_tpl_dir_spa = __dirname + "/../spa/vue";
const HtmlWebpackPlugin = require("html-webpack-plugin")
const page_list = require("../page_list");
const create_route = require("../create_router");
const inject = require("../inject.js")

if (!fs.existsSync(runtime_pages)) {
    fs.mkdirSync(runtime_pages, { recursive: true });
}


let getEntries = () => {
    let entries = {};
    let htmls = [];
 
    let create_one_page = (item) => {
        
        let page = item.name;
        let page_dir_runtime = runtime_pages+page+"/"  ;
        if (!fs.existsSync(page_dir_runtime)) {
            fs.mkdirSync(page_dir_runtime,{recursive: true});
        }
      
        let entr_name =  page;
        
        if(Object.keys(item.components).length > 0){
            entries[entr_name] = page_dir_runtime+'index.js'
            fs.writeFileSync(page_dir_runtime +"index.js", inject.boot(fs.readFileSync(vue_tpl_dir_spa + "/index.js").toString()));
            fs.writeFileSync(page_dir_runtime +"router.js", fs.readFileSync(vue_tpl_dir_spa + "/router.js").toString().replace("@project/runtime/","./").replace("@page/index/index.vue",path.resolve(item.pages_path  + `/${item.page_name}/${item.page_name}.vue`).replace(/\\/g,"/")));
            fs.writeFileSync(page_dir_runtime +"root.vue", fs.readFileSync(vue_tpl_dir_spa + "/root.vue").toString());
            htmls.push(new HtmlWebpackPlugin({
                template: vue_tpl_dir_spa + "/index.html",
                filename: "."+page + ".html",
                chunks: [entr_name]
            }));
            create_route(item,page_dir_runtime + `spa_router.js`,true)
        }else{
            fs.writeFileSync(page_dir_runtime + "/index.js", inject.boot( fs.readFileSync(vue_tpl_dir + "/root.js").toString().replace("root_path", path.resolve(item.pages_path + `/${item.page_name}/${item.page_name}.vue`).replace(/\\/g,"/"))));
            htmls.push(new HtmlWebpackPlugin({
                template: vue_tpl_dir + "/index.html",
                filename: "."+ page+ ".html",
                chunks: [entr_name]
            }));
            entries[entr_name] = page_dir_runtime+'index.js'
        }
        if(Object.keys(item.pages).length > 0){
            for(let index_tt in item.pages){
                let item_tt = item.pages[index_tt];
                create_one_page(item_tt) 
            }
        }
      
  
    
    }


    for(let index in page_list){
        let item = page_list[index];
        create_one_page(item,"",page_dir) 
    }



    return {
        entries: entries,
        htmlPlugins: htmls
    }

}
 
module.exports = {
    getPages: getEntries

}
