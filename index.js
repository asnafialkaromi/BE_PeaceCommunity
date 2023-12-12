const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { createServer } = require("http");
const routes = require("./routes");
const fileUpload = require("express-fileupload");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
const server = createServer(app);
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: "Strict",
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(fileUpload());
app.use(routes);

server.listen(PORT, () => console.log(`Server already running`));
