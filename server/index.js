const express = require ('express');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
const db = require('./models');

//Routers

const postRouter = require('./routes/Posts');
const { json } = require('sequelize');
app.use("/posts", postRouter);

const commentsRouter = require('./routes/Comments');
//const { json } = require('sequelize');
app.use("/comments", commentsRouter);

const usersRouter = require('./routes/Users');
//const { json } = require('sequelize');
app.use("/auth", usersRouter);


db.sequelize.sync().then(() => {
app.listen(1620, () => {
    console.log("Serving running on port 1620")
});
});

