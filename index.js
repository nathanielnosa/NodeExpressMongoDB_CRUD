// importing express module
require('dotenv').config()
const express = require('express')
const path = require('path')
// import custom module logMessage
const { logger } = require('./middleware/logEvent')
const errorHandler = require('./middleware/errorHandle')
const verifyJWT = require('./middleware/verifyJWT')
const credentials = require('./middleware/credentials')

const corsOptions = require('./config/cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const connectDB = require('./config/dbCon')
// creating an instance
const app = express()
// creating port
const port = process.env.PORT || 1234;

const cors = require('cors');

//custom middleware
app.use(logger)

// connect db
connectDB();

app.use(credentials)
app.use(cors(corsOptions))

// built-in middleware (urlencoded data: for handling form data)
app.use(express.urlencoded({ extended: false }))

//built-in middleware for json
app.use(express.json())

app.use(cookieParser())
//built-in middleware for static files
app.use(express.static(path.join(__dirname, '/public')))

app.use('/', require('./routes/root'))
app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/auth'))
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))

app.use(verifyJWT)
app.use('/employee', require('./routes/api/employee'))
app.use('/users', require('./routes/api/users'))


app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'clients', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ error: "404 Not Found" })
  } else {
    res.type('txt').send("404 not found")
  }
})
// custom error
app.use(errorHandler)

mongoose.connection.once('open', () => {
  console.log('connected to mongodb');
  // starting the server
  app.listen(port, () => console.log(`server running on port: http://localhost:${port}`));

})

