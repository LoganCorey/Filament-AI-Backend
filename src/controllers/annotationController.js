const Annotation = require('../models/annotationModel');
const Tag = require('../models/tagModel');
const Snippet = require('../models/snippetModel');
const catchAsync = require('../lib/catchAync');
const AppError = require('../lib/appError');

exports.getAll = catchAsync(async (req, res, next) => {
  if (req.query.skip || req.query.limit) {
    const allAnnotations = await Annotation.query().page(
      parseInt(req.query.offset, 10),
      parseInt(req.query.limit, 10)
    );
    return res
      .status(200)
      .json({ status: 'success', annotations: allAnnotations });
  }
  const allAnnotations = await Annotation.query();
  return res
    .status(200)
    .json({ status: 'success', annotations: allAnnotations });
});

exports.getBySnippetId = catchAsync(async (req, res, next) => {
  const annotations = await Annotation.query().where(
    'snippetid',
    req.params.id
  );
  if (!annotations) {
    return next(
      new AppError(`No annotations found with snippet id ${req.params.id}`, 404)
    );
  }
  return res.status(200).json({ status: 'success', annotations });
});

exports.getById = catchAsync(async (req, res, next) => {
  const annotation = await Annotation.query().findById(req.params.id);
  if (!annotation) {
    return next(
      new AppError(`No annotation found with ID ${req.params.id}`, 404)
    );
  }
  return res.status(200).json({ status: 'success', annotation });
});

exports.insert = catchAsync(async (req, res, next) => {
  const newAnnotation = await Annotation.query().insert({
    userid: req.user.id,
    tagid: parseInt(req.body.tagid, 10),
    snippetid: parseInt(req.body.snippetid, 10),
    annotation: req.body.annotation,
  });
  return res.status(201).json({ status: 'success', annotation: newAnnotation });
});

exports.patchById = catchAsync(async (req, res, next) => {
  const updatedAnnotation = Annotation.query().updateAndFetchById(
    req.params.id,
    {
      ...req.body,
    }
  );
  return res
    .status(200)
    .json({ status: 'success', annotation: updatedAnnotation });
});

exports.deleteById = catchAsync(async (req, res, next) => {
  await Annotation.query().deleteById(req.params.id);
  return res.status(201).json({});
});

exports.getAnnotationsBySnippetId = catchAsync(async (req, res, next) => {
  // for a given snippet I want to get all tags and get all annotations
  const annotations = await Annotation.query().eager('tags').where(
    'snippetid',
    req.params.id
  );
  const snippet = await Snippet.query()
    .where('id', req.params.id);

  const tags = await Tag.query();
  return res
    .status(200)
    .json({ status: 'success', annotations, tags, snippet });
});
