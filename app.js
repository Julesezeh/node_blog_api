const express = require("express");
const { v4: uuid } = require("uuid")
const app = express();

app.use(express.json())


let users = [
    {
        "username": "Diego",
        "firstName": "Cristiano",
        "age": 19
    }
]

let blogs = [{
    "user_id": "e621217d-51e8-4990-ae8b-929d52cd8a62",
    "title": "How to get away with murder",
    "blog_id": "00068bcd-7903-420f-ba81-7a1707a2a0ce",
    "user": "e621217d-51e8-4990-ae8b-929d52cd8a62"
}]



//USERS' ENDPOINTS
app.get("/users", (req, res) => {
    res.status(200).send(users)
})

app.get("/users/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((user) => user.id === id)
    res.status(200).send(user)
})

app.post("/users", (req, res) => {
    const id = uuid();
    const body = req.body;
    const updated_body = { ...body, id: id }
    blogs.push(updated_body);
    res.status(200).send(updated_body)
    console.log(`User "${body.username}:${id}" has been successfully created.`)
})


//BLOG ENDPOINTS
app.get("/blogs", (req, res) => {
    res.status(200).send(blogs)
})

app.get("/blogs/:blog_id", () => {
    const { blog_id } = req.params;
    const blog = blogs.find((blog) => blog.id == blog_id)
    res.status(200).send(blog)
})

app.post("/blogs", (req, res) => {
    const body = req.body;
    const blog_id = uuid();
    const { user_id } = req.body;
    const updated_body = { ...body, blog_id: blog_id, user: user_id };
    blogs.push(updated_body);
    res.status(201).send(updated_body)
    console.log(`Blog "${body.title}:${blog_id}" was created successfully`)
})



app.listen(3000, () => {
    console.log("server is listening on localhost:3000");
});