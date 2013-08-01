/*
 * queue
 */
var getQueue = require('../libs/queue.js')
  ;
module.exports = function(req, res){
  getQueue(function(datas){
    res.render('queue', { datas: datas });
  });
};