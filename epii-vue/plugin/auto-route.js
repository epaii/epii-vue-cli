let pagesManger = require("../tools/pages_manager.js");
let base = require("../webpack/webpack.base");
module.exports = class Plugin {
    apply(compiler) {
         console.log("remake route")
        // page_check.watch(function(){
        //     console.log("remake route")
        //     console.log(compiler)
        //     //compiler.options.entry = base.getPages().entries;
        // });
        compiler.hooks.done.tap("autorouter",function(compilation){
             console.log("remake routessss")
           // pagesManger.onFileChange();
            
        });
        
    }
};