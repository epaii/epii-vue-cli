const fs = require("fs");
const path = require("path")
module.exports = (pages, tofile, is_async) => {
    if(process.argv.indexOf("--dynamic-import")>-1){
        is_async = true;
    }

    let imports = [];
    let routes = [];
  
   
    function doMakeRouter(itemObject,parentObj){
        for (const key in itemObject) {
            let item = itemObject[key];
            if(!item.ok) continue;
            imports.push({name:item.importVarName,path:item.filePath});
            let newItem = {name:item.name,path:item.path,component:item.component};
            if(item.hasOwnProperty("children")){
                newItem.children=[];
                doMakeRouter(item.children,newItem.children);
            }
            parentObj.push( newItem);
        }
       
    }

    
    
    doMakeRouter(pages,routes);
   

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
    string += "\n let routes="+JSON.stringify(routes).replace(/\"__var__/g,"").replace(/__var__\"/g,"");
    string += "\n";
    string += "\n  export default routes \n";

    let dir_tofile = path.dirname(tofile);
    if (!fs.existsSync(dir_tofile)) {
        fs.mkdirSync(dir_tofile, { recursive: true });
    }
     
    fs.writeFileSync(tofile, string);


}