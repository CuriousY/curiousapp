var express = require("express"),
bodyParser  = require("body-parser"),
mongoose    = require("mongoose"),
app         = express();


// APP/ Mongoose configs

mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

var blogSchema = mongoose.Schema({
   title : String,
   image : String,
   body : String,
   created : {
                type : Date, 
                default : Date.now()
            }
});

// Mongoose MODEL
var Blog = mongoose.model("Blog",blogSchema);

// Blog.create({
    
//     title : "First blog",
//     image : "https://cdn.pixabay.com/photo/2014/09/20/13/52/board-453758_960_720.jpg",
//     body : "well this is first blog so not so much to say."
// })


app.get("/",function(req,res){
   res.render("index"); 
});

//RESTFul Routes
app.get("/blogs",function(req,res){
    Blog.find({},function(err,blogs){
       if(err){
           console.log("error fetching data");
       }
       else
       {
            res.render("index", {blogs:blogs});         
       }
        
    });
   
});


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Movie app has started : listening to " + process.env.PORT);  
})