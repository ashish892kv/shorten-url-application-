const express = require("express");
const morgan = require("morgan");
const urls = require("./routes/urls");

const app = express();

require("./config/db")();
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true,}));
app.use(express.static("public"));

app.use("/", urls);
app.use((req, res) => {res.redirect('/')});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`running in PORT:${port}`);
});
