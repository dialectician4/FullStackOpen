const blogsRouter = require("express").Router();
const Blog = require("../models/blog.js");
const User = require("../models/user.js");

const getOnModel = (model) => async (_request, response) => {
  const records = await model.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(records);
};

blogsRouter.get("/", getOnModel(Blog));

const saveOnModel = (model) => async (request, response) => {
  const body = request.body;
  const user = await User.findById(body.userId);
  if (!user) {
    return response.status(400).json({ error: "userId missing or not valid" });
  }
  const inst = new model({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user,
  });
  const savedInst = await inst.save();
  user.blogs = user.blogs.concat(savedInst._id);
  await user.save();
  response.status(201).json(savedInst);
};

blogsRouter.post("/", saveOnModel(Blog));

const deleteOnModel = (model) => async (request, response) => {
  await model.findByIdAndDelete(request.params.id);
  response.status(204).end();
};

blogsRouter.delete("/:id", deleteOnModel(Blog));

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

blogsRouter.put("/:id", updateOnModel(Blog));

module.exports = blogsRouter;
