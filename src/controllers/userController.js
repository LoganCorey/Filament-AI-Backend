const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const catchAsync = require('../lib/catchAync');
const AppError = require('../lib/appError');

exports.getAll = catchAsync(async (req, res, next) => {
  if (req.query.skip || req.query.limit) {
    const allUsers = await User.query().page(
      parseInt(req.query.offset, 10),
      parseInt(req.query.limit, 10)
    );
    return res
      .status(200)
      .json({ status: 'success', users: allUsers });
  }
  const users = await User.query();
  return res.status(200).json({ status: 'success', data: { users } });
});

exports.getById = catchAsync(async (req, res, next) => {
  const user = await User.query().findById(req.params.id);
  if (!user) {
    return next(new AppError(`No user found with ID ${req.params.id}`, 404));
  }
  return res.status(200).json({ status: 'success', user });
});

exports.insert = catchAsync(async (req, res, next) => {
  // cannot directly create admins, need to update
  const newUser = await User.query().insert({
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  return res.status(200).json({ status: 'success', user: newUser });
});

exports.patchById = catchAsync(async (req, res, next) => {
  // since only admins can access this route only an admin can update a users role
  const updatedUser = await User.query().updateAndFetchById(req.params.id, {
    ...req.body,
  });
  return res.status(200).json({ status: 'success', user: updatedUser });
});

exports.deleteById = catchAsync(async (req, res, next) => {
  await User.query().deleteById(req.params.id);
  return res.status(204).json({});
});
