const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mathJs = require("mathjs");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let output;

app.get("/", function(req, res) {
  res.render("calculator", {equationResult: output});

});

app.post("/", function(req, res) {
  const insertedEquation = req.body.equation;
  try {
    const result = mathJs.evaluate(insertedEquation).toString();
    output = insertedEquation + " = " + result;
  }
  catch(ex) {
    output = "Please insert a mathematical expression."
  }
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server is running in port 3000.");
});