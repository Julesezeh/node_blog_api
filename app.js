const express = require("express");
const { v4: uuid } = require("uuid")
const app = express();

app.use(express.json())


let users = []

let blogs = []



//USERS' ENDPOINTS
app.get("/users", (req, res) => {
    res.send(users)
})

app.get("/users/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((user) => user.id === id)
    res.send(user)
})

app.post("/users", (req, res) => {
    const id = uuid();
    const body = req.body;
    const updated_body = { ...body, id: id }
    blogs.push(updated_body);
    res.send(users)
})


//BLOG ENDPOINTS

app.listen(3000, () => {
    console.log("server is listening on localhost:3000");
});