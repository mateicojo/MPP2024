const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');


app.use(bodyParser.json());

var db = mysql.createConnection({
  host: "mpp.chy0oiuwuiec.eu-north-1.rds.amazonaws.com",
  port: "3306",
  user: "root",
  password: "Password1",
  database: "mpp"
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.post("/register",cors(), (req, res) => {
  const { username, password } = req.body;
  const q = "INSERT INTO users (username, password) VALUES (?, ?)";
  const values = [username, password];
  
  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});


app.options('/login', cors());
app.post("/login",cors(), (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const { username, password } = req.body;
  const q = "SELECT * FROM users WHERE username = ? and password = ?";
  
  db.query(q, [username,password], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json(err);
    }
    console.log(data.length);
    if (data.length > 0) {
      const user = data[0];
      if (password == user.password){
        return res.json({ login: true});
      }
    } else {
      return res.json({ login: false });
    }
  });
});



app.get("/food", (req, res) => {
  db.query("SELECT id AS food_id, name, calories, fat, carbs, protein FROM food;", (err, food) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json({ food: food });
  });
});


// GET a specific food by ID
app.get("/food/:id", (req, res) => {
  const foodId = req.params.id;
  const q = "SELECT id AS food_id, name, calories, fat, carbs, protein FROM food WHERE id = ?";

  db.query(q, [foodId], (err, result) => {
    if (err) {
      console.error("Error executing database query:", err);
      return res.status(500).send("Internal Server Error");
    }

    // Check if a food item with the given ID was found
    if (result.length > 0) {
      const food = result[0]; // Get the first (and presumably only) item from the result
      res.json(food);
    } else {
      res.status(404).json({ message: "Food not found" });
    }
  });
});


// POST - Add a new food
app.post("/food",cors(), (req, res) => {
  const q = "INSERT INTO food(`name`, `calories`, `fat`, `carbs`, `protein`) VALUES (?)";

  const values = [
    req.body.name,
    req.body.calories,
    req.body.fat,
    req.body.carbs,
    req.body.protein
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});



// DELETE - Delete a food by ID
app.delete("/food/:id", (req, res) => {
  const foodId = req.params.id;
  const q = " DELETE FROM food WHERE id = ? ";
  db.query(q, [foodId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/review", (req, res) => {
  db.query("SELECT id AS review_id, reviewer, content, food_id FROM review;", (err, review) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json({ review: review });
  });
});

app.post("/review",cors(), (req, res) => {
  const q = "INSERT INTO review(`reviewer`, `content`, `food_id`) VALUES (?)";
  const values = [
    req.body.reviewer,
    req.body.content,
    req.body.food_id
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(404).json({ message: "Food ID not valid" });;
    return res.json(data);
  });
});

app.delete("/review/:id", (req, res) => {
  const reviewId = req.params.id;
  const q = "DELETE FROM review WHERE id = ?";
  db.query(q, [reviewId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/review/:id", (req, res) => {
  const reviewid = req.params.id;
  const q = "UPDATE review SET `reviewer`= ?, `content`= ?, `food_id`= ? WHERE id = ?";
  const values = [
    req.body.reviewer,
    req.body.content,
    req.body.food_id,
    reviewid
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// PUT - Update a food by ID
app.put("/food/:id", (req, res) => {
  const foodid = req.params.id;
  const q = "UPDATE food SET `name`= ?, `calories`= ?, `fat`= ?, `carbs`= ?, `protein`= ? WHERE id = ?";

  const values = [
    req.body.name,
    req.body.calories,
    req.body.fat,
    req.body.carbs,
    req.body.protein,
    foodid
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/review/:id", (req, res) => {
  const reviewId = req.params.id;
  const q = "SELECT id AS review_id, reviewer, content, food_id FROM review WHERE id = ?";

  db.query(q, [reviewId], (err, result) => {
    if (err) {
      console.error("Error executing database query:", err);
      return res.status(500).send("Internal Server Error");
    }

    if (result.length > 0) {
      const review = result[0]; 
      res.json(review);
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
