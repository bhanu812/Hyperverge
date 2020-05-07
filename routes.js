/* eslint-disable linebreak-style */
const router = require('express').Router();

const userRoute = require('./routes/UserRoute');
const ticketRoute = require('./routes/TicketRoute');

router.use("/api", userRoute);
router.use("/api", ticketRoute);


module.exports = router;