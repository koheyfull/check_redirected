const Nightmare = require('nightmare')
const vo = require('vo')
const baseUrl = 'https://dev.raksul.com:8482'

var dataset = [
  {
    requested: '/speed/express-shipping/flyer/',
    expected: '/flyer/a4/'
  },
  {
    requested: '/speed/shop-pickup/document/vertical-right-top-bind_30page_4c0c_aoyama/',
    expected: '/document/a4/'
  },
]
 
dataset.forEach(function (pair) {
  vo(run(buildUrl(pair['requested']), buildUrl(pair['expected'])))(function(err, result) {
    if (err) throw err;
  });
});
console.log("complete!");

function *run(requestUrl, expectedUrl) {
  var nightmare = Nightmare();
  var redirected = yield nightmare
    .goto(requestUrl)
    .url();

  if (expectedUrl != redirected) {
    console.log('====================');
    console.log('Unexpected redirect.');
    console.log('Redirected to: ' + redirected);
    console.log('Expected URL is: ' + expectedUrl);
  }

  yield nightmare.end();
}

function buildUrl(uri) {
  return baseUrl + uri;
}