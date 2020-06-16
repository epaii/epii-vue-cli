const work_dir = process.cwd();
const fs = require("fs")

module.exports = {
    boot: (content) => {
        let onbuid_file = work_dir.replace(/\\/g,"/") + "/hooks/boot.js";
        let replace = [];
        if (fs.existsSync(onbuid_file)) {
            replace.push(`\n const on_boot = require("${onbuid_file}")`)
            replace.push(` if( typeof on_boot.default =="function" ) `)
            replace.push(` await on_boot.default(); \n`)
           
        }
       return content.replace("\"inject_other\"",replace.join("\n"));

    }
}

