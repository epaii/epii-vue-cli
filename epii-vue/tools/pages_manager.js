
let build_type = require("./build_type.js");

  let m_page = null;
    if (build_type.isSpa())
        m_page = require(__dirname + "/spa/page.js");
    else {
        m_page = require(__dirname + "/mpa/pages.js");
    }

 module.exports = {
    getPages: m_page.getPages,
    onFileChange:m_page.onFileChange
}   


