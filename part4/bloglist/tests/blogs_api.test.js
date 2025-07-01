const { test, after, describe, beforeEach, before } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app.js");
const Blog = require("../models/blog.js");
const User = require("../models/user.js");
const helper = require("./test_helper.js");

const api = supertest(app);
before(async () => {
  await User.deleteMany({});
  await User.insertMany(helper.initialUsers);
});

beforeEach(async () => {
  const current_users = await helper.usersInDb();
  const first_id = current_users[0].id;
  await Blog.deleteMany({});
  await Blog.insertMany(
    helper.initialBlogs.map((blog) => ({ ...blog, user: first_id })),
  );
});

describe("live testing on test blogs db", () => {
  describe("GET on /api/blogs", () => {
    test("blogs are returned as json", async () => {
      await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test("EXERCISE 4.8: testing returned blog count", async () => {
      const response = await api
        .get("/api/blogs")
        .expect("Content-Type", /application\/json/);
      const expectedBlogCount = helper.initialBlogs.length;

      assert(response.body.length === expectedBlogCount);
    });

    test("test specific blog in returned content", async () => {
      const response = await api
        .get("/api/blogs");
      const titles = response.body.map((blog) => blog.title);
      const expectedBlog = {
        title: "Purely Typed Algebraic Nonsense",
        author: "William Lawvere",
        url: "blogs.blog",
        likes: 12,
      };

      assert(titles.includes(expectedBlog.title));
    });

    test("EXERCISE 4.9: unique identifier is .id", async () => {
      const response = await api
        .get("/api/blogs")
        .expect("Content-Type", /application\/json/);
      const unique_ids = response.body.map((blog) => blog.id).reduce(
        (acc, elt) => acc.includes(elt) ? acc : acc.concat(elt),
        [],
      );

      assert(unique_ids.length === helper.initialBlogs.length);
    });
  });
  describe("POST on /api/blogs", () => {
    test("EXERCISE 4.10: add new blog entry", async () => {
      const current_users = await helper.usersInDb();
      const first_id = current_users[0].id;
      const newBlog = {
        title: "Test Only Note",
        author: "Test Author",
        url: "test.url",
        likes: 11,
        userId: first_id,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const current_blogs = await helper.blogsInDb();

      const titles = current_blogs.map((blog) => blog.title);

      assert.strictEqual(current_blogs.length, helper.initialBlogs.length + 1);
      assert(titles.includes(newBlog.title));
    });

    test("EXERCISE 4.11: Posting without likes defaults to 0", async () => {
      const current_users = await helper.usersInDb();
      const first_id = current_users[0].id;
      const newBlog = {
        title: "Test Only Note",
        author: "Test Author",
        url: "test.url",
        userId: first_id,
      };
      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const current_blogs = await helper.blogsInDb();

      const targetBlog = current_blogs.filter((blog) =>
        blog.title === newBlog.title
      );

      assert(targetBlog.length === 1);
      assert(targetBlog[0].likes === 0);
    });

    test("EXERCISE 4.12: Post without title fails", async () => {
      const sansTitle = {
        author: "Test Author",
        url: "test.url",
        likes: 11,
      };
      await api
        .post("/api/blogs")
        .send(sansTitle)
        .expect(400);

      const current_blogs = await helper.blogsInDb();
      assert(current_blogs.length === helper.initialBlogs.length);
    });

    test("EXERCISE 4.12: Post without url fails", async () => {
      const sansUrl = {
        title: "Test Only Note",
        author: "Test Author",
        likes: 11,
      };
      await api
        .post("/api/blogs")
        .send(sansUrl)
        .expect(400);

      const current_blogs = await helper.blogsInDb();
      assert(current_blogs.length === helper.initialBlogs.length);
    });
  });
  describe("DELETE on /api/blogs/:id", () => {
    test("EXERICSE 4.13: Test valid blog post deletion", async () => {
      const preDeleteBlogs = await helper.blogsInDb();
      await api
        .delete(`/api/blogs/${preDeleteBlogs[0].id}`)
        .expect(204);
      const postDeleteBlogs = await helper.blogsInDb();
      assert(preDeleteBlogs.length - 1 === postDeleteBlogs.length);
      assert(
        !postDeleteBlogs.map((blog) => blog.id).includes(preDeleteBlogs[0].id),
      );
    });

    test("EXERCISE 4.13: Failed deletion", async () => {
      await api
        .delete("/api/blogs/id0")
        .expect(400);
      const currentBlogs = await helper.blogsInDb();
      assert(currentBlogs.length === helper.initialBlogs.length);
    });
  });

  describe("PUT on /api/blogs/:id", () => {
    test("EXERCISE 4.14: Update likes on blog post", async () => {
      const preUpdateBlogs = await helper.blogsInDb();
      let { id, likes } = preUpdateBlogs[0];
      likes = 2 * (1 + likes);
      const updatedEntry = await api
        .put(`/api/blogs/${id}`)
        .send({ likes })
        .expect(200);
      assert(updatedEntry.body.likes === ((1 + preUpdateBlogs[0].likes) * 2));
    });

    test("EXERCISE 4.14: Fail update on non-existing id", async () => {
      await api
        .put("/api/blogs/id0")
        .expect(400);

      const currentBlogs = await helper.blogsInDb();
      const blogsWoId = currentBlogs.map(({ title, author, url, likes }) => ({
        title,
        author,
        url,
        likes,
      }));
      // Safer would be to do a set-comparison and that the symmetric difference is empty
      // This assumes that DB order and order in api response is same as insertion order
      assert.deepStrictEqual(blogsWoId, helper.initialBlogs);
    });

    test("Exercise 4.17: Populate information available", async () => {
      const response = await api
        .get("/api/blogs")
        .expect("Content-Type", /application\/json/);
      const usersInDB = await helper.usersInDb();
      const usernamesInDB = usersInDB.map((user) => user.username);
      const namesInDB = usersInDB.map((user) => user.name);
      for (const blog of response.body) {
        assert(usernamesInDB.includes(blog.user.username));
        assert(namesInDB.includes(blog.user.name));
      }
    });
  });
  //
});

after(async () => {
  await mongoose.connection.close();
});
