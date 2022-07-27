import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import blogSubmit from ".../App";

const PostBlogPage = ({ blogSubmit, setIsFetching }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      Post Blog Page
      <br />
      <label>Title</label>
      &nbsp;
      <input
        type="text"
        value={title}
        onChange={(e) => {
          const newTitle = e.target.value;
          setTitle(newTitle);
        }}
      ></input>
      &nbsp;
      <label>Author</label>
      &nbsp;
      <input
        type="text"
        value={author}
        onChange={(e) => {
          const newAuthor = e.target.value;
          setAuthor(newAuthor);
        }}
      ></input>
      &nbsp;
      <label>Category</label>
      &nbsp;
      <input
        type="text"
        value={category}
        onChange={(e) => {
          const newCategory = e.target.value;
          setCategory(newCategory);
        }}
      ></input>
      &nbsp;
      <label>Text</label>
      &nbsp;
      <textarea
        type="text"
        value={text}
        onChange={(e) => {
          const newText = e.target.value;
          setText(newText);
        }}
      ></textarea>
      &nbsp;
      <button
        id="submit"
        type="submit"
        onClick={async () => {
          if (!title || !text || !author || !category) {
            let isTitle = title ? "" : "\n - Title";
            let isText = text ? "" : "\n - Text";
            let isAuthor = author ? "" : "\n - Author";
            let isCategory = category ? "" : "\n - Category";
            alert(
              `Please enter missing field(s): ${isTitle} ${isText} ${isAuthor} ${isCategory}`
            );
          } else {
            setIsFetching(true);
            const { success, message } = await blogSubmit({
              title: title,
              author: author,
              category: category,
              text: text,
            });
            setIsFetching(false);
            setMessage(message);
            if (success === true) {
              navigate("/");
            }
          }
        }}
      >
        Submit
      </button>
      <div>{message}</div>
    </div>
  );
};

export default PostBlogPage;
