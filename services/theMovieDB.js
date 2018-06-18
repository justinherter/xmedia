'use strict';
require('../lib/extensions').Extensions.All();

const Config = {
    baseUrl: "https://api.themoviedb.org/3/",
    params:{
        api_key: "5511fa93de6dc9d5af01a824e9f3e2a0"
    }
}
const Endpoints = {
    ratingAndReleaseDates: "release_dates"
}
modules.exports.TMDB = class TMDB {
    
    static Movies = {
        _self: this,
        baseUrl: "/movie/",
        getMovieId: function(name) {
            let url = ``
        },
        search: function() {},
        getRAndR: function(id) {
            let url = `${_self.baseUrl}${id}${Endpoints.ratingAndReleaseDates}`;
            url += `?${params.toHttpParams()}`
        }
    }
    
}