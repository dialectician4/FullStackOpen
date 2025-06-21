const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js');

const getOnModel = (model) => async (_request, response) => {
  const records = await model.find({});
  response.json(records);
};

blogsRouter.get('/', getOnModel(Blog));

const saveOnModel = (model) => async (request, response) => {
  const inst = new model(request.body);
  const result = await inst.save();
  response.status(201).json(result);
};

blogsRouter.post('/', saveOnModel(Blog));

const deleteOnModel = (model) => async (request, response) => {
  await model.findByIdAndDelete(request.params.id);
  response.status(204).end();
};

blogsRouter.delete('/:id', deleteOnModel(Blog));

const updateOnModel = (model) => async (request, response) => {
  const { likes } = request.body;
  const entry = await model.findById(request.params.id);
  if (!entry) {
    return response.status(404).end();
  } else if (likes == null) {
    return response.status(400).end();
  }
  entry.likes = likes;
  const updatedEntry = await entry.save();
  response.json(updatedEntry);
};

blogsRouter.put('/:id', updateOnModel(Blog));

module.exports = blogsRouter;
