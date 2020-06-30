let page_check = require("../tools/page_list.js");
let base = require("../webpack/webpack.base");
module.exports = class Plugin {
    apply(compiler) {
        page_check.watch(function(){
            console.log("remake route")
            compiler.options.entry = base.getPages().entries;
        });
        compiler.hooks.done.tap("autorouter",function(compilation){
           
             page_check.check();
            
        });
        
    }
};