const express = require('express');

const app = express();
const PORT = 5000;

app.get('/api/test', (request, response) => {
  response.json({result: 'string'});
});

app.listen(PORT, () => {
  console.log('Listening on port 5000....');
});