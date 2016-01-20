var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res) {
  url = 'http://sonlite.dnr.state.la.us/sundown/cart_prod/cart_con_wellinfo2?p_wsn=233'

      request(url, function(error, response, html) {
        if (!error) {
          var $ = cheerio.load(html);
          //  console.log($)
          var wellName;
          var json = {wellName: " "}
          wellName = $('table tbody td')[0];
          console.log(wellName);

      }})

});

app.listen('9001');
console.log("the magic happens on port 9001")

exports = module.exports = app;
