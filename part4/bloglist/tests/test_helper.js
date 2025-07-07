const Blog = require("../models/blog.js");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
  {
    title: "Purely Typed Algebraic Nonsense",
    author: "William Lawvere",
    url: "blogs.blog",
    likes: 12,
  },
];

const unencrypted_pwds = ["HashPass1", "HashPass2", "HashPass3"];
// const encrypted_pwds = await Promise.all(
//   unencrypted_pwds.map((pwd) => bcrypt.hash(pwd, 10)),
// );

const initialUsers = [
  {
    username: "test_user_1",
    name: "Test McUserson 1",
    passwordHash: unencrypted_pwds[0],
  },
  {
    username: "test_user_2",
    name: "Test McUserson 2",
    passwordHash: unencrypted_pwds[1],
  },
  {
    username: "test_user_3",
    name: "Test McUserson 3",
    passwordHash: unencrypted_pwds[2],
  },
];

const encryptPwd = async (user) => ({
  ...user,
  passwordHash: await bcrypt.hash(user.passwordHash, 10),
});

const getEncryptedInitialUsers = () =>
  Promise.all(initialUsers.map(encryptPwd));

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDb,
  usersInDb,
  getEncryptedInitialUsers,
};
