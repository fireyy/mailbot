/*
 * 添加订阅
 */
var Firebase = require('firebase')
  , _config = require('../libs/config.js')
  ;
module.exports = function(req, res){
  var setUserData = new Firebase(_config("firebase").cave+"users")
    , data = null
    , errors = []
    ;
  data = req.body;
  if(!data) errors.push("参数错误");
  if(data.user == "") errors.push("请输入用户名");
  var emailregx = /^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$/;
  if(data.email == "" || !emailregx.test(data.email)) errors.push("请输入有效的邮箱");
  if(errors.length == 0){
    setUserData.child(data.user).set(data, function(error) {
      if (error) {
        res.json({
          stat: 'error',
          msg: 'Data could not be saved.' + error
        });
      } else {
        res.json({
          stat: 'ok',
          msg: '恭喜，你已成功订阅！'
        });
      }
    });
  }else{
    res.json({
      stat: 'error',
      msg: errors
    });
  }
};