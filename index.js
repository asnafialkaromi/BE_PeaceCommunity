const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { createServer } = require("http");
const routes = require("./routes");
const fileUpload = require("express-fileupload");
const cookiesSession = require("cookie-session");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const server = createServer(app);

// Set CORS headers
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(
  cookiesSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(fileUpload());
app.use(routes);

server.listen(PORT, () =>
  console.log(`Server already running on port ${PORT}`)
);
