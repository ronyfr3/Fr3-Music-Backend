require("dotenv").config()
const express = require("express");
const cors = require("cors");
const {handleError,AppError} = require('./Error/ErrorClass')

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

//ERROR_HANDLE_MIDDLEWARE
app.all('*', (req, res, next) => {
    //this approach work with async fn
    // const err = new AppError(`requested URL ${req.path} not found`, 404)
    // this next(err) passing err obj to handleError fn to get specific messgaes
    // next(err)
    // or
    //other way express automatically call errHandler
    //this approach not work with async function,it needs explicitly call the next() middleware
    throw new AppError(`requested URL ${req.path} not found`, 404)
   
})
app.use(handleError)

// app.use("/songs", songRoute);
const PORT=process.env.PORT || 5000
app.listen(PORT,()=>console.log('server is running on',PORT))