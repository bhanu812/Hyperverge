const express = require("express");
const router = express.Router();

const {
    Create,
    update,
    checkStatus,
    getcloseTicket,
    getopenTicket,
    resetTicket,
    editDetail,
    getDetail
} = require("../controllers/TicketController");

router.post('/ticket', Create);
router.post('/ticket/:ticket_id', update);
router.put('/user/:ticket_id', editDetail);
router.get('/ticket/:ticket_id', checkStatus);
router.get('/tickets/open', getopenTicket);
router.get('/tickets/closed', getcloseTicket);
router.get('/ticket/details/:ticket_id', getDetail);
router.post('/tickets/reset', resetTicket);


module.exports = router;