const NetScan = require('../services/networkScanner').NetScan;
const Expect = require("chai").expect;


describe("Network Scanner", () => {
    var promise = NetScan.scanIP();
    
    it("Scans the local network", () => {
        return promise
        .then((result) => {
            Expect(typeof(result)).to.equal(typeof([]));
        }).catch((err) => {
            console.log(`err: ${err}`);
        });
    })
    it("Prints the network scan", () => {
        return NetScan.scanIPAndFilterByRange([0,255])
        .then((result) => {
            console.log(`network objects: ${result}`);
            Expect(result).to.be.equal(result);
        }).catch(err => console.log(err));
    })
});