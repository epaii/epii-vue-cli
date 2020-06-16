const fs = require('fs');

function delDir(path,delroot = false){
    let files = [];
    if(fs.existsSync(path)){
        files = fs.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()){
                delDir(curPath,true); //递归删除文件夹
            } else {
                fs.unlinkSync(curPath); //删除文件
            }
        });
        if(delroot)
        fs.rmdirSync(path);
    }
}

module.exports = delDir; 