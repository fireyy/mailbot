// 触发邮件发送
var sendMail = require('../libs/mail.js')
  , getQueue = require('../libs/queue.js')
  ;

module.exports = function(req, res, next) {
  var postTitle = "前端大字报";
  getQueue(function(datas){
    var sendList = req.body.sendToList;
    var objFull = datas;
    var send = {
      title: postTitle,
      list: sendList,
      cnt: objFull,
      tpl: 'default'
    };

    sendMail(send, function(err,result){
      if (err == null) {
        res.json({
          stat: 'ok',
          msg: '邮件已成功发送'
        })
      } else {
        res.json({
          stat: 'error',
          msg: "邮件发送失败"
        })
      }
    });
  });
}