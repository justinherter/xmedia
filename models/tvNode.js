"use strict";
class TvNode{
    constructor(obj){
        this.ipAddress = obj.ipAddress || "";
        this.rootDirectory = obj.rootDirectory || "/";
        this.mediaDirectory = obj.mediaDirectory || "";
        this.rootUserName = obj.rootUserName || "root";
        this.sshPort = obj.sshPort || "2222";
        this.hasShowBox = obj.hasShowBox || true;
        this.showBox = {
            mediaDirectory: "/storage/self/primary/show_box/"
        }
    }
}
module.exports.TvNode = TvNode;
