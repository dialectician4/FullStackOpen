const dummy = (_blogs) => 1;

const totalLikes = (blogs) =>
  blogs.map((blog) => blog.likes).reduce((total, elt) => total + elt, 0);

const favoriteBlog = (blogs) =>
  blogs.reduce((current, elt) => current.likes >= elt.likes ? current : elt, {
    likes: Number.NEGATIVE_INFINITY,
  });

const findAuthors = (blogs) =>
  blogs.reduce(
    (acc, elt) => acc.includes(elt.author) ? acc : acc.concat(elt.author),
    [],
  );

const mostBlogs = (blogs) => {
  const authors = findAuthors(blogs);
  const authors_w_blog_ct = authors.map((author) => ({
    author,
    blogs: blogs.filter((blog) => blog.author === author).length,
  }));
  return authors_w_blog_ct.reduce(
    (most, elt) => most.blogs >= elt.blogs ? most : elt,
    { author: '', blogs: Number.NEGATIVE_INFINITY },
  );
};

const mostLikes = (blogs) => {
  const authors = findAuthors(blogs);
  const authors_w_likes = authors.map((author) => ({
    author,
    likes: blogs.map((blog) => blog.author === author ? blog.likes : 0).reduce(
      (sum, elt) => sum + elt,
      0,
    ),
  }));
  return authors_w_likes.reduce((most, elt) =>
    most.likes >= elt.likes ? most : elt
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
