const express = require("express");
const fs= require('fs');
const path = require("path");
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

//  POST API/NOTES (write to file?)
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
    //push the newly created note intoexisting notes
    newNotes.push(newNote);
    const stringNotes = JSON.stringify(newNotes, null, 4);
    fs.writeFileSync(`./db/db.json`, stringNotes);
    console.log(`New note ${newNote.id} has been written in JSON file`);
    res.json(`New note ${newNote.id} has been written in JSON file`);
  } else {
    throw err;
  }
});

//listener for app
app.listen(PORT, () => {
  console.log("listinging to port" + PORT);
});
