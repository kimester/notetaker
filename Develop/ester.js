const express = require("express");
const fs= require('fs');
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = 3000;
const taker = require("./db/db.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
//routes

//GETs NOTES
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});
//GETS INDEX
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/db/db", (req, res) => {
  res.json(taker);
});

// GET API/notes (reads db.json)
app.get("/api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync(`./db/db.json`));
  res.json(notes);
   
   
});

//  write to file POST API/NOTES 
app.post("/api/notes", (req, res) => {
  const newNotes = JSON.parse(fs.readFileSync(`./db/db.json`));
  // If the new note has a title and a text then it will be created and given a unique ID.
  const { title, text } = req.body;
  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    //push newly created note intoexisting notes
    newNotes.push(newNote);
    const stringNotes = JSON.stringify(newNotes, null, 4);
    fs.writeFileSync(`./db/db.json`, stringNotes);
    console.log(`New note ${newNote.id} has been written in JSON file`);
    res.json(`New note ${newNote.id} has been written in JSON file`);
  } else {
    throw err;
  }
});

app.delete('/api/notes/:id',(req,res)=>{
  const api = JSON.parse(fs.readFileSync(`./db/db.json`)) 
  fs.writeFileSync(`./db/db.json`,JSON.stringify(api.filter(filterNote=>{filterNote.id!==req.params.id}),null,4));
  res.json(`Note has been deleted`);
})

app.get('*',(req,res)=>
  res.sendFile(path.join(__dirname,'./public/index.html'))
);

//listener for app
app.listen(PORT, () => {
  console.log("listinging to port" + PORT);
});
