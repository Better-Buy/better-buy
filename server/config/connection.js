//creating a mongoose connection. 
const mongoose = require('mongoose');

//we can alter this to our own mongodb.
/*
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mernshopping', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});
*/
const URI = process.env.MONGODB_URL;
//lifted the mernshopping mongodb for 
mongoose.connect(URI || 'mongodb://localhost/mernshopping', {

useNewUrlParser: true, 

useUnifiedTopology: true 

}, err => {
if(err) throw err;
console.log('Connected to MongoDB!!!')
});

module.exports = mongoose.connection;
