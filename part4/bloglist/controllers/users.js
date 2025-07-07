const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user.js");

const postNewUser = (model) => async (request, response) => {
  const { username, name, password } = request.body;
  if (!password || password.length < 3) {
    return response.status(400).json({
      error:
        `password (${password}) does not meet requirement: every user must have a password, every password must be at least 3 characters long`,
    });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new model({
    username,
    name,
    passwordHash,
  });
  const savedUser = await user.save();
  response.status(201).json(savedUser);
};

usersRouter.post("/", postNewUser(User));

const getAllUsers = (model) => async (request, response) => {
  const users = await model.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });
  response.json(users);
};

usersRouter.get("/", getAllUsers(User));

module.exports = usersRouter;
