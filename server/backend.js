const express = require('express');
const app = express();
const wodsPredictor = require('./helpers/wordsPredictor');

app.use(express.json());

app.get('/', (request, response) => {
  response.send('T9 backend');
});

app.post('/predict', (request, response) => {
  if (!request.body.numbers) {
    return response.status(400).send('Missing numbers!');
  }

  response.json(
    wodsPredictor(request.body.numbers, request.body.onlyRealWords)
  );
});

app.listen(8000, () => console.log('Listening on port 8000'));

module.exports = app;
