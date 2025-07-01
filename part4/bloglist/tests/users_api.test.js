const bcrypt = require("bcrypt");
const assert = require("node:assert");
const { test, after, describe, beforeEach } = require("node:test");
const User = require("../models/user.js");
const Blog = require("../models/blog.js");
const supertest = require("supertest");
const app = require("../app.js");
const mongoose = require("mongoose");
const helper = require("./test_helper.js");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(helper.initialUsers);
});

describe("when there is initially three users in db", () => {
  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "testuser",
      name: "Test Userson",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  test("creation fails with proper statuscodde and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "test_user_1",
      name: "DuplicateUser",
      password: "salainen",
    };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(result.body.error.includes("expected `username` to be unique"));
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});

describe("user validations", () => {
  test("user has username", async () => {
    const usersAtStart = await helper.usersInDb();

    const noUsername = {
      name: "TestUser1",
      password: "longEnough",
    };

    const result = await api
      .post("/api/users")
      .send(noUsername)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(result.body.error.includes("Path `username` is required"));
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("user has min length username", async () => {
    const usersAtStart = await helper.usersInDb();

    const shortUsername = {
      username: "us",
      name: "TestUser1",
      password: "longEnough",
    };

    const result = await api
      .post("/api/users")
      .send(shortUsername)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(result.body.error.includes("username"));
    assert(
      result.body.error.includes(
        "is shorter than the minimum allowed length (3)",
      ),
    );
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("user has password", async () => {
    const usersAtStart = await helper.usersInDb();

    const noPassword = {
      username: "us",
      name: "TestUser1",
    };

    const result = await api
      .post("/api/users")
      .send(noPassword)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(
      result.body.error.includes(
        "password (undefined) does not meet requirement",
      ),
    );
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("user has min length password", async () => {
    const usersAtStart = await helper.usersInDb();

    const noPassword = {
      username: "us",
      name: "TestUser1",
      password: "to",
    };

    const result = await api
      .post("/api/users")
      .send(noPassword)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(
      result.body.error.includes("password (to) does not meet requirement"),
    );
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("Exercise 4.17: test blogs can populate", async () => {
    const current_users = await helper.usersInDb();
    const first_id = current_users[0].id;
    await Blog.deleteMany({});
    const prepdBlogs = helper.initialBlogs
      .map((blog) => ({ ...blog, userId: first_id }));
    for (const blog of prepdBlogs) {
      await api.post("/api/blogs").send(blog).expect(201);
    }
    const usersResponse = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const userWBlogs = usersResponse.body
      .filter((user) => user.id === first_id)[0];
    const propagatedBlogs = userWBlogs.blogs;
    assert.strictEqual(propagatedBlogs.length, helper.initialBlogs.length);
    propagatedBlogs.forEach((userBlog) => {
      assert(
        helper.initialBlogs
          .map((blog) => blog.title)
          .includes(userBlog.title),
      );
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
