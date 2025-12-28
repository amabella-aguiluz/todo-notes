import rateLimit from 'express-rate-limit';

// this limits the rate that one can use an api
// prevents the server from overloading

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: { error: "Too many requests, please try again later." },
});

export default apiLimiter;
