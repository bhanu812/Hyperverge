const mongoose = require("mongoose")
const User = require("./User")
var timestamps = require("mongoose-timestamp")

const TicketSchema = mongoose.Schema({
  seat_number: {
    type: Number,
    min: 1,
    max: 40,
    required: true,
    unique: true
  },
  status: {
    type: String,
    default: "open",
    enum: ["open", "closed"]
  },
  passenger: {
    type: String,
    default: ""
  }
})

TicketSchema.plugin(timestamps)
module.exports = mongoose.model("Ticket", TicketSchema)