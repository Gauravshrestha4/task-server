// import { Request, Response, NextFunction } from 'express' // Import the User model

// import jwt from 'jsonwebtoken'

// const JWT_SECRET = 'your_jwt_secret' // Use the same secret key as in token generation

// export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization

//   if (!authHeader) {
//     return res.status(401).json({ error: 'Token is required' })
//   }

//   const token = authHeader.split(' ')[1] // Assuming "Bearer <token>"

//   if (!token) {
//     return res.status(401).json({ error: 'Token is required' })
//   }

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ error: 'Invalid or expired token' })
//     }

//     req.user = user // Attach user info to request
//     next()
//     return;
//   })
//   return ;
// }
