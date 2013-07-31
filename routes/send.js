// 触发邮件发送
var sendMail = require('../libs/mail.js');

module.exports = function(req, res, next) {
  var bgIMG = req.body.bgIMG;
  var postTitle = req.body.postTitle;
  var sendList = req.body.sendToList;
  var objFull = doc.cache;
      var send = {
        title: postTitle,
        sub : postTitle,
        list: sendList,
        bg: bgIMG,
        cnt: objFull,
        user: doc.weibo.info,
        tpl: 'default-table',
        _id: doc._id
      }

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
}