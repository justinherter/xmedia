"use strict";
const MediaServer = require('./models/mediaServer');
const TvNode = require('./models/tvNode');

class Config {
    constructor(){
        this.medaiServer = new MediaServer({
            localIpAddress: "192.168.0.100",
            libraries: [
                { "Movies": "Movies" },
                { "Kids Movies": "KidsMovies" },
                { "Music": "Music" }
            ]
        })
        this.nodes = []

    }
    nodes(){
        var ips = [
            { ipAddress: "192.168.0.2" }
        ]
        var nodes = []
        ips.forEach((item) => {
            nodes.push(new TvNode(item))
        });
    }
}
module.exports.Config = Config;