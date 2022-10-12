const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./Routes/User.Routes");
const hiringRouter = require("./Routes/HiringManger.Routes");
const candidateRouter = require("./Routes/Candidate.Routes");

//middlewares
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

app.use('/user',userRouter)
app.use('/hiring',hiringRouter)
app.use('/candidate',candidateRouter)


module.exports = app;

