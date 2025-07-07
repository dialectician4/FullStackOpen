const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper.js");

test("dummy returns one", () => {
  // console.log("begin list helper test");
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

const manyBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
  {
    _id: "5095095570asdfa",
    title: "Purely Typed Algebraic Nonsense",
    author: "William Lawvere",
    url: "blogs.blog",
    likes: 12,
    ___v: 0,
  },
];

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
    __v: 0,
  },
];

describe("total likes", () => {
  test("if blogs count is 1, totalLikes = blogs[0].likes", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("for multiple blogs, totalLikes is sum of their likes", () => {
    const result = listHelper.totalLikes(manyBlogs);
    assert.strictEqual(result, 48);
  });
});

describe("favoriteBlogs", () => {
  test("favorite blog without ties", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    assert.deepStrictEqual(listWithOneBlog[0], result);
  });

  test("favorite blog with ties (first blog with max likes)", () => {
    const expected_result = {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    };
    const result = listHelper.favoriteBlog(manyBlogs);
    assert.deepStrictEqual(expected_result, result);
  });
});

describe("most blogs", () => {
  test("most blogs without tie", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", blogs: 1 });
  });

  test("most blogs multi-input", () => {
    const result = listHelper.mostBlogs(manyBlogs);
    assert.deepStrictEqual(result, { author: "Robert C. Martin", blogs: 3 });
  });

  test("most blogs", () => {
    const tiedInput = manyBlogs.concat({
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    });
    const result = listHelper.mostBlogs(tiedInput);
    // Tie breaker is which author appears first in input
    assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", blogs: 3 });
  });
});

describe("most likes", () => {
  test("most likes", () => {
    const result = listHelper.mostLikes(manyBlogs);
    assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", likes: 17 });
  });
});
