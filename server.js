const express = require('express');
const { clog } = require('./middleware/clog');
const api = require('./routes/index.js');
const path = require('path');
const notes = require('./routes/notes');
const app = express();
const PORT = 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clog);
app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
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
//  const deleteNote = (id) =>
//   fetch(`/api/notes/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });

app.listen(PORT, () =>
  console.log(`Listening for requests on port ${PORT}! 🏎️`)
);