require("dotenv").config()
const error = require('./utils/ErrorHandler');
const express = require("express");
const cors = require("cors");
const {handleError,ErrorHandler} = require('./utils/ErrorHandler')

//INITIALIZE APP
const app = express();

//DATABASE
const connectDB = require("./MongoDB");
connectDB();


//MIDDLEWARE
//parsing body data
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

//ROUTES
app.use('/api/music',require('./routes/MusicRoutes'))

//ERROR_MIDDLEWARE
app.get('*', (req, res) => {
    throw new ErrorHandler(500,'Can not reach the Url !! Internal Server error')
})
app.use((err, req, res, next) => {
    handleError(err,res)
})

// app.use("/songs", songRoute);
const PORT=process.env.PORT || 5000
app.listen(PORT,()=>console.log('server is running on',PORT))