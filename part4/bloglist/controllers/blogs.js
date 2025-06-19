const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

const get_on_model = (model) => (request, response) => {
  model.find({}).then((blogs) => response.json(blogs));
};

blogsRouter.get('/', get_on_model(Blog));

const save_on_model = (model) => (request, response) => {
  const inst = new model(request.body);
  inst.save().then((result) => response.status(201).json(result));
};

blogsRouter.post('/', save_on_model(Blog));

module.exports = blogsRouter;
