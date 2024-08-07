const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const port = 3000;

const uri = "mongodb+srv://admin:sQbQ7UpBocNpW85I@cluster0.c1bcmhv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

let db;

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db('cafe_latte');
  } catch (err) {
    console.error('Failed to connect to the database. Error:', err);
    process.exit(1);
  }
}

app.post('/feedback', async (req, res) => {
  const { name, email, review } = req.body;

  try {
    const fb_collection = db.collection('feedback');
    await fb_collection.insertOne({ name, email, review });
    res.status(200).json({ message: 'Thank you for your feedback!' });
  } catch (error) {
    res.status(500).json({ message: 'Error occured!', error });
  }
});

app.get('/feedback', async (req, res) => {
  try {
    const fb_collection = db.collection('feedback');
    const feedbackList = await fb_collection.find({}).toArray(); // Fetch all 
    res.status(200).json(feedbackList); // returnfeedback as json
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback', error });
  }
});


app.listen(port, () => {
  console.log("Hello, I'm listening to port " + port);
  connectDB();
});
