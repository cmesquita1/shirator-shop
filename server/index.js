const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "carlosC78!",
  database: "crudshop",
});

app.use(cors());
app.use(express.json());

app.post("/register-product", (req, res) => {
  const { name, cost, category } = req.body;

  let SQL = "INSERT INTO games(name, cost, category) VALUES(?,?,?)";
  db.query(SQL, [name, cost, category], (err, result) => {
    console.log(err);
  });
});

app.get("/getcards", (req, res) => {
  let SQL = "SELECT * FROM games";
  db.query(SQL, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.put("/edit", (req, res) => {
  const { idgames, name, cost, category } = req.body;
  let SQL =
    "UPDATE games SET name = ?, cost = ?, category = ? WHERE idgames = ?";
  db.query(SQL, [name, cost, category, idgames], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM games WHERE idgames = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => console.log("Servidor rodando na porta 3001"));
