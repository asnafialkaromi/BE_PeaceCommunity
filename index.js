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
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    proxy: true,
    name: "SessionId",
    cookie: {
      secure: true,
      httpOnly: false,
      sameSite: "none",
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
