const express = require("express");
const app = express();

let blogs = []

app.use(express.json())

app.get("/", (req, res) => {
    res.send(blogs)
})

app.get("/:id", (req, res) => {
    const { id } = req.params;
    const blog = blogs.find((blog) => blog.id === id)
    res.send(blog)
})

app.listen(3000, () => {
    console.log("server is listening on localhost:3000");
});