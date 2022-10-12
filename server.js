const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");


const app = require("./app");

// database connection
mongoose.connect(process.env.DATABASE).then(()=>{
  console.log(process.env.DATABASE);
  console.log(`Database connection is successful` .bgGreen.bold);
})


// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.green.bold);
});

