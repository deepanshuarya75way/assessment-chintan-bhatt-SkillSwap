const userRequestCounts=new Map();

const WINDOW_MS=60*1000;
const MAX_REQUESTS=1;

const aiMatchRateLimiter=(req,res,next)=>{
  const userId=req.user._id.toString();
  const currentTime=Date.now();
  
  let userData=userRequestCounts.get(userId);

  if(!userData || currentTime-userData.startTime>=WINDOW_MS){
    userData={
      count:0,
      startTime:currentTime
    };

    if(userData.count>=MAX_REQUESTS){
      const remainingTime=Math.ceil(
        (WINDOW_MS-(currentTime-userData.startTime))/1000
      );
      return res.status(429).json({
        success:false,
        message:`Too many matchrequests. please wait${remainingTime }seconds and try again.`,
        retryAfter:remainingTime
      });

    }
    userData.count++;
    userRequestCounts.set(userId,userData);

    next();
  };
 
}
 module.exports={aiMatchRateLimiter};