/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = "mongodb+srv://bhanu123:bhanu@cluster0-be3vf.mongodb.net/test?retryWrites=true&w=majority";


// Fixing deprication warnings
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

function connect() {
  return mongoose.connect(MONGO_URI, options)
    .then(() => {
      console.log('Connected to mongodb');
    })
    .catch((err) => {
      console.log('Couldnt connect to mongodb:', err.message);
      process.exit(1);
    });
}

function close() {
  return mongoose.connection.close();
}

module.exports = {
  connect,
  close,
};