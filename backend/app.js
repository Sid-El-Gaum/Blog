const express = require('express');
const connectToDB = require('./config/connectToDb');
const { erroHandler, notFound } = require('./middlewares/error');
const cors = require('cors');
require('dotenv').config();


// CONNECT TO DB
connectToDB();


// Init App
const  app = express();

// Middlewares
app.use(express.json());

//Cors
app.use(cors({
    origin:"htto://localhos:3000"
}))

// Routes
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/users', require('./routes/usersRoute'));
app.use('/api/posts', require('./routes/postRoute'));
app.use('/api/comments', require('./routes/commentRoute'));
app.use('/api/categories', require('./routes/categoriesRoute'));

// Error Handler Middleware
app.use(notFound);
app.use(erroHandler);

// Running Server
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})  