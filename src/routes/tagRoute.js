const express = require('express');
const tagController = require('../controllers/tagController');
const authController = require('../controllers/authController');
const AppError = require('../lib/appError');

const router = express.Router();

// all tag routes are protected and require a user to be signed in to access

router
  .route('/')
  .get(authController.protect, tagController.getAll)
  .post(authController.protect, tagController.insert);

router
  .route('/:id')
  .get(authController.protect, tagController.getById)
  .patch(authController.protect, tagController.patchById)
  .delete(authController.protect, tagController.deleteById);

  router.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl}`, 404));
  });

module.exports = router;
