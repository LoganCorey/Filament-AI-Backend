const express = require('express');
const snippetController = require('../controllers/snippetController');
const authController = require('../controllers/authController');
const AppError = require('../lib/appError');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, snippetController.getAll)
  .post(authController.protect, snippetController.insert);

router
  .route('/:id')
  .get(authController.protect, snippetController.getById)
  .patch(authController.protect, snippetController.patchById)
  .delete(authController.protect, snippetController.deleteById);

  router.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl}`, 404));
  });

module.exports = router;
