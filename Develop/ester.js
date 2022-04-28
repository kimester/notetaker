const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;
const taker = require('./db/db.json');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//routes

//GETs NOTES
app.get("/notes",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/notes.html"))
})
//GETS INDEX
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/index.html"))
})

app.get("/db/db",(req,res)=>{
    res.json(taker)
})

// GET API/notes (reads db.json)
app.get('/api/notes',(req,res)=>{
    const notes = JSON.parse(fs.readFileSync(`./db/db.json`))
    res.json(notes)
    });
    

        
    })








app.listen(PORT,()=>{
    console.log("listinging to port"+ PORT)
})

