import React from "react";

const BlogsPage = ({
  blogs,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
  filterField,
  setFilterField,
  filterValue,
  setFilterValue,
  limit,
  setLimit,
  page,
  setPage,
}) => {
  console.log("blogs", blogs);
  return (
    <div className="blogs-page">
      <h1>Blogs Page</h1>
      <label>Sort Field</label>
      &nbsp;
      <select
        value={sortField}
        onChange={(e) => {
          const newSortField = e.target.value;
          setSortField(newSortField);
        }}
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="createdAt">Created At</option>
        <option value="id">ID</option>
      </select>
      &nbsp;
      <label>Sort Order</label>
      &nbsp;
      <select
        value={sortOrder}
        onChange={(e) => {
          const newSortOrder = e.target.value;
          setSortOrder(newSortOrder);
        }}
      >
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>
      &nbsp;
      <label>Filter Field</label>
      &nbsp;
      <select
        value={filterField}
        onChange={(e) => {
          const newFilterField = e.target.value;
          setFilterField(newFilterField);
        }}
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
      </select>
      &nbsp;
      <label>Filter Value</label>
      &nbsp;
      <input
        type="text"
        value={filterValue}
        onChange={(e) => {
          const newFilterValue = e.target.value;
          setFilterValue(newFilterValue);
        }}
      ></input>
      &nbsp;
      <label>Limit</label>
      &nbsp;
      <input
        type="number"
        min="1"
        value={limit}
        onChange={(e) => {
          const newLimit = e.target.value;
          setLimit(newLimit);
        }}
      ></input>
      &nbsp;
      <label>Page</label>
      &nbsp;
      <input
        type="number"
        min="1"
        value={page}
        onChange={(e) => {
          const newPage = e.target.value;
          setPage(newPage);
        }}
      ></input>
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
