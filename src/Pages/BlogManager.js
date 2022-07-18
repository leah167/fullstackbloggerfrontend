import React, { useState } from "react";
import BlogManagerCard from "../components/BlogManagerCard";
import Modal from "../components/Modal";

const BlogManager = ({
  adminBlogList,
  deleteBlog,
  fetchSingleBlog,
  urlEndpoint,
  setAdminBlogsLoading,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editText, setEditText] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editBlogId, setEditBlogId] = useState(null);

  const putUpdatedBlog = async () => {
    setAdminBlogsLoading(true);
    const url = `${urlEndpoint}/admin/edit-blog`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editBlogId,
        title: editTitle,
        category: editCategory,
        author: editAuthor,
        text: editText,
      }),
    });
    const responseJSON = await response.json();
    setAdminBlogsLoading(false);
    return responseJSON;
  };

  return (
    <div>
      <h1>Blog Manager</h1>
      <Modal
        title={editTitle}
        onClose={() => setShowModal(false)}
        show={showModal}
        putUpdatedBlog={putUpdatedBlog}
      >
        <label>Title</label> &nbsp;
        <input
          type="text"
          value={editTitle}
          onChange={(event) => setEditTitle(event.target.value)}
        />
        <br />
        <br />
        <label>Author</label> &nbsp;
        <input
          type="text"
          value={editAuthor}
          onChange={(event) => setEditAuthor(event.target.value)}
        />
        <br />
        <br />
        <label>Text</label> &nbsp;
        <textarea
          value={editText}
          onChange={(event) => setEditText(event.target.value)}
        />
        <br />
        <br />
        <label>Category</label> &nbsp;
        <input
          type="text"
          value={editCategory}
          onChange={(event) => setEditCategory(event.target.value)}
        />
        <br />
        <br />
        <label>Blog ID</label> &nbsp;
        <input
          type="text"
          value={editBlogId}
          onChange={(event) => setEditBlogId(event.target.value)}
        />
        <p>{editBlogId}</p>
      </Modal>
      {adminBlogList.map((blog) => {
        const fetchBlogAndShow = async () => {
          const blogPost = await fetchSingleBlog(blog.id);
          setEditTitle(blogPost.title);
          setEditAuthor(blogPost.author);
          setEditText(blogPost.text);
          setEditCategory(blogPost.category);
          setEditBlogId(blog.id);
          setShowModal(true);
        };
        return (
          <BlogManagerCard
            blog={blog}
            deleteBlog={deleteBlog}
            fetchBlogAndShow={fetchBlogAndShow}
            key={blog.id}
          />
        );
      })}
      {/* {adminBlogList.map((blog) => {
         return (
           <BlogManagerCard blog={blog} deleteBlog={deleteBlog} key={blog.id} />
         );
       })} */}
    </div>
  );
};

export default BlogManager;
