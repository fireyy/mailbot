var _config = require('../libs/config.js')
  , request = require('request')
  , qs = require('querystring')
  ;

var getBookmarks = function(page,callback) {
  var oauth = _config("readability")
    , url = 'https://www.readability.com/api/rest/v1/bookmarks?'
    , params =
      { archive: 0,
        page: page
      }
    ;
  url += qs.stringify(params);
  request.get({url:url, oauth:oauth, json:true}, function (e, r, body) {
    callback && callback(body);
  });
}

module.exports = getBookmarks;