
/*
 * bookmarks
 */
var getBookmarks = require('../libs/bookmarks.js')
  , paginate = require('../libs/pagination.js')
  ;
module.exports = function(req, res){
  var num = req.params.page || 1;
  getBookmarks(num, function(data){
    if(typeof data == "string"){
      res.redirect('/login');
    }else{
      var page = paginate(data.meta.item_count_total, data.meta.item_count, data.meta.page);
      res.render('bookmarks', { data: data.bookmarks, page: page });
    }
  });
};