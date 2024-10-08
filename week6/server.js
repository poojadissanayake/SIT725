const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;

const uri = "mongodb+srv://admin:sQbQ7UpBocNpW85I@cluster0.c1bcmhv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

let db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve the index.html file on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Connect to MongoDB
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

// POST route to handle feedback submission
app.post('/feedback', async (req, res) => {
    const { name, email, review } = req.body;

    try {
        const fb_collection = db.collection('feedback');
        //check for existing feedback
        const existingFeedback = await fb_collection.findOne({ email, review });
        if (existingFeedback) {
            return res.status(400).json({ message: 'Duplicate feedback not allowed!' });
        }
        // insert a new feedback if its not a duplicate
        await fb_collection.insertOne({ name, email, review });
        res.status(200).json({ message: 'Thank you for your feedback!' });
    } catch (error) {
        res.status(500).json({ message: 'Error occurred!', error });
    }
});

// GET route to fetch all feedback
app.get('/feedback', async (req, res) => {
    try {
        const fb_collection = db.collection('feedback');
        const feedbackList = await fb_collection.find({}).toArray(); // all feedback
        res.status(200).json(feedbackList); // Return feedback as json
    } catch (error) {
        res.status(500).json({ message: 'Error fetching feedback', error });
    }
});

// start the server,then connect to the database
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    connectDB();
});
