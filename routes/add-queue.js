/*
 * 添加队列
 */
var Firebase = require('firebase')
  , _config = require('../libs/config.js')
  ;
module.exports = function(req, res){
  var setQueueData = new Firebase(_config("firebase").cave+"queue")
    , data = null
    ;
  data = req.params.bid;
  setQueueData.update(data, function(error) {
    if (error) {
      alert('Data could not be saved.' + error);
    } else {
      alert('Data saved successfully.');
    }
  });

  res.redirect('/login');
};