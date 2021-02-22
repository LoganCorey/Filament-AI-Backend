const express = require('express');
const annotationController = require('../controllers/annotationController');
const authController = require('../controllers/authController');

const router = express.Router();

// all annotation routes are protected and require a user to be signed in to access


router
  .route('/')
  .get(authController.protect, annotationController.getAll)
  .post(authController.protect, annotationController.insert);

router
  .route('/:id')
  .get(authController.protect, annotationController.getById)
  .patch(authController.protect, annotationController.patchById)
  .delete(authController.protect, annotationController.deleteById);

router
  .route('/getbysnippetid/:id')
  .get(authController.protect, annotationController.getAnnotationsBySnippetId);

module.exports = router;
