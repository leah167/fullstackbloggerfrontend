const BlogsPage = ({ blogs }) => {
  return (
    <div className="blogs-page">
      <h1>Blogs Page</h1>
      <div>
        {blogs.map((blog) => {
          return <BlogPost blog={blog} key={blog.id} />;
        })}
      </div>
    </div>
  );
};

const BlogPost = ({ blog }) => {
  return (
    <div className="blogPost">
      <p></p>
      <span>
        <strong> Title: </strong>
        <br />
      </span>
      {blog.title}
      <p>
        <span>
          <strong> Author: </strong>
          <br />
        </span>
        {blog.author}
      </p>
      <p>
        <span>
          <strong>Category: </strong> <br />
        </span>
        {blog.category}
      </p>
      <p>
        <span>
          <strong> Text: </strong> <br />
        </span>
        {blog.text}
      </p>
      <p>
        <span>
          <strong> Created At: </strong> <br />
        </span>
        {blog.createdAt}
      </p>
      <p>
        <span>
          <strong> Last Modified: </strong> <br />
        </span>
        {blog.lastModified}
      </p>
      <p>
        <span>
          <strong> ID: </strong> <br />
        </span>
        {blog.id}
      </p>
      <hr></hr>
    </div>
  );
};

export default BlogsPage;
