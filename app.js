const express = require("express");
const mysql = require("mysql2");
const multer = require("multer");
const bodyParser = require('body-parser');
//chatgpt used to learn about methodoverride
const methodOverride = require('method-override');

// Create an instance of express
const app = express();

// Middleware
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set up SQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sustainabilityapp",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Routes

//display all goals
app.get("/", (req, res) => {
  const sql = "SELECT * FROM goals";
  connection.query(sql, (error, results) => {
    if (error) throw error;
    res.render("index", { goals: results });
  });
});

app.get('/goal/:id', (req, res) => {
  const goalsId = req.params.id;
  const sql = "SELECT * FROM goals WHERE goalsId = ?";
  connection.query(sql, [goalsId], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.render("goal", { goal: results[0] });
    } else {
      res.status(404).send("Goal not found");
    }
  });
});

app.get("/goal", (req, res) => {
  res.render("newGoal");
});

//add goal
app.post('/goal', upload.none(), (req, res) => {
  const {goalDescription, CarbonFootprint, goalStartDate, goalEndDate, goalStatus } = req.body;
  const sql = "INSERT INTO goals (goalDescription, CarbonFootprint, goalStartDate, goalEndDate, goalStatus) VALUES (?, ?, ?, ?, ?)";
  connection.query(sql, [goalDescription, CarbonFootprint, goalStartDate, goalEndDate, goalStatus], (error, results) => {
    if (error) {
      console.error("Error adding goal:", error);
      res.status(500).send("Error adding goal");
    } else {
      res.redirect("/");
    }
  });
});

//Update goal
app.get('/goal/:id/edit', (req, res) => {
  const goalsId = req.params.id;
  const sql = "SELECT * FROM goals WHERE goalsId = ?";
  connection.query(sql, [goalsId], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.render("editGoal", { goal: results[0] });
    } else {
      res.status(404).send("Goal not found");
    }
  });
});

app.put('/goal/:id', upload.none(), (req, res) => {
  const goalsId = req.params.id;
  const {goalDescription, CarbonFootprint, goalStartDate, goalEndDate, goalStatus } = req.body;
  const sql = "UPDATE goals SET goalDescription = ?, CarbonFootprint = ?, goalStartDate = ?, goalEndDate = ?, goalStatus = ? WHERE goalsId = ?";
  connection.query(sql, [goalDescription, CarbonFootprint, goalStartDate, goalEndDate, goalStatus, goalsId], (error, results) => {
    if (error) {
      console.error("Error updating goal:", error);
      res.status(500).send("Error updating goal");
    } else {
      res.redirect("/");
    }
  });
});

//delete goal
app.get("/goal/:id/delete", (req, res) => {
  const goalsId = req.params.id;
  const sql = "DELETE FROM goals WHERE goalsId = ?"; 
  connection.query(sql, [goalsId], (error, results) => {
    if (error) {
      console.error("Error deleting goal:", error);
      res.status(500).send("Error deleting goal");
    }else {
      res.redirect("/");
    }
  });
});


// Defines the port number
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});