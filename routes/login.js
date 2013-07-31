module.exports = function(req, res){
  if(req.session.uid){
    res.redirect('/auth/readability');
  }
}