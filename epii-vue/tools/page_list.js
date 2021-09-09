const glob = require("glob");
const path = require("path")
const fs = require("fs");
const work_dir = process.cwd();
const page_dir = path.resolve(work_dir + "/src").replace(/\\/g, "/");
let callback_list = [];
let _pages = {};



function walkSync(currentDirPath, callback) {

    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}

function endwith(string, find) {
    // console.log(string.indexOf(find))
    return string.indexOf(find) >= 0;
}


//目录格式的兼容
let getpages = (page_root) => {
  
    let pages = {};
    walkSync(page_root, function (filePath, stat) {

        page_root = page_root.replace(/\\/g, "/");
        if (!endwith(filePath, ".vue")) {
            return;
        }
        filePath = filePath.replace(/\\/g, "/");
        let page_uri = filePath.replace(page_root, "").replace(/\\/g, "/");
       // console.log(page_uri);
        let path_split = page_uri.split("/");
        let l = path_split.length;
        var obj = pages;
        for (let i = 0; i < l; i++) {

            let tmp_0 = path_split[i];
            if (tmp_0.length == 0) {
                continue;
            }
            if (endwith(tmp_0, "-children")) {
                //console.log(obj)
                let tmp_1 = tmp_0.replace("-children", "");
                if (!obj.hasOwnProperty(tmp_1)) {
                    obj[tmp_1] = { children: {}, name: tmp_1, ok: false };
                } else {
                    if (!obj[tmp_1].hasOwnProperty("children")) {
                        obj[tmp_1].children = {};
                    }
                }
                obj = obj[tmp_1].children;
            } else if (endwith(tmp_0, ".vue")) {
                let tmp_1 = tmp_0.replace(".vue", "");
                if (!obj.hasOwnProperty(tmp_1)) {
                    obj[tmp_1] = {};
                }
                obj[tmp_1].name = tmp_1;
                obj[tmp_1].ok = true;
                obj[tmp_1].path = page_uri.replace(/-children/g,".html").replace(".vue",".html")
                let importname = page_uri.replace(/-children/g,"_children").replace(".vue","").replace(/\//g,"__");
                obj[tmp_1].component = "__var__"+importname+"__var__";
                obj[tmp_1].filePath =  filePath;
                obj[tmp_1].importVarName =  importname;
            } else {
                continue;
            }
        }

    });
   // console.log(JSON.stringify(pages).replace(/\"__var__/g,"").replace(/__var__\"/g,""));
   return pages;
}

let reg_string = page_dir + "/pages";
_pages = getpages(reg_string);


setInterval(() => {
    let pages_tmp = getpages(reg_string);
    if (JSON.stringify(pages_tmp)!= JSON.stringify(_pages)) {
        _pages = pages_tmp;
        callback_list.forEach(fun => fun(_pages));
    }
}, 2000);

module.exports = {
    watch(callback) {
        if (callback) {
            callback_list.push(callback);
        }
    },
    getPages() {
        return _pages;
    }
};