const Nightmare = require('nightmare')
var async = require('async')
const baseUrl = 'https://dev.raksul.com:8482'
var dataset = require('./targets.json')
var limit = 5;

async.eachLimit(dataset, limit, function(pair, callback) {

  var nightmare = Nightmare({ show: false });

  nightmare
    .goto(buildUrl(pair['requested']))
    .url()
    .end()
    .then(res => {
      var expected = buildUrl(pair['expected']);
      if (res != expected) {
        console.log(
          pair['requested'] + ": NG (" + "Redirected to " + res + ", but expected is " + expected + ")"
        );
      } else {
        console.log(pair['requested'] + ": OK");
      }
      callback();
    });
});

function buildUrl(uri) {
  return baseUrl + uri;
}