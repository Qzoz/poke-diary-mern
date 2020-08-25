require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const serverApp = express();
const LPORT = process.env.PORT || 3001;

// Custome Routes
const apiRoutes = require("./routes/apiRoutes");

// Configurations
serverApp.use(
  "/poke/diary/img",
  express.static(path.join(__dirname, "assets", "poke-img"))
);
serverApp.use(
  "/poke/diary/img/sm",
  express.static(path.join(__dirname, "assets", "poke-img-m"))
);
serverApp.use(
  "/poke/diary/type/img",
  express.static(path.join(__dirname, "assets", "poke-type-img"))
);
const staticPath = path.join(__dirname, "pokemon-diary", "build");
serverApp.use(express.static(staticPath));

serverApp.use(bodyParser.urlencoded({ extended: true }));
serverApp.use(bodyParser.json());

const db_un = process.env.DB_UN;
const db_pw = process.env.DB_PW;
const db_nm = process.env.DB_NM;
const cl_ad = process.env.CL_AD;

let db_url = `mongodb+srv://${db_un}:${db_pw}@${cl_ad}/${db_nm}?retryWrites=true&w=majority`;
if (process.env.NODE_ENV !== "production")
  db_url = "mongodb://localhost:27017/pokeDB";
mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const pokeDBconn = mongoose.connection;
pokeDBconn.on("error", () => {
  console.error("connection error:");
});
pokeDBconn.once("open", function () {
  // API Routes Used
  serverApp.use("/api", apiRoutes);
});
// Request Handling
serverApp.get("/", function (req, res) {
  res.sendFile("index.html", { root: staticPath });
});
serverApp.get("/app*", function (req, res) {
  res.sendFile("index.html", { root: staticPath });
});

serverApp.listen(LPORT, () => {
  console.log(`Server Started At Port: ${LPORT}`);
});
