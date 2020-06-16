const fs = require("fs");
const path = require("path")
module.exports = (pages,tofile,mpa = false)=>{
    let is_warp = (pages.name && pages.path)?true:false;
    if(is_warp) pages=[pages];
    let imports = [];
    let routes = [];
    for(let index in pages){
        let item = pages[index];
       
        imports.push(`import ${item.var_name} from '${item.path}'`)
        if(is_warp)
        routes.push(`routes.push({path:"/",component:${item.var_name}})`)
        else 
        routes.push(`routes.push({path:"${item.name}.html",component:${item.var_name}})`)

        for(let index_c in item["components"]){
            let sub_item = item["components"][index_c];
            imports.push(`import ${item.var_name}_components_${sub_item.name} from '${sub_item.path}'`)
            if(is_warp)
            routes.push(`routes.push({path:"/${index_c}",component:${item.var_name}_components_${sub_item.name}})`)
            else 
            routes.push(`routes.push({path:"${item.name}.html/${index_c}",component:${item.var_name}_components_${sub_item.name}})`)
        }
    }

    let string = "";
    string += imports.join("\n");
    string += "\n let routes=[] \n";
    string += routes.join("\n");
    string += "\n  export default routes \n";
    let dir_tofile = path.dirname(tofile);
    if (!fs.existsSync(dir_tofile)) {
        fs.mkdirSync(dir_tofile, { recursive: true });
    }
    fs.writeFileSync(tofile,string);
     

}