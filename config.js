"use strict";
const MediaServer = require('./models/mediaServer').MediaServer;
const TvNode = require('./models/tvNode').TvNode;

class Config {
    constructor(){
        this.medaiServer = new MediaServer({
            localIpAddress: "192.168.1.100",
            libraries: [
                { "Movies": "Movies" },
                { "Kids Movies": "KidsMovies" },
                { "Music": "Music" }
            ]
        })
    }
    nodes(){
        var nodes = [];
        var ips = [
            { ipAddress: "192.168.1.110" },
            { ipAddress: "192.168.1.111" }
        ]
        ips.forEach((item) => {
            nodes.push(new TvNode(item))
        });
        return nodes;
    }
}
module.exports.Config = Config;