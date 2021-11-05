//creating a mongoose connection. 
const express = require("express");
const mongoose = require('mongoose');
const app = express();

//updated mongodb to fix proxy error. 
/*
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mernshopping', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});
*/

//This is our Mongo Atlas Connection: 'mongodb+srv://matt:Arsenal12@merncluster.gkugt.mongodb.net/test'

//adding a port that MongoDB can utilize. 

const PORT = process.env.PORT || 3000;

const URI = process.env.MONGODB_URL;

mongoose.connect(URI || 'mongodb://localhost/mernshopping', {
useNewUrlParser: true, 

useUnifiedTopology: true 

}, err => {
if(err) throw err;
console.log('Connected to MongoDB!!!')
});

// app.listen(PORT, () => {
//     console.log(`App running on port ${PORT}!`);
// });

module.exports = mongoose.connection;
