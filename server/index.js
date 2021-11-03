const express = require('express');
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const mongoose = require("mongoose");
const uri = 'mongodb://localhost:27017/chatroom';

mongoose
  .connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error(err));

const userRouter = require('./routes/user');
app.use('/api/v1/user', userRouter);

app.listen(5000, () => console.log("Server running on 5000"));
