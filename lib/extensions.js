'use strict';

module.exports.Extensions = class Extensions {
    static Arrays() {
        Array.prototype.any = function(func) {
            return this.some(func || function(x) { return x });
        }
    }
    static Objects() {
        Object.prototype.toHttpParams = function(obj){
            let paramArray = [];
            for(prop in obj){
                returnString += paramArray.push(`${prop}=${obj[prop]}`);
            }
            return paramArray.join("&");
        } 
    }
    
    static All() {
        Arrays();
        Objects();
    }
}