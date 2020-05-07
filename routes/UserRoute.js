const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")

const { signup, signin, signout } = require("../controllers/UserController")
const { userSignupValidator } = require("../validator")

router.post("/signup", userSignupValidator, signup)
router.post("/signin", signin)

module.exports = router
