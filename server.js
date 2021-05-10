require("dotenv").config()
const express = require("express");
const cors = require("cors");

//INITIALIZE APP
const app = express();

//DATABASE
const connectDB = require("./MongoDB");
connectDB();


//MIDDLEWARE
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

//ROUTES
app.use('/api/music',require('./routes/MusicRoutes'))

// app.use("/songs", songRoute);
const PORT=process.env.PORT || 5000
app.listen(PORT,()=>console.log('server is running on',PORT))