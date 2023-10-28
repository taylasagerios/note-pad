const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the tips
notes.get('/', (req, res) => {
    console.log("api get route")
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
notes.post('/', (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

notes.delete('/notes', (req,res) => {
  const found = notes.findIndex( i => parseInt(req.params.id) === i.id ? i :'') 
  console.log(found)
  if (found >= 0){
   notes.splice( found,1)
   res.json({
     success:false,
     error: "We cant delete this post"
   })
  }
})



module.exports = notes;