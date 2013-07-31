
/*
 * bookmarks
 */
var getBookmarks = require('../libs/bookmarks.js')
  ;
module.exports = function(req, res){
  var bookmarks = null;
  getBookmarks(function(bookmarks){
    res.render('bookmarks', { data: bookmarks });
  });
};