const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mernshopping', {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://eamahma:ANvfEEWfDOirWzc9@better-buy.sw2vw.mongodb.net/myFirstDatabase?retryWrites=true', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

module.exports = mongoose.connection;

