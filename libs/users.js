var Firebase = require('firebase')
  , _config = require('../libs/config.js')
  ;

var getUsers = function(callback) {
  var getUsersData = new Firebase(_config("firebase").cave+"users")
    ;
  getUsersData.on('value', function(snapshot) {
    callback(snapshot);
  });
}

module.exports = getUsers;