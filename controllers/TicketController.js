const express = require("express")
const Ticket = require("../models/Ticket")
const User = require("../models/User")

async function update(req, res) {
  var response={};
  if(req.body.passenger){
    let passenger = req.body.passenger;
    passenger = await User.findOneAndUpdate({id:passenger.id},{$set:passenger},{new:true}); 
    var passenger_id = passenger.id;
    response.passenger =passenger;
  }
  if(req.body.status){
    var passenger_id = req.body.passenger_id;
    var status = req.body.status;
    if(status === 'open'){
    var passenger_id = '';
    }
    var ticket = await Ticket.findOneAndUpdate({ seat_number: req.params.seat },{$set:{"status":status,"passenger":passenger_id} }, { new: true });
    response.ticket = ticket
  }
  res.send(response);
}



// get the status of a ticket based on ticket_id
async function userDetail(req, res) {
  var ticket = await Ticket.findOne({ seat_number: req.params.seat});
  var user_id = ticket.passenger;
  if(String(user_id).trim.length == 0)
  return res.send("no passenger for the ticket");
  var user = await User.findOne({id:user_id});
  return res.send(user);
  
}

async function checkStatus(req, res) {
  var ticket = await Ticket.findOne({ seat_number: req.params.seat},{status:1});
  res.send(ticket);
  
}

async function getDetail(req, res) {
  var ticket = await Ticket.findOne({ seat_no: req.params.seat});
  res.send(ticket);
  
}
// get list of all open tickets
async function getopenTicket(req, res) {
  tickets = await Ticket.find({status: "open"});
  res.send(tickets)
}

// get list of all closed tickets
async function getcloseTicket(req, res) {
  tickets = await Ticket.find({status: "closed"});
  res.send(tickets)
}



async function resetTicket(req, res) {
  var ticket = await Ticket.updateMany({},{$set:{"status":"open","passenger":''}},{ new: true });
  if(ticket)
  return res.send('tickets reset')
  
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