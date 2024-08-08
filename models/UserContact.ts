const mongoose2 = require('mongoose')

const { Schema: Schema2 } = mongoose2

const userContactSchema = new Schema2({
  streetAddress: { type: String, required: true },
  apartment: { type: String },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  zipcode: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  userEmail: {
    type: String,
    required: true,
    ref: 'User', // Reference to User model
    validate: {
      validator: async function (value: string) {
        const userExists = await User.exists({ email: value })
        return userExists !== null
      },
      message: 'User with the given email does not exist.',
    },
  },
})

// Create the model
const UserContact = mongoose2.model('UserContact', userContactSchema)

module.exports = UserContact
