import express, { urlencoded } from "express"
import {v4 as uuidv4} from "uuid"

const app = express();
const port = 3000;

app.use(express.static("public"))
app.set(express.urlencoded({extended:true}))
app.set("view engine", "ejs")
app.use(express.json());


let data = [];

app.get("/",(req,res)=>{
    res.render("index",{data:data})
})

app.post("/newNotes",(req,res)=>{
    let newData = {create:req.body.text ||"Typing Here...",id:uuidv4()
    }
    data.push(newData)
    res.redirect("/")
})

// Route PUT untuk memperbarui catatan
app.put("/newNotes/:id", (req, res) => {
    const noteId = req.params.id;
    const updatedContent = req.body.content;

    // Cari catatan berdasarkan ID
    const note = data.find(n => n.id === noteId);
    if (note) {
        note.content = updatedContent; // Perbarui konten catatan
        res.json({ success: true, note });
    } else {
        res.status(404).json({ success: false, message: "Note not found." });
    }
});




app.listen(port,()=>{
    console.log(`Server running at port ${port}`)
})