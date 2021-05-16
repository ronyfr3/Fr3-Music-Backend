//Error is js class ,so we extended this class
class AppError extends Error{
  constructor(message, statusCode) {
    //passing message var to super
      super(message);
    this.statusCode = statusCode;
    //if we make an error we want only custom err msg so that we make it true
    //we don't want any database error or server err(may leak sensitive info to  user) to show users
    this.isOperational = true;
    //getting err.stack to find where err comes from,pass constructer as reference 
      Error.captureStackTrace(this,this.constructor);
  }
}

//getting message from this function
//err handle for development
const handleErrorForDev = (err, res) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message,
        stack:err.stack
    })
}
//handle err for production
const handleErrorForProd = (err, res) => {
  const statusCode = err.statusCode || 500;
  if (err.isOperational) {
    //if we made err we show this msg
    res.status(statusCode).json({
        success: false,
        message: err.message
    })
  }else{
    //if database or server err we will only show this msg
    //because this will may not trusted error
    //it can reveal sensitive info to user thats why we need simple msg to show user
    res.status(statusCode).json({
        success: false,
        message: "something went wrong!"
    })
    }
}
const handleError = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'dev') {
    handleErrorForDev(err, res);
  } else {
    handleErrorForProd(err, res);
  }
}
module.exports = {
  AppError,
  handleError
};