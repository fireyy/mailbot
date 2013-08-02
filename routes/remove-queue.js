/*
 * 移除出队列
 */
var Firebase = require('firebase')
  , _config = require('../libs/config.js')
  ;
module.exports = function(req, res){
  var data = req.params.id;
   if(data){
    var setQueueData = new Firebase(_config("firebase").cave+"queue/"+data);
    setQueueData.remove(function(error) {
      if (error) {
        res.json({
          stat: 'error',
          msg: 'Data could not be removed.' + error
        });
      } else {
        res.json({
          stat: 'ok',
          msg: '移除成功'
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