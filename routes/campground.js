var express=require("express");
var router=express.Router();
var Campground=require("../models/campground.js");
var middleware=require("../middleware/index.js")
router.get("/campgrounds" ,function(req,res){
  //console.log(req.user);
   Campground.find({},function(err,campgrounds){
      if(err)
      {
        console.log("An error occured");
      }
      else
      {
       res.render("campgrounds/index.ejs",{camp:campgrounds,currentUser:req.user});
      }
 
   })
 
 });
 //POST ROUTE
 router.post("/campgrounds",middleware.isLoggedIn,function(req,res){
   var name=req.body.name;
   var image=req.body.image;
   var description=req.body.description;
   var author={
     id:req.user._id,
     username:req.user.username
   }
   var newcamp={name:name,image:image,description:description,author:author};
  //  console.log(req.user);
   //console.log(newcamp);
    Campground.create(newcamp,function(err,newlycreated){
      if(err)
      {
        console.log("ERROR")
      }
      else
      {
       // console.log(newlycreated);
       res.redirect("/campgrounds");
      }
   });
 });
 //CREATE ROUTE
 router.get("/campgrounds/new",middleware.isLoggedIn,function(req,res){
   res.render("campgrounds/new.ejs");
 })
 //SHOW:shows more info about one camoground
 //SHOW ROUTE
 router.get("/campgrounds/:id",function(req,res){
   Campground.findById(req.params.id).populate("comments").exec(function(err,foundcamp)
   {
     if(err)
     {
       console.log("ERROR");
     }
     else
     {
       res.render("campgrounds/show.ejs",{campground:foundcamp});
     }
   });
 });
 //EDIT ROUTE
 router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
      if(err)
      {
        console.log(err);
        res.redirect("/campgrounds");
      }
      else
      {
       res.render("campgrounds/edit.ejs",{campground:foundCampground});
      } 
    });
 });
 //UPDATE ROUTE
 router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
  
 Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
   if(err)
   {
     res.redirect("/campgrounds");
   }
   else
   {
     res.redirect("/campgrounds/"+req.params.id);
   }
 });
 });
 //DESTROY ROUTE
 router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){

   Campground.findByIdAndRemove(req.params.id,function(err){
     if(err)
     {
       console.log(err)
       res.redirect("/campgrounds");
     }
     else
     {
       res.redirect("/campgrounds");
     }
   });
 });
 module.exports=router;