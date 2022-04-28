const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;
const taker = require('./db/db.json');

//routes

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./index.html"))
})

app.get("/db/db",(req,res)=>{
    res.json(taker)
})

app.listen(PORT,()=>{
    console.log("listinging to port"+ PORT)
})