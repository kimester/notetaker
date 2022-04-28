const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;
const taker = require('./db/db.json');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//routes

app.get("/notes",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/notes.html"))
})

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/index.html"))
})

app.get("/db/db",(req,res)=>{
    res.json(taker)
})

app.listen(PORT,()=>{
    console.log("listinging to port"+ PORT)
})

