const express = require("express");
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const { HttpCodes, CustomErrors } = require('../response');

async function update(req, res) {
  var response = {};
  if (req.body.passenger && req.body.status == 'closed') {
    passenger = await new User(req.body.passenger).save();
    if (!passenger) {
      return res.status(HttpCodes.INTERNAL_SERVER_ERROR).send({
        success: false, Response: [], message: "save is not successfull"
      })
    }
    response.passenger = passenger;

    var ticket = await Ticket.findOneAndUpdate({ seat_number: req.params.seat }, { $set: { "status": status, "passenger":''} }, { new: true });
    if (!ticket) {
      return res.status(HttpCodes.INTERNAL_SERVER_ERROR).send({
        success: false, Response: {}, message: "Seat with a given number not exist"
      })
    }
    response.ticket = ticket

    
  }
  if (req.body.status == 'open') {
    var status = req.body.status
    var ticket = await Ticket.findOneAndUpdate({ seat_number: req.params.seat }, { $set: { "status": status, "passenger":''} }, { new: true });
    if (!ticket) {
      return res.status(HttpCodes.INTERNAL_SERVER_ERROR).send({
        success: false, Response: {}, message: "Seat with a given number not exist"
      })
    }
    response.ticket = ticket
  }
  return res.status(HttpCodes.OK).send({
    success: false, Response: response, message: "successfull"
  })
}



// get the status of a ticket based on ticket_id
async function userDetail(req, res) {
  var ticket = await Ticket.findOne({ seat_number: req.params.seat });
  if (!ticket) {
    return res.status(HttpCodes.INTERNAL_SERVER_ERROR).send({
      success: false, Response: [], message: "Seat with a given number not exist"
    })
  }

  var user_id = ticket.passenger;
  if (String(user_id).trim.length == 0)
  return res.status(HttpCodes.BAD_REQUEST).send({
    success: false, Response: [], message: "Seat with a given number not exist"
  })
  var user = await User.findOne({ id: user_id });
  return res.status(HttpCodes.OK).send({ success: true, Response: user, message: 'fetch sucessfull' });

}

async function checkStatus(req, res) {
  var ticket = await Ticket.findOne({ seat_number: req.params.seat }, { status: 1 });
  if (!ticket) {
    return res.status(HttpCodes.INTERNAL_SERVER_ERROR).send({
      success: false, Response: [], message: "Seat with a given number not exist"
    })
  }


  res.status(HttpCodes.OK).send({ success: true, Response: ticket, message: 'fetch sucessfull' });

}

async function getDetail(req, res) {
  var ticket = await Ticket.findOne({ seat_no: req.params.seat });
  if (!ticket) {
    return res.status(HttpCodes.INTERNAL_SERVER_ERROR).send({
      success: false, Response: [], message: "Seat with a given number not exist"
    })
  }


  res.status(HttpCodes.OK).send({ success: true, Response: ticket, message: 'fetch sucessfull' });

}
// get list of all open tickets
async function getopenTicket(req, res) {
  tickets = await Ticket.find({ status: "open" });
  if (!tickets) {
    return res.status(HttpCodes.INTERNAL_SERVER_ERROR).send({
      success: false, Response: [], message: "Seat with a given number not exist"
    })
  }


  res.status(HttpCodes.OK).send({ success: true, Response: tickets, message: 'fetch sucessfull' });
}

// get list of all closed tickets
async function getcloseTicket(req, res) {
  tickets = await Ticket.find({ status: "closed" });
  if (!tickets) {
    return res.status(HttpCodes.INTERNAL_SERVER_ERROR).send({
      success: false, Response: [], message: "Seat with a given number not exist"
    })
  }


  res.status(HttpCodes.OK).send({ success: true, Response: tickets, message: 'fetch sucessfull' });
}



async function resetTicket(req, res) {
  var ticket = await Ticket.updateMany({}, { $set: { "status": "open", "passenger": '' } }, { new: true });
  if (ticket)
  return res.status(HttpCodes.OK).send({ success: true, message: "tickets reset" });

}

module.exports = {
  update,
  checkStatus,
  getopenTicket,
  getcloseTicket,
  getDetail,
  resetTicket,
  userDetail


}