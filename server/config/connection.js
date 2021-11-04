//creating a mongoose connection. 
const mongoose = require('mongoose');


//updated mongodb to fix proxy error. 
/*
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mernshopping', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});
*/

const URI = process.env.MONGODB_URL;

mongoose.connect(URI || 'mongodb://localhost/mernshopping', {

useNewUrlParser: true, 

useUnifiedTopology: true 

}, err => {
if(err) throw err;
console.log('Connected to MongoDB!!!')
});


module.exports = mongoose.connection;
