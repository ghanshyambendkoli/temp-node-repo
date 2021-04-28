const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser")
const expressValidator = require("express-validator")
const PostRoutes= require("./routes/post");
// import mongoose
const mongoose = require('mongoose');
// load env variables
const dotenv = require('dotenv');
dotenv.config()
 
//db connection
mongoose.connect(
  process.env.MONGO_URI,
  {useNewUrlParser: true},
)
.then(() => console.log('DB Connected'))
 
mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json())
app.use(expressValidator());
app.use("/",PostRoutes);


const port = 3000;
app.listen(port,()=>{
    console.log(`Api listning on port: ${port}`);
})
