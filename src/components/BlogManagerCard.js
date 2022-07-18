import React from "react";

const BlogManagerCard = ({ blog, deleteBlog, fetchBlogAndShow }) => {
  return (
    <div>
      <div className="blogPost">
        <p>
          <span>
            <strong>Title: </strong>
            <br />
          </span>
          {blog.title}
        </p>
        <p>
          <span>
            <strong>Author: </strong>
            <br />
          </span>
          {blog.author}
        </p>
        <p>
          <span>
            <strong>Category: </strong>
            <br />
          </span>
          {blog.category}
        </p>
        <p>
          <span>
            <strong>Text: </strong>
            <br />
          </span>
          {blog.text}
        </p>
        <p>
          <span>
            <strong>CreatedAt: </strong>
            <br />
          </span>
          {blog.createdAt}
        </p>
        <p>
          <span>
            <strong>Last Modified: </strong>
            <br />
          </span>
          {blog.lastModified}
        </p>
        <p>
          <span>
            <strong>ID: </strong>
            <br />
          </span>
          {blog.id}
        </p>
        <button
          onClick={async () => {
            await deleteBlog(blog.id);
          }}
        >
          Delete
        </button>
        <button
          onClick={async () => {
            await fetchBlogAndShow(blog.id);
          }}
        >
          Edit
        </button>
      </div>
      <br />
    </div>
  );
};

export default BlogManagerCard;
