'use strict';

module.exports.Extensions = class Extensions {
    static Arrays() {
        Array.prototype.any = function(func) {
            return this.some(func || function(x) { return x });
        }
    }
    static Objects() {
        Object.prototype.x_toHttpParams = function(obj){
            let paramArray = [];
            for(prop in obj){
                returnString += paramArray.push(`${prop}=${obj[prop]}`);
            }
            return paramArray.join("&");
        }
    }
    static Strings() {
        String.prototype.x_between = function(array){
            return array[0] <= parseInt(this) && parseInt(this) <= array[1];
        }
    }
    static Integers(){
        Number.prototype.x_between = function(array){
            return (array[0] <= this && this <= array[1])
        }
    }
    static All() {
        this.Arrays();
        this.Objects();
        this.Strings();
        this.Integers();
    }
}