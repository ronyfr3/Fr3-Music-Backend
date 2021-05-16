//asyncHandler
module.exports= fn => {
  return (req, res, next) => {
    // fn(req,res,next).catch(err=>next(err)) or
    //async fn return promises thats why need catch block to catch err
    fn(req,res,next).catch(next)

  }
}