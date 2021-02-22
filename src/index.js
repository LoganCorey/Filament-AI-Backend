require('dotenv').config();
const app = require('./app');

const server = app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`);
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

