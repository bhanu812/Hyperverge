const express = require("express");
const router = express.Router();
const auth=require("../middleware/auth");


const {
    update,
    checkStatus,
    getcloseTicket,
    getopenTicket,
    resetTicket,
    userDetail,
    getDetail
} = require("../controllers/TicketController");

router.put('/:seat', update);
router.get('/user/:seat', userDetail);
router.get('/status/:seat', checkStatus);
router.get('/open', getopenTicket);
router.get('/closed', getcloseTicket);
router.get('/ticket/details/:ticket_id', getDetail);
router.post('/reset',auth, resetTicket);


module.exports = router;