const express = require("express")
const Ticket = require("../models/Ticket")
const User = require("../models/User")

async function Create(req, res) {
  const ticket = await Ticket.create(req.body)
  res.status(201).json({
    success: true,
    data: ticket
  })
}

//update a ticket, update open/closed and user_details
// async function update(req, res) {
//   let ticket = await Ticket.findOneAndUpdate({ seat_no: req.params.seat }, { $set: req.body }, { new: true });
//   if (!ticket) {

//   }
//   if(req.body.passenger)
// }

// edit details of a user
async function editDetail(req, res) {
  const {
    ticket_id
  } = req.params
  const payload = req.body

  Ticket.findById(ticket_id, function (err, ticket) {
    if (err)
      res.status(404).json({
        message: err,
      })
    if (ticket) {
      const user_id = ticket.passenger
      User.findById(user_id)
        .then((user) => {
          if ("name" in payload) user.name = payload.name
          if ("sex" in payload) user.sex = payload.sex
          if ("email" in payload) user.email = payload.email
          if ("phone" in payload) user.phone = payload.phone
          if ("age" in payload) user.age = payload.age
          user
            .save()
            .then((data) => res.status(202).json(data))
            .catch((err) =>
              res.status(404).json({
                message: err,
              })
            )
        })
        .catch((err) =>
          res.status(404).json({
            message: err,
          })
        )
    }
  })
}

// get the status of a ticket based on ticket_id
async function checkStatus(req, res) {
  const {
    ticket_id
  } = req.params
  Ticket.findById(ticket_id, function (err, ticket) {
    if (err)
      res.status(404).json({
        message: err,
      })
    if (ticket)
      res.status(200).json({
        status: ticket.is_booked,
      })
  })
}

// get list of all open tickets
async function getopenTicket(req, res) {
  Ticket.find({
      is_booked: false,
    },
    (err, data) => {
      if (err)
        res.status(404).json({
          message: err,
        })
      if (data) res.status(200).json(data)
    }
  )
}

// get list of all closed tickets
async function getcloseTicket(req, res) {
  Ticket.find({
      is_booked: true,
    },
    (err, data) => {
      if (err)
        res.status(404).json({
          message: err,
        })
      if (data) res.status(200).json(data)
    }
  )
}

// View person details of a ticket
async function getDetail(req, res) {
  const {
    ticket_id
  } = req.params
  Ticket.findById(ticket_id, function (err, ticket) {
    if (err)
      res.status(404).json({
        message: err,
      })
    if (ticket) {
      User.findById(ticket.passenger, function (err, user) {
        if (err)
          res.status(404).json({
            message: err,
          })
        if (user) res.status(200).json(user)
      })
    }
  })
}

async function resetTicket(req, res) {
  if (!("username" in req.body) && !("password" in req.body)) {
    res.status(400).json({
      message: "username and password is needed in request body",
    })
  }

  const {
    username,
    password
  } = req.body

  if (!bcrypt.compareSync(password, process.env.PASSWORD_HASH)) {}
  if (!(username === process.env.USER)) {
    res.status(400).json({
      message: "username is incorrect",
    })
  }

  Ticket.find({}, (err, data) => {
    if (err)
      res.status(404).json({
        message: err,
      })
    if (data) {
      data.forEach(openTicket)
      res.status(200).json({
        message: "success",
      })
    }
  })
}

module.exports = {
  Create,
  update,
  editDetail,
  checkStatus,
  getopenTicket,
  getcloseTicket,
  getDetail,
  resetTicket,
}