const Snippet = require('../models/snippetModel');
const catchAsync = require('../lib/catchAync');
const AppError = require('../lib/appError');

exports.getAll = catchAsync(async (req, res, next) => {
  if (req.query.skip || req.query.limit) {
    const allSnippets = await Snippet.query().page(
      parseInt(req.query.offset, 10),
      parseInt(req.query.limit, 10)
    );
    return res
      .status(200)
      .json({ status: 'success', snippets: allSnippets  });
  }
  const allSnippets = await Snippet.query().orderBy('id');
  return res.status(200).json({ status: 'success', snippets: allSnippets });
});

exports.getById = catchAsync(async (req, res, next) => {
  const snippet = await Snippet.query().findById(req.params.id);
  if (!snippet) {
    return next(new AppError(`No snippet found with ID ${req.params.id}`, 404));
  }
  return res.status(200).json({ status: 'success', snippet });
});

exports.insert = catchAsync(async (req, res, next) => {
  const newSnippet = await Snippet.query().insert({
    userid: req.user.id,
    snippet: req.body.snippet,
  });
  return res.status(201).json({ status: 'success',  snippet: newSnippet  });
});

exports.patchById = catchAsync(async (req, res, next) => {
  const updatedSnippet = await Snippet.query()
    .findById(parseInt(req.params.id, 10))
    .patch({
      snippet: req.body.snippet,
    });
  return res.status(200).json({ status: 'success', snippet: updatedSnippet });
});

exports.deleteById = catchAsync(async (req, res, next) => {
  await Snippet.query().deleteById(req.params.id);
  return res.status(201).json({});
});
