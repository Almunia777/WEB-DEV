var express = require("express");
var ejs= require("ejs");
var bodyParser= require("body-parser");
var app= express();

app.set("view engine", "ejs");
app.use('/static',express.static('views/asset'))
app.use(bodyParser.urlencoded({extended :'true'}));

var campground= [
    {name: "Salmon Creek", image: "static/salmon.jpg"},
    {name: "Granite Hill", image: "static/granite.jpg"},
    {name: "Paradise Hill", image: "static/paradise.jpg"}
];

app.get("/", (req, res) =>{
    res.render("landing");
});

app.get("/campgrounds", (req, res) =>{
    
    res.render("campgrounds", {campgrounds: campground});
});

app.get("/campgrounds/new", (req, res) =>{
    res.render("new");
});

app.post("/campgrounds", (req, res) =>{
    var name= req.body.name;
    var image= req.body.image;
    var newCamp= {name: name, image: image};
    campground.push(newCamp);
    res.redirect("/campgrounds");
});

app.listen(3000, () =>{
    console.log("The app is running at  PORT:3000");
})