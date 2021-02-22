require('dotenv').config();
const app = require('./app');

const server = app.listen(process.env.PORT || 8000, () => {
  console.log(`App running on port ${process.env.PORT || 8000}`);
});

/**
 * Saftey net 
 */
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION!  Shutting down...');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

module.exports = server;

