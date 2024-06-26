const express = require("express");
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const { name } = require("ejs");
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/todolistDB");
const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your todolist!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item."
});

const item3 = new Item({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

Item.insertMany(defaultItems);



app.get("/", function(req, res) {
const day = date.getDate();

Item.find({}, function(err, foundItems){

  if (foundItems.length === 0) {
    Item.insertMany(defaultItems, function(err){
        if (err) {
            console.log(err);
        }else{
            console.log('sucessful');
        }
    });
    res.redirect("/");
  } else {
    res.render("list", {listTitle: day, newListItems: foundItems});
  }
});
});


app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
