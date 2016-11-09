var express = require("express")

var app = express();
var jquery = require('jquery');

app.use(express.static("public"))
app.set("view engine", "hbs")

app.listen(4000, ()=> {
  console.log("Consequences!")
})
//Geet/////////
app.get("/:name?", (req,res)=>{

var name = req.params.name || ""

    var compliments = [
      "Your instructors love you",
      "High five = ^5",
      "Is it Ruby Tuesday yet?",
      "It's almost beer o'clock",
      "The Force is strong with you"
    ]

    var colors = ["#FFBF00", "#0080FF","#01DF3A","#FF0080"]


    //determine which compliment to display
    var compliment = compliments[Math.floor((Math.random() * compliments.length - 1) + 1)];

    //determine random color
    var color = colors[Math.floor((Math.random() * colors.length - 1) + 1)]

    res.render("index",{
      compliment:compliment,
      color:color,
      name:name,
    })
})

// app.get("/:name", (req,res)=>{
//   name = req.params.name
//
// })
