const Tag = require('../models/tagModel');
const catchAsync = require('../lib/catchAync');
const AppError = require('../lib/appError');

exports.getAll = catchAsync(async (req, res, next) => {
  const tags = await Tag.query().conditionalPage(req).conditionalSort(req);

  return res.status(200).json({ status: 'success', tags });
});

exports.getById = catchAsync(async (req, res, next) => {
  const tag = await Tag.query().findById(req.params.id);
  if (!tag) {
    return next(new AppError(`No tag found with ID ${req.params.id}`, 404));
  }
  return res.status(200).json({ status: 'success', data: { tag } });
});

exports.insert = catchAsync(async (req, res, next) => {
  console.log(req.body);
  console.log(req.user.id);
  const insertedTag = await Tag.query().insert({
    tag: req.body.tag,
    userid: req.user.id,
  });
  return res
    .status(201)
    .json({ status: 'success', data: { tag: insertedTag } });
});

exports.patchById = catchAsync(async (req, res, next) => {
  const patchedTag = await Tag.query().updateAndFetchById(req.params.id, {
    ...req.body,
  });
  return res.status(200).json({ status: 'success', data: { patchedTag } });
});

exports.deleteById = catchAsync(async (req, res, next) => {
  await Tag.query().deleteById(req.params.id);
  return res.status(201).json({});
});
