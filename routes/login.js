module.exports = function(req, res){
  res.render('login',{"layout": false});
  // if(req.session.uid){
  //   res.redirect('/auth/readability');
  // }
}