let buildType = process.argv.indexOf("--mpa") > 0 ? "mpa" : "spa"

module.exports = {
    getBuildType:function () {
        return buildType;
    },
    isSpa:function(){
        return buildType === "spa";
    },
     isMpa:function(){
        return buildType === "mpa";
    }
}