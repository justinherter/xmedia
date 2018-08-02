require('../lib/extensions').Extensions.All();
const scanner = require('local-network-scanner');
module.exports.NetScan = class NetScan {
    static test() {
        return this.scanIP();        
    }
    static scanIP() {
        return new Promise((resolve, reject) =>  {
            try {
                scanner.scan(devices => {
                    resolve(devices);
                });
            } catch {
                reject("scan failed")
            }
        })
    }
    /// @range Tuple[int start, int end]
    static scanIPAndFilterByRange(range){
        return this.scanIP()
        .catch((err)=>{
            console.log(err);
        })
        .then((result) => {
            let filteredIps = this.filterIPByRange(result, range);
            console.log("filtered ips: ", filteredIps);
            return filteredIps;
        })
    }
    static filterIPByRange(items, range){
        console.log("items: ", items);
        return items.filter(item => {
            return (typeof item.ip != 'undefined') 
                ? item.ip.split('.')[3].x_between(range)
                : false;
        })
    }
}
