/*
 * users email list
 */
var Firebase = require('firebase')
  , _config = require('../libs/config.js')
  , getUsers = require('../libs/users.js')
  ;
module.exports = function(req, res){
  getUsers(function(data){
    res.render('users', { users: data.val() });
  });
};