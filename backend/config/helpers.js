module.exports = {
    sendError: (err, req, res) => {
        res.status(500).send({ error: err});
    }
};