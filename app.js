
//importing dotenv
require('dotenv').config();
//importing async error handler
require('express-async-errors');

const express = require('express');
const app = express();

//importing router
const mainRouter = require('./routes/main')

//importing our custom middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.static('./public'));
app.use(express.json());

//routes
app.use('/api/v1', mainRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


//port constant
const port = process.env.PORT || 3000;

//we are not using db access on this project
const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
