import express from "express";
import { v4 as uuidv4 } from "uuid";
import methodOverride from "method-override";
import pool from './db.js';
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());


// Halaman utama, menampilkan catatan
app.get("/", async(req, res) => {
    try {
        const data = await pool.query("SELECT * FROM notes")
        res.render("index", { data: data.rows });
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error");
    }

});

// Menambahkan catatan baru
app.post("/add", async(req, res) => {
    try {
        const id = uuidv4()
        const content = req.body.content;
        await pool.query("INSERT INTO notes(id,content) VALUES($1,$2)",[id,content])
        console.log(req.body);
        res.redirect("/"); // Pastikan hanya satu respons yang dikirim
    } catch (error) {
        console.log(error)
        res.status(500).send("Failed to add note");

    }

});

app.put("/update/:id", async (req, res) => {
    const { content } = req.body;
    const id = req.params.id;

    if (!id || !content) {
        return res.status(400).send("Invalid input: ID or content missing.");
    }

    try {
        await pool.query("UPDATE notes SET content = $1 WHERE id = $2", [content, id]);
        res.status(200).send("Note updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to update note");
    }
});


app.delete("/delete/:id", async(req,res)=>{
    try {
        const id = req.params.id;
        await pool.query("DELETE FROM notes WHERE id=$1",[id])
        res.redirect("/");
    } catch (error) {
        console.log(error)
        res.status(500).send("Failed to delete note");
    }
})

app.get("/arsip", async(req, res) => {
    try {
        const data = await pool.query("SELECT * FROM arsip")
        res.render("arsip", { data: data.rows });
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error");
    }

});

app.post("/arsip/add", async(req, res) => {
    try {
        const {id} = req.body;
        const contentQuery = await pool.query("SELECT content FROM notes WHERE id=$1",[id])
        if(contentQuery.rows.length >0){
            const content = contentQuery.rows[0].content;
            await pool.query("INSERT INTO arsip(id,content) VALUES($1,$2)",[id,content])
            await pool.query("DELETE FROM notes WHERE id=$1",[id])
            console.log("data berhasil di kirim")
        }
        res.redirect('/');
    } catch (error) {
        console.log(error)
        res.status(500).send("Failed to add note");



    }

});

app.post("/arsip/undo", async (req,res)=>{
    try {
        const {id}= req.body;
        const contentQuery = await pool.query("SELECT content FROM arsip WHERE id=$1",[id])
        if(contentQuery.rows.length>0){
            const content = contentQuery.rows[0].content;
            await pool.query("INSERT INTO notes(id,content) VALUES($1,$2)",[id,content])
            await pool.query('DELETE FROM arsip WHERE id=$1',[id])
            console.log('Data berhasil di undo')
        }
        res.redirect("/")
    } catch (error) {
        console.error(error)
        res.status(500).send("Failed to add note");
    }
})

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
