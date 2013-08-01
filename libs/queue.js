var Firebase = require('firebase')
  , _config = require('../libs/config.js')
  ;

var getQueue = function(callback) {
  var getQueueData = new Firebase(_config("firebase").cave+"queue")
    ;
  getQueueData.on('value', function(snapshot) {
    var datas = [];
    var obj = snapshot.val();
    if(obj != null){
      for(var z in obj){
        datas.push(obj[z]);
      }
    }
    callback && callback(datas);
  });
}

module.exports = getQueue;