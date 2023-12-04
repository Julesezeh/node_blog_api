const express = require("express");
const { v4: uuid } = require("uuid")
const IsIdPresent = require("./userIDPassedMiddleWare");
const app = express();

app.use(express.json())


let users = [
    {
        "username": "Diego",
        "firstName": "Cristiano",
        "age": 19,
        "id": "e621217d-51e8-4990-ae8b-929d52cd8a62"
    },
    {
        "username": "Pendu",
        "firstName": "CR7",
        "age": 35,
        "id": "5f65c3ed-22c0-4301-ba04-ee16fa840137"
    }
]

let blogs = [{
    "user_id": "e621217d-51e8-4990-ae8b-929d52cd8a62",
    "title": "How to get away with anything",
    "blog_id": "00068bcd-7903-420f-ba81-7a1707a2a0ce",
    "user": "e621217d-51e8-4990-ae8b-929d52cd8a62"
},
{
    "user_id": "e621217d-51e8-4990-ae8b-929d52cd8a62",
    "title": "Are the theories in rich Dad, Poor Dad a Myth?",
    "blog_id": "0b00375b-1b69-492c-aeb9-13d4f504f43e",
    "user": "e621217d-51e8-4990-ae8b-929d52cd8a62"
}
]



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

app.patch("/users/:id", IsIdPresent, (req, res) => {
    const { id } = req.params;
    const { username, firstName, age } = req.body;
    const user = users.find((user) => user.id == id)
    if (username) {
        user.username = username;
    }
    if (firstName) {
        user.firstName = firstName;
    }
    if (age) {
        user.age = age
    }
    res.send(user)
})


//BLOG ENDPOINTS
app.get("/blogs", (req, res) => {
    res.status(200).send(blogs)
})

app.get("/blogs/:blog_id", (req, res) => {
    const { blog_id } = req.params;
    const blog = blogs.find((blog) => blog.id == blog_id)
    res.status(200).send(blog)
})

app.post("/blogs", IsIdPresent, (req, res) => {
    const body = req.body;
    const blog_id = uuid();
    const { user_id } = req.body;
    const updated_body = { ...body, blog_id: blog_id, user: user_id };
    blogs.push(updated_body);
    res.status(201).send(updated_body)
    console.log(`Blog "${body.title}:${blog_id}" was created successfully`)
})


app.patch("/blogs/:blog_id", () => {
    const { blog_id } = req.params;
    const { title, description } = req.body;
    const blog = blogs.find((blog) => blog.id == blog_id)
    if (title) {
        blog.title = title;
    }
    if (description) {
        blog.description = description;
    }
    res.send(blog)
})


app.listen(3000, () => {
    console.log("server is listening on localhost:3000");
});