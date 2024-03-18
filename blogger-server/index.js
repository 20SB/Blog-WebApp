require("dotenv").config();
const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Require database configuration
const db = require("./config/mongoose");

app.use(
    session({
        secret: "your_secret_key_here",
        resave: false,
        saveUninitialized: false,
    })
);

const passport = require("passport");
const passportJWT = require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: "*",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

// Use express router for routing
app.use("/", require("./routes"));

app.listen(port, () => {
    console.log("hypesq Server runing on port: ", port);
});
