const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const AppError = require('../lib/appError');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

// protect all routes below

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictToAdmin,
    userController.getAll
  )
  .post(
    authController.protect,
    authController.restrictToAdmin,
    userController.insert
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictToAdmin,
    userController.getById
  )
  .patch(
    authController.protect,
    authController.restrictToAdmin,
    userController.patchById
  )
  .delete(
    authController.protect,
    authController.restrictToAdmin,
    userController.deleteById
  );
  router.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl}`, 404));
  });

module.exports = router;
