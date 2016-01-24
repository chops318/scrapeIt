var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var json2xls = require('json2xls');
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
    console.log(wellArray);

    fs.writeFile('output.json', JSON.stringify(wellAray, null, 4), function(err) {

    })
    done();
  })
}, 40);


for (var i = 233; i < 633; i++){
  q.push({url: 'http://sonlite.dnr.state.la.us/sundown/cart_prod/cart_con_wellinfo2?p_wsn=' + i})
}

app.use(json2xls.middleware);


app.get('/wells', function() {
  fs.readFile('output.json', 'utf-8', function(err, data) {
    if (err) throw err;
    json = JSON.parse(data);
    console.log(json)
    wellAray = json2xls(json);
    fs.writeFileSync('data.xlsx', wellAray, 'binary')

  })
})

app.listen('9001');
