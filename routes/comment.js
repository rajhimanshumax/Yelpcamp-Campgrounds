var express=require("express");
var router=express.Router();
var Campground=require("../models/campground.js");
var Comment=require("../models/comment.js")
var middleware=require("../middleware/index.js")
router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn,function(req,res){
  Campground.findById(req.params.id,function(err,campground){
   if(err)
   {
     console.log(err);
   } 
   else
   {
     res.render("comments/new.ejs",{campground:campground})
   }
  })
})

router .post("/campgrounds/:id/comments",middleware.isLoggedIn,function(req,res){
  Campground.findById(req.params.id,function(err,campground){
    if(err)
    {
      console.log(err);
      res.redirect("/campgrounds");
    }
    else
    {
      Comment.create(req.body.comment,function(err,comment){
        if(err)
        {
          req.flash("error","Something went wrong");
          console.log(err)
        }
        else
        {  
          comment.author.id=req.user._id;
          comment.author.username=req.user.username;
          comment.save();
          //console.log(comment)
          //add username and id to comment
          //console.log(req.user.username);
          campground.comments.push(comment);
          campground.save();
         // console.log(comment);
         req.flash("success","Successfully added comment");
           res.redirect("/campgrounds/"+campground._id);
        }
      })
    }
  })
})

 //Edit route for comments
 router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
   //req.params.id
   Comment.findById(req.params.comment_id,function(err,foundComment){
     //console.log(foundComment);
     if(err)
     {
       res.redirect("back");
     }
     else
     {
      res.render("comments/edit.ejs",{campground_id:req.params.id,comment:foundComment});
     }
   })
})
//Update route for comment
router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
  Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
    if(err)
    {
      console.log(err);
      res.redirect("back");
    }
    else
    {
      console.log(updatedComment);
      res.redirect("/campgrounds/"+req.params.id); 
    }
  });
});
//DELETE ROUTE FOR COMMENT
router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
  Comment.findByIdAndRemove(req.params.comment_id,function(err,){
    if(err)
    {
      res.redirect("back");
    }
    else
    {
      req.flash("success","Comment deleted successfully");
      res.redirect("/campgrounds/"+req.params.id)
    }
  })
})
module.exports=router;