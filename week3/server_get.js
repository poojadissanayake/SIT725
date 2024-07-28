const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static('public'));

const addTwoNumber = (n1, n2) => {
  return n1 + n2;
};

const subtractNumbers = (n1, n2) => n1 - n2;

app.get("/addTwoNumber", (req, res) => {
  const n1 = parseInt(req.query.n1);
  const n2 = parseInt(req.query.n2);
  const result = addTwoNumber(n1, n2);
  res.json({ statusCode: 200, data: result });
});

app.post("/subtractNumbers", (req, res) => {
  const n1 = parseInt(req.query.n1);
  const n2 = parseInt(req.query.n2);
  const result = subtractNumbers(n1, n2);
  res.json({ statusCode: 200, data: result });
});

app.post('/addNumbers', (req, res) => {
  const { num1, num2 } = req.body;
  const total = num1 + num2;
  res.json({ total: total });
});

app.get("/Display", (req, res) => {
  const n1 = "<html><body><H1>HELLO THERE </H1></body></html>";
  res.set('Content-Type', 'text/html');
  res.send(Buffer.from(n1));
});

console.log(addTwoNumber(19, 12));
const port = 3040;
app.listen(port, () => {
  console.log("Hello, I'm listening to port " + port);
});
