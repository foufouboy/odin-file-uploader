import express from "express";
import path from "node:path";

const __dirname = import.meta.dirname;
const app = express();

// EXPRESS SETUP

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// VIEWS

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res, next) => {
    res.render("pages/home");
});

// ROUTES

// ERRORS

app.listen(3000, () => console.log("Server running."));