function IsBlogIDPresent(req, res, next) {
    const { blog_id } = req.params;
    console.log("from le middleware")
    console.log(blog_id)
    if (blog_id.length < 12) {
        console.log("Please enter a valid ID")
        res.status(400).send("<h1>Invalid blog ID</h1>")

    }
    next();

}

module.exports = IsBlogIDPresent;