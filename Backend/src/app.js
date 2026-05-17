/*
server ko create karna
*/
const express=require("express")
const notesmodel=require('./models/note.model')
 const path= require("path")

const app=express()
const cors=require("cors")


app.use(express.json())
app.use(cors())
app.use(express.static("./public"))

/**
 * - post api / notes
 * - create new notes and save in mongodb
 * - req.body ={title,description}
 * 2
 */

app.post('/api/notes', async (req, res) => {

  try {

    const {
      title,
      description,
      done,
      starred,
      category,
      tags,
      dueDate
    } = req.body;

    const note = await notesmodel.create({
      title,
      description,
      done,
      starred,
      category,
      tags,
      dueDate
    });

    res.status(201).json(note);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });
  }
});
/**
 * - get /api/notes
 * - featch all the data form the database and send the response
 */
app.get("/api/notes",async(req,res)=>{
    const notes =await notesmodel.find()

    res.status(200).json(notes)
})

/**
 * -delete the api/notes:id
 * - delete note with the id from req.params 
 */
app.delete("/api/notes/:id",async(req,res)=>{
    const id=req.params.id 
    await notesmodel.findByIdAndDelete(id);
   res.status(200).json({ success: true });
})

/**
 * - patch api/notes:id
 * - update the description of the note by id
 * - req.body={description}
 */

app.patch("/api/notes/:id", async (req, res) => {
    const id = req.params.id;

    const updated = await notesmodel.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    );

    res.status(200).json(updated);
});
console.log(path.join(__dirname))
app.use('*name',(req,res)=>{
  res.sendFile(path.join(__dirname,"..","/public/index.html"))
})

module.exports=app;