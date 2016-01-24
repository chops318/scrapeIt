var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var async = require('async')
var app     = express();

var wellAray = [];


var q = async.queue(function(task, done) {
  request(task.url, function(err, res, html) {
    if (err) return done(err);
    var $ = cheerio.load(html);
    var json = {};
    if ($('table td').eq(2).text() === "") return;

    json.serialNum = $('table td').eq(2).text();
    json.wellNum = $('table td').eq(0).text();
    json.wellName = $('table td').eq(1).text();
    json.orgId = $('table td').eq(3).text();
    wellAray.push(json);
    console.log(wellAray)
    done();

    fs.writeFile('output.json', JSON.stringify(wellAray, null, 4), function(err) {

    })
  })
}, 5)



for (var i = 233; i < 243; i++){
  q.push({url: 'http://sonlite.dnr.state.la.us/sundown/cart_prod/cart_con_wellinfo2?p_wsn=' + i})
}


app.get('/scrape', function() {

})

app.listen('9001');
