const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRouter = require('./routers/userRouter')
const pizzaRouter = require('./routers/pizzaRouter')
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const reviewRouter = require('./routers/reviewRouter');

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;

app.use('/api/auth', userRouter);
app.use('/api/plans', pizzaRouter);
app.use('/api/reviews', reviewRouter)

app.listen(5000, console.log(`Server is listening to port ${PORT}`))
