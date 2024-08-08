const mongoose = require('mongoose')
const { Schema } = mongoose
// const bcrypt = require('bcrypt')

const userNew1Schema = new Schema(
  {
    username: {
      type: String,
      required: false,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 5,
      maxlength: 100,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    firstName: {
      type: String,
      trim: false,
    },
    lastName: {
      type: String,
      trim: false,
    },
    dob: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
)

// userNew1Schema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10)
//   }

//   next()
// })

const User = mongoose.model('User', userNew1Schema)

module.exports = User
