var mongoose=require("mongoose");
var Campground=require("./models/campground.js");
var Comment=require("./models/comment.js");
//Remove all campgrounds
var data=[
  {
  name:"Cloud's rest",
  image:"https://images.unsplash.com/photo-1556942154-006c061d4561?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  description:"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."
  },
  {
    name:"Cloud's motion",
    image:"https://images.unsplash.com/photo-1483381719261-6620dfa2d28a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description:"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."
  },
  {
    name:"Night outs",
    image:"https://images.unsplash.com/photo-1500332988905-1bf2a5733f63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description:"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."
  }
]
function seedDB()
{
  Campground.remove({},function(err){
   /* if(err)
    {
      console.log(err);
    }
    console.log("Campgrounds removed");
   data.forEach(function(seed){
      Campground.create(seed,function(err,data){
        if(err)
        {
          console.log(err);
        }
        else
        {
          console.log("added campground");
          Comment.create(
          {
             text:"this place is quite awesome and beautiful",
             author:"Himanshu kumar"
          },function(err,comment){
            if(err)
            {
              console.log(err)
            }
            else
            {
              data.comments.push(comment)
              data.save();
              console.log("created comment");
            }
          });
        }
      })
    });*/
  });
}
module.exports=seedDB;
//Add few campgrounds
 //Add a few comments
