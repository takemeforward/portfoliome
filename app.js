const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
let name;

mongoose.connect("mongodb+srv://takemeforward:ERRORinPASSWORD30@cluster0.yi2ewuw.mongodb.net/portfolioResponse")
.then((res)=>{
    if(res){
        console.log("Connected to atlas!");
    }
}).catch(()=>{
    console.log("Something went wrong!");
});

const visiterSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Visiter = new mongoose.model("Visiter", visiterSchema);
app.get("/",(req, res)=>{
    res.render("contact");
});
// app.get("/message",(req, res)=>{
//     res.render("thankyou",{
//         name: name
//     });
// })
app.post("/",(req, res)=>{
    const newVisiter = new Visiter({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });
    newVisiter.save().then((res)=>{
        if(res){
            console.log("Response save successfully");
        }
    })
   
    res.render("thankyou",{
        name: req.body.name
    });
});
app.listen(process.env.PORT || 3000,()=>{
    console.log("server running on port 3000")
})