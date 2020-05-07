const User = require("../models/User")
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")

async function signup(req, res) {
  try {
    const user = await new User(req.body)
    console.log(req.body)

    await user.save((err, user) => {
      if (err) {
        return res.status(400).json({
          error: "Email is taken",
        })
      }
      res.status(200).json({
        user,
      })
    })
  } catch (err) {
    console.error(err.message)
  }
}

async function signin(req, res) {
  const { email, password } = req.body
  User.findOne(
    {
      email,
    },
    (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "invalid credentials",
        })
      }
      if (!user.authenticate(password)) {
        return res.status(401).json({
          error: "Email and password and does not match",
        })
      }
      const token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.JWT_SECRET
      )
      res.cookie("t", token, {
        expire: new Date() + 9999,
      })
      const { _id, name, email, role } = user
      return res.json({
        token,
        user: {
          _id,
          email,
          name,
          role,
        },
      })
    }
  )
}

// exports.requireSignin = expressJwt({
//   secret: process.env.JWT_SECRET,
//   userProperty: "auth",
// });

module.exports = {
  signin,
  signup,
}
