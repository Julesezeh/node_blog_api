const express = require("express");
const { v4: uuid } = require("uuid")
const app = express();

let blogs = []

app.use(express.json())

app.get("/users", (req, res) => {
    res.send(blogs)
})

app.get("/users/:id", (req, res) => {
    const { id } = req.params;
    const blog = blogs.find((blog) => blog.id === id)
    res.send(blog)
})

app.post("/users", (req, res) => {
    const id = uuid();
    const body = req.body;
    const updated_body = { ...body, id: id }
    blogs.push(updated_body);
    res.send(blogs)
})

app.listen(3000, () => {
    console.log("server is listening on localhost:3000");
});