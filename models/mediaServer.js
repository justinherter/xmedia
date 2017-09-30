"use strict";
class MediaServer {
    constructor(obj){
        this.localIpAddress = obj.localIpAddress || "";
        this.globalIpAddress = obj.globalIpAddress || "";
        this.rootDirectory = obj.rootDirectory || "/";
        this.userName = obj.userName || "media";
        this.libraries = obj.libraries || [];
    }
}
module.exports.MediaServer = MediaServer;