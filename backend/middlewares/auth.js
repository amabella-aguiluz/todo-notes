  import jwt from 'jsonwebtoken';

// creates a jwt token to verify a user

  export const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    // no jwt token
    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // checks if current user is correct with jwt token
      req.userId = decoded.userId;
      next();
      // if jwt token is invalid for current user
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };

  export default authMiddleware ;