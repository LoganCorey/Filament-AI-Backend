const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');

const AppError = require('./lib/appError');
const globalErrorController = require('./controllers/errorController');
const userRoutes = require('./routes/userRoute');
const tagRoutes = require('./routes/tagRoute');
const snippetRoutes = require('./routes/snippetRoute');
const annotationRoutes = require('./routes/annotationRoute');

/**
 * Saftey net
 */
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION!  Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = express();

// apply middleware
app.use(helmet());
app.use(cors('*'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// apply routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/tag', tagRoutes);
app.use('/api/v1/snippet', snippetRoutes);
app.use('/api/v1/annotation', annotationRoutes);

app.get('/api/v1/', (req, res) => res.status(200).send('ok'));
// route not found
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(globalErrorController);

module.exports = app;
