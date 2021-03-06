var express=require("express");
const { response } = require("express");
var app=express();
var bodyparser=require("body-parser")
var mongoose=require("mongoose");
var flash=require("connect-flash");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var Campground=require("./models/campground.js");
var Comment=require("./models/comment.js");
var User=require("./models/user.js");
var seedDB=require("./seed.js");
var campgroundRoutes=require("./routes/campground.js")
var commentRoutes=require("./routes/comment.js")
var indexRoutes=require("./routes/index.js")
var methodOverride=require("method-override");

app.use(flash()); 
app.use(express.static(__dirname+"/public"))
//console.log(__dirname)
//seedDB(); //seed the database
//Passport configuration
app.use(require("express-session")({
  secret:"codeblooded",
  resave:false,
  saveUninitialized:false
}))
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
  res.locals.currentUser=req.user;
  res.locals.error=req.flash("error");  
  res.locals.success=req.flash("success");  
  next();
  });

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect("mongodb://localhost/yelp_camp_v6",{
  useNewUrlParser: true,
   useUnifiedTopology: true
});
app.use(bodyparser.urlencoded({extended:true}))
//INDEX ROUTE
app.get("/",function(req,res){
  res.render("landing.ejs");
});
app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(indexRoutes);
app.listen("3000",function(){
  console.log("The yelpcamp server has started");
})  