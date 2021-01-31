//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static( "public"));
app.use(bodyParser.json());

let item = [];
let homeItems = ["Learn to code, get job"];
let workItems = [];

let name = "Luis";


let arrays = (arr) => {
    if (arr.legnth > 10) {
        arr.shift()
    } else {
        arr.push(item);
    }
};

let deleteBtn = () => {
    let checkbox = document.querySelector('input[type="checkbox"]');
    let clearBtn = document.querySelector('.clear');


clearBtn.addEventListener('click', function(event) {
    if (checkbox) {
        let  listItem = document.querySelector('.listItem');
        let  container = listItem.parentNode;
        container.removeChild(listItem);
      }

    });

 };

 app.get("/", function(req, res){

     let day = date.getDate()

     res.render("lists", {
         kindofDay: day,
         listsType: 'Home List',
         userName: name,
         newListItems: homeItems,
     });
 });

 app.post("/", function(req, res) {
     item = req.body.newItem;
     console.log(item);
     if (req.body.list === "Work List") {

         arrays(workItems)
         res.redirect('/work');

     } else {
         arrays(homeItems);//homeItems.push(item);
         res.redirect("/");
     }
 });

 app.get('/work', function(req, res) {

    let day = date.getDate();

    res.render('lists', {
         kindofDay: day,
         listsType: 'Work List',
         userName: name,
         newListItems: workItems,
    });
 });

 app.post('/profile', function(req, res) {
    res.send("Success");

    let item = req.body.newItem;
    workItems.push(homeItems);
    res.redirect('/work');
 });

 app.get('/about', function(req, res) {
     res.render('about');
 })


 app.listen(3001, function() {
     console.log("Server is running on port 3001");
 })