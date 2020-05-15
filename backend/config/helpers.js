module.exports = {
    sendError: (err, req, res) => {
        res.status(500).send({ error: err});
    },

    sendNotFound: (err, req, res) => {
        res.status(404).send({ error: err});
    }

};