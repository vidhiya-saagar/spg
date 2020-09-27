const express = require('express');
const app = express();
const port = 5000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/chhands/:id/pauris', (req, res) => {
  console.log(req.body);
  debugger;
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
