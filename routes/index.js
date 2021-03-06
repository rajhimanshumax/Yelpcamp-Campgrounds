var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user");
//Register form
router.get("/register",function(req,res){
  res.render("register.ejs");
}) 
//handle signup logic
router.post("/register",function(req,res){
  var newUser=new User({username:req.body.username});
  User.register(newUser,req.body.password,function(err,user){
    if(err)
    {
     req.flash("error",err.message );
     console.log(err);
     return res.render("register.ejs");
    }
    passport.authenticate("local")(req,res,function(){
      req.flash("success","Welcome to Yelpcamp"+user.username)
        res.redirect("/campgrounds");
    });
  });
});
//============
//Login routes
//============
router.get("/login",function(req,res){
res.render("login.ejs");
});
router.post("/login",passport.authenticate("local",{
  successRedirect:"/campgrounds",
  failureRedirect:"/login"
}),function(req,res){
})
//=============
//logout routes
//=============
router.get("/logout",function(req,res){
  req.logout();
  req.flash("success","logged you out!");
  res.redirect("/campgrounds");
})
module.exports=router;
