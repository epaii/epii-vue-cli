const glob = require("glob");
const path = require("path")
 
const work_dir = process.cwd();
const page_dir = path.resolve(work_dir + "/src").replace(/\\/g,"/");
let callback_list = [];
let getpages = (path_reg) => {

    let pages = {};
    glob.sync(path_reg).forEach(function (page_file) {




        let file_name_all = path.basename(page_file),
            page_dir_name = path.basename(path.dirname(page_file)),
            file_ext = path.extname(page_file);
        if (file_name_all === page_dir_name + file_ext) {
            page_file =page_file.replace(/\\/g,"/");
            let page_uri = page_file.replace(page_dir,"").replace(`pages/${page_dir_name}/${page_dir_name}.vue`,"");
            let enport = page_uri+page_dir_name;
            let page =   page_dir_name;
            let item = {};
            item["page_name"]=page_dir_name;
            item["name"] = enport.toLowerCase();
            item["path"] = page_file.replace(/\\/g, "/");
            item["pages_path"] = page_dir+page_uri+"pages";
            item["components"] = {};
            item["var_name"]= enport.replace(/\//g,"_epii_")
            item["pages"] = {};
 
            glob.sync(page_dir + page_uri+`pages/${page}/page-components/*.vue`).forEach(function (sub_page_file) {
                let sub_name_all = path.basename(sub_page_file).toLowerCase();
                let sub_page_name = sub_name_all.replace(".vue", "");
                let sub_item = { name: sub_page_name, path: sub_page_file.replace(/\\/g, "/") };
                item["components"][sub_page_name] = sub_item;

            });
            glob.sync(page_dir + page_uri+`pages/${page}/childrens/*.vue`).forEach(function (sub_page_file) {
                if(!item.hasOwnProperty("childrens"))
                item["childrens"]={};
                
                let sub_name_all = path.basename(sub_page_file).toLowerCase();
                let sub_page_name = sub_name_all.replace(".vue", "");
                let sub_item = { name: sub_page_name, path: sub_page_file.replace(/\\/g, "/") };
                item["childrens"][sub_page_name] = sub_item;

            });

            
           
            pages[item["name"]] = item;


        }

    });
    return pages;
}
 
let pages = getpages(page_dir + "/**/pages/*/*.vue");
 
module.exports ={
    watch(callback){
        if(callback) {
            callback(pages);
            callback_list.push(callback);
        } 
    },
    getPages(){
        return pages;
    },
    check(){
        let pages_tmp = getpages(page_dir + "/**/pages/*/*.vue");
        if(JSON.stringify(pages)!= JSON.stringify(pages_tmp)){
            pages = pages_tmp;
            callback_list.forEach(fun=>fun(pages));
        }
    }
} ;