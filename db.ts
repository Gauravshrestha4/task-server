const mongoose = require('mongoose')

const uri =
  'mongodb+srv://gauravshrestha04:HSgMFboYd4jQR9IU@cluster0.j0ogptz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error('Failed to connect to MongoDB', err)
    process.exit(1)
  }
}

export default connectDB
