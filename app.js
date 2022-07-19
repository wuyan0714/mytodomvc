const express = require("express");
const app = express();
const todoRouter = require("./routers/todoRouter");

app.use('/',express.static(__dirname + '/public'));

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", todoRouter);

app.use((err, req, res, next) => {
  res.json({ msg: "Something Wrong", err });
});

app.listen(8080, () => console.log("Server run on http://localhost:8080/"));
