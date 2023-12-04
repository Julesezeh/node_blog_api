function IsIdPresent(req, res, next) {
    const { id } = req.params
    console.log("from le middleware")
    console.log(id)
    if (id.length < 12) {
        console.log("Please enter a valid ID")
        res.status(400).send("<h1>Invalid ID</h1>")
    }
    next();
}

module.exports = IsIdPresent;
