const fs = require("fs");
const path = require("path")
module.exports = (pages, tofile, is_async) => {
    if(process.argv.indexOf("--dynamic-import")>-1){
        is_async = true;
    }

    let is_warp = (pages.name && pages.path) ? true : false;
    if (is_warp) pages = [pages];
    let imports = [];
    let routes = [];
    let _route_index = -1;
    for (let index in pages) {
        let item = pages[index];

        imports.push({ name: item.var_name, path: item.path });
        let haschilds = item.hasOwnProperty("childrens");
        if (haschilds) {
            for (let index_c in item["childrens"]) {
                let sub_item = item["childrens"][index_c];

                imports.push({ name: `${item.var_name}_childrens_${sub_item.name}`, path: sub_item.path });
            }
        }
        if (is_warp)
            routes.push(`routes.push({path:"/",component:${item.var_name}})`)
        else
            routes.push(`routes.push({path:"${item.name}.html",name:"${item.name}.html",component:${item.var_name}})`)

        _route_index++;
        if (haschilds) {
            routes.push(`routes[${_route_index}].children=[]`);
            for (let index_c in item["childrens"]) {
                let sub_item = item["childrens"][index_c];
                if (is_warp)
                    routes.push(`routes[${_route_index}].children.push({path:"/children/${index_c}",component:${item.var_name}_childrens_${sub_item.name}})`)
                else
                    routes.push(`routes[${_route_index}].children.push({path:"children/${index_c}",component:${item.var_name}_childrens_${sub_item.name}})`)
            }
        }


        for (let index_c in item["components"]) {
            let sub_item = item["components"][index_c];
            imports.push({ name: `${item.var_name}_components_${sub_item.name}`, path: sub_item.path });
            if (is_warp)
                routes.push(`routes.push({path:"/${index_c}",component:${item.var_name}_components_${sub_item.name}})`)
            else
                routes.push(`routes.push({path:"${item.name}.html/${index_c}",component:${item.var_name}_components_${sub_item.name}})`)

            _route_index++;
        }
    }

    let string = "";
    let imports_line = [];
    imports.forEach(import_item => {
        if (!is_async)
            imports_line.push(`import ${import_item.name} from  "${import_item.path}" `);
        else {
            imports_line.push(`const ${import_item.name}  = () => import("${import_item.path}") `);
        }
    });
    string += imports_line.join("\n");
    string += "\n let routes=[] \n";
    string += routes.join("\n");
    string += "\n  export default routes \n";
    let dir_tofile = path.dirname(tofile);
    if (!fs.existsSync(dir_tofile)) {
        fs.mkdirSync(dir_tofile, { recursive: true });
    }
    fs.writeFileSync(tofile, string);


}