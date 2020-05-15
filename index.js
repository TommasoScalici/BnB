const app = require('./backend/server.js');

// Avvio del server

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});