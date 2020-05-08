/* eslint-disable linebreak-style */
const router = require('express').Router();

const userRoute = require('./routes/UserRoute');
const ticketRoute = require('./routes/TicketRoute');

router.use("/v1/api/user", userRoute);
router.use("/v1/api/ticket", ticketRoute);


module.exports = router;