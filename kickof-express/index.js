const express = require('express');
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require('cors')
const connectDB = require("./config/database");
const {AuthMiddleware} = require("./config/middleware");
dotenv.config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
    next();
});

// Database Connection
connectDB().then(r => console.log("Connected MongoDB"));

// Public Routes
require('./routes/public.route')(app)

// Protected Routes
app.use("/api*", AuthMiddleware)
require('./routes/protected.route')(app)

app.listen(port, () => {
    console.log(`Backend server is running on ${port}!`);
});