var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
for (var i = 233; i < 236; i++) {
  url = 'http://sonlite.dnr.state.la.us/sundown/cart_prod/cart_con_wellinfo2?p_wsn=' + i;

    request(url, function(error, response, html) {
      if (!error) {
        var $ = cheerio.load(html);
        //  console.log($)
        var json = {};
        var arrayWells = [];
        //console.log(arrayWells)
        json.serialNum = $('table td').eq(2).text();

        json.wellNum = $('table td').eq(0).text();

        json.wellName = $('table td').eq(1).text();

        json.orgId = $('table td').eq(3).text();

        arrayWells.push(json)
        console.log(arrayWells)
  }})};

  // fs.writeFile('output.json', JSON.stringify(arrayWells, null, 4), function(err){
  //
  // })

app.listen('9001');
console.log("the magic happens on port 9001")

exports = module.exports = app;
