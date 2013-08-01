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
  data = req.body;
  if(data){
    setQueueData.child(data.id).set(data, function(error) {
      if (error) {
        res.json({
          stat: 'error',
          msg: 'Data could not be saved.' + error
        });
      } else {
        res.json({
          stat: 'ok',
          msg: '已添加到队列'
        });
      }
    });
  }else{
    res.json({
      stat: 'error',
      msg: '参数错误'
    });
  }
};