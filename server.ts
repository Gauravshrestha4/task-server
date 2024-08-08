import app from './app'
import connectDB from './db'
const bcrypt = require('bcrypt')
const { generateToken, verifyToken } = require('./jwt')
const { body, validationResult } = require('express-validator')
const PORT = 3000
const User = require('./models/User') // Import the User model
const UserContact = require('./models/UserContact') // Import the User model
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
require('dotenv').config()
connectDB()
// const saltRounds = 10

app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log('hashed password: ' + hashedPassword) // Log hashed password (remove in production)

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
    })

    // Save the user to the database
    await newUser.save()

    // Respond with success
    return res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error' })
  }
})

app.post('/api/login', [body('email').isEmail(), body('password').notEmpty()], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = generateToken(user._id)

    res.status(200).json({ token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]
  console.log('toke----', token)
  if (!token) return res.status(401).json({ error: 'Access denied' })

  try {
    console.log('verify token')
    const user = verifyToken(token)
    console.log('user', user)
    req.user = user
    next()
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired token' })
  }
}

app.put(
  '/api/user/update',
  [
    authenticateToken,
    body('firstName').optional().isString(),
    body('lastName').optional().isString(),
    body('dob').optional().isISO8601().toDate(),
    body('email').optional().isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { firstName, lastName, dob, email } = req.body

    try {
      const userId = req.user.id

      // Find the user and update fields
      const user = await User.findByIdAndUpdate(
        userId,
        { firstName, lastName, dob, email },
        { new: true, runValidators: true },
      )

      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      res.status(200).json({ message: 'User updated successfully', user })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Server error' })
    }
  },
)

app.get('/api/fetch', authenticateToken, async (req, res) => {
  const email = req.query.email as string

  if (!email) {
    return res.status(400).json({ message: 'Email parameter is required' })
  }

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    res.status(500).json({ message: 'Internal server error' })
  }

  return null
})

app.put('/api/user-contact/:userEmail', async (req, res) => {
  const userEmail = req.params.userEmail
  const updateData = req.body

  try {
    const updatedContact = await UserContact.findOneAndUpdate(
      { userEmail }, // Query condition to find the document
      updateData, // Update data
      {
        new: true, // Return the updated document
        upsert: true, // Create a new document if one does not exist
        runValidators: true, // Run schema validation on update
      },
    )

    if (!updatedContact) {
      return res.status(404).json({ message: 'UserContact not found' })
    }

    res.status(200).json(updatedContact)
  } catch (error) {
    console.error('Error updating user contact:', error)
    res.status(500).json({ message: 'Internal server error' })
  }

  return null
})
app.get('/api/protected', authenticateToken, (req, res) => {
  res.send('This is a protected route')
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log('Express server listening on port ' + PORT)
})
