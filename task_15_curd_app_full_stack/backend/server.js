const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// CREATE
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  db.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send("User Added");
    }
  );
});

// READ
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// UPDATE
app.put("/users/:id", (req, res) => {
  const { name, email } = req.body;
  const id = req.params.id;

  db.query(
    "UPDATE users SET name=?, email=? WHERE id=?",
    [name, email, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send("User Updated");
    }
  );
});

// DELETE
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM users WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("User Deleted");
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});