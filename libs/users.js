var Firebase = require('firebase')
  , _config = require('../libs/config.js')
  ;

var getUsers = function(callback) {
  var getUsersData = new Firebase(_config("firebase").cave+"users")
    ;
  getUsersData.on('value', function(snapshot) {
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

module.exports = getUsers;