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

// const deleteNote = (req,res) => {
//     notes.deleteOne({ _id: req.params._id })
//         .then((result) => {
//             res.json({ result: result });
//         })
//         .catch((error) => {
//             res.status(400).json({ ...error, message: error.message });
//         });
// };



module.exports = notes;