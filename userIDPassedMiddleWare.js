function IsIdPresent(req, res, next) {
    if (!req.params.id) {
        console.log("Please enter a valid ID")
    }
    next();
}

module.exports = IsIdPresent;
