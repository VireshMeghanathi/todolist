const express = require('express');
const BodyParser = require('body-parser');

const app = express();
app.use(BodyParser.urlencoded({ extended: true })); 
app.use(express.static('public')); 
app.set("view engine", "ejs");

let items = ["Buy food","Cook food","eat Fooid"];

app.get("/",function(req,res){
    let today = new Date();
    // let currentday = today.getDay();
    // day ="";

    let options = {
        weekday: "long",
        day : "numeric",
        month : "long"
    }

    let day = today.toLocaleDateString("en-US",options);

    res.render("list",{kindofday:day , newlistitems: items} );  

});
app.post("/",function(req,res){
       let item = req.body.todo;
        items.push(item);
        res.redirect('/');
})


app.listen(3000,function(){
    console.log("app is running on 3000");
});