const Nightmare = require('nightmare')
const baseUrl = 'https://dev.raksul.com:8482'
var dataset = require('./targets.json')
var limit = 3;

dataset.some(function (pair, index) {
  var nightmare = Nightmare({ show: false });

  nightmare
    .goto(buildUrl(pair['requested']))
    .url()
    .end()
    .then(res => {
      var expected = buildUrl(pair['expected']);
      console.log('====================');
      if (res != expected) {
        console.log('Unexpected redirect.');
        console.log('Redirected to: ' + res);
        console.log('Expected URL is: ' + expected);
      } else {
        console.log("OK");
      }
    });

  if (index + 1 == limit) {
    return true;
  }
});

function buildUrl(uri) {
  return baseUrl + uri;
}