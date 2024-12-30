import express from "express";
import path from "node:path";
import passport from "passport";

import sessionConfig from "./middlewares/session";
import passportConfig from "./middlewares/passport";
import router from "./routes";
import errorHandler from "./middlewares/errors";

const __dirname = import.meta.dirname;
const app = express();

// EXPRESS SETUP

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// VIEWS

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// AUTHENTICATION/SESSION

app.use(sessionConfig());
app.use(passport.session());
passportConfig(passport);

// ROUTES

app.use("/", router);

// ERRORS

app.use(errorHandler);

// SERVER

app.listen(3000, () => console.log("Server running."));