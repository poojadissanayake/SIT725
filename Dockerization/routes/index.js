const express = require("express");
const router = express.Router();
const app = express();

const challengeRoute = require('./challengesRoute');
const userChallengeRoute = require('./userChallengeRoute');
const contactRoute = require('./contactRoute')
const userController = require("../controllers/userController");
const profileController = require('../controllers/profileController');

// Import profileRoute
const profileRoute = require('./profileRoute');


// Route for rendering the landing page using EJS
router.get("/", (req, res) => {
  res.render("index"); // render 'index.ejs' in 'views' folder
});

// About route
router.get("/about", (req, res) => {
  res.render("about");
});

// Contact route
router.get("/contact", (req, res) => {
  res.render("contact");
});

// Login routes
router.get("/login", userController.renderLogin);
router.post("/login", userController.loginUser);

// Register routes
router.get("/register", (req, res) => {
  res.render("register", { error: null }); // Pass null to avoid reference errors
});

router.post("/register", userController.registerUser);

// Forgot password routes
router.get("/forgotpassword", userController.renderForgotPassword);
router.post("/forgotpassword", userController.handleForgotPassword);
router.get('/profile', profileController.getUserProfile);

app.get("/getUserId", (req, res) => {
  if (req.session.userId) {
    console.log(req.session.userId);
    res.json({ userId: req.session.userId });
  } else {
    res.status(401).json({ message: "No logged in user" });
  }
});

router.use('/userChallenges', userChallengeRoute);

// Use challengeRoute for the '/challenges' path
router.use('/challenges', challengeRoute);

// Use profileRoute for the 'profile' path
router.use('/', profileRoute);

router.use('/contact', contactRoute);

module.exports = router;
