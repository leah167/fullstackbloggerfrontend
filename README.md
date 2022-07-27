Part 1:

- Create a new github repo called fullstackbloggerfrontend, clone the repo to your computer and add the link to populi.
- Initialize the repo with create-react-app.
- Install react-router
- Configure react-router by adding <BrowserRouter> to index.js.
- Create a new folder ./src/Pages
- Create a new file ./src/Pages/Blogs.js
- Create and default export a new react component BlogsPage in ./src/Pages/Blogs.js.
- In ./src/App.js, import the <Routes></Routes> component from react-router and add it to the JSX (HTML) of the App component.
- Add a state variable to App called serverJSON, initialized to:
  - {message: null}
- Add the following string as a global variable in ./src/App.js above the App component:
  - const urlEndpoint =
    "http://localhost:4000";
- Add the following useEffect method to App:
  - useEffect(() => {
    const fetchData = async () => {
    const apiResponse = await fetch(`${urlEndpoint}/blogs/hello-blogs`);
    const apiJSON = await apiResponse.json();
    setServerJSON(apiJSON);
    return;
    };
    fetchData();
    }, []);
- In ./src/App.js, import the <Route> component from react-router and the BlogsPage component from ./src/Pages/Blogs.
- In the JSX of App, nest a new <Route> in <Routes> with the path="/blogs" with the element={<BlogsPage message={serverJSON.message}/>}.
- In ./src/Pages/BlogsPage, display the prop variable message in the JSX of the BlogsPage component
  - const BlogsPage = (props) => {
    return (
    <div className="blogs-page">
    <h1>Blogs Page</h1>
    <p>Server Message: {props.message}</p>
    </div>
    )
    }
- Run npm start in ./ and navigate to "localhost:3000/blogs" and if everything has been set up correctly, you should see the following on page:
  - Blogs Page
    Server Message: hello from express

### Requirements (Fullstack Part 2 - Improved GET All Blogs)

- Implement the following in the Client

  - Add the following state variables to <App />
    - sortField {string} initialized to null
    - sortOrder {string} initialized to "ASC"
    - filterField {string} initialized to null
    - filterValue {string} initialized to null
    - limit {number} initialized to 10
    - page {number} initialized to 1
  - Pass these state variables as well as their setter functions as props into <BlogsPage />
  - Add the following input fields to the <BlogsPage />
    - sortField
      - Should be a <select> dropdown with the following <options>, ["title", "author", "createdAt"]
    - sortOrder
      - Should be a <select> dropdown with the following <options>, ["ASC", "DESC"]
    - filterField
      - Should be a <select> dropdown with the following <options>, ["title", "author"]
    - filterValue
      - Should be a text input field
    - limit
      - Should be a number input field
    - page
      - Should be a number input field
  - All input fields on the <BlogsPage /> should be hooked up to the state variables in <App />
  - Modify the useEffect method in the <App /> component to be:
    - useEffect(() => {
      const fetchData = async () => {
      const url = `${urlEndpoint}/blogs/all-blogs?sortField=${sortField}&sortOrder=${sortOrder}&filterField=${filterField}&filterValue=${filterValue}&limit=${limit}&page=${page}`
      const apiResponse = await fetch(url);
      const apiJSON = await apiResponse.json();
      setServerJSON(apiJSON);
      return;
      };
      fetchData();
      }, [sortField, sortOrder, filterField, filterValue, limit, page]);
  - Note: The idea here is that the input fields on the <BlogsPage /> will update the state variables in <App />. Since the useEffect hook in <App /> is watching the state variables [sortField, sortOrder, filterField, filterValue, limit, page] for changes, every time the user inputs a new value into any <BlogsPage /> input field, the useEffect will trigger. The new fetch url will be calculated with the most up to date query params and will in turn refetch the new list of blogs from the server.

  ### Requirements (Fullstack Part 3 - POST Blog)

- Implement the following in the Server

  - Create a new POST route "/blog-submit" and implement the following
    - Inside the route handler function, add the following variables to get the incoming values from the POST request body:
      - const title = req.body.title
      - const text = req.body.text
      - const author = req.body.author
    - Create a new blogPost object with the following fields, some of which will need to be generated with each new post.
      - title {string}
      - text {string}
      - author {string}
      - createdAt {date}
      - id {number}
      - lastModified {date}
    - Add a mongo insert method to save the new blogPost object in the database.
  - Note: Use ExpressJS Example "/blog-submit" route as reference.

- Implement the following in the Client

  - Create a new page <PostBlogPage />
  - Create a new route in <App /> "/post-blog" with the element as <PostBlogPage />
  - Add the following function in <App />
    - const blogSubmit = async (blog) => {
      const url = `${urlEndpoint}/blogs/blog-submit`
      const response = await fetch(url, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(blog)
      });
      const responseJSON = await response.json();
      }
  - Modify the "/blogs" route to be the index route of <App /> so that it shows by default at localhost:3000
    - <Route index element={<BlogsPage message={serverJSON.message} blogSubmit={blogSubmit} />} />
  - Implement the following in <PostBlogPage />
    - Add three new state variables:
      - title {string}
      - author {string}
      - text {string}
    - Add the following input fields:
      - title
        - Should be a text input field
      - author
        - Should be a text input field
      - text
        - Should be a <textarea> field
    - Hook up all input fields to their corresponding state variables
    - Add a <button> called Submit
    - The Submit button should call props.blogSubmit(blogData) onClick and then programatically redirect to the home page.
      - const navigate = useNavigate()
      - navigate(`/`)
  - Note: blogData is going to be an object containing the current values of title, author, and text in the <PostBlogPage /> state. This data will be received by the server through the POST request, which will then in turn generate a new blog post with the added fields such as createdAt. The server will then save the new post using the mongo insert() method.

- Stretch Goal: Add a debounce in the Front-End to the text input fields
  - https://usehooks.com/useDebounce/
- Stretch Goal: Modify the mongo method for "all-blogs" so that you can do a text match search in a blog post text field for a specific string. Additionally, update the filter options dropdown on the Front-End to include the "text" option.
  - Note: This will NOT check for partial searches
  - db.articles.find( { $text: { $search: "coffee" } } )
  - https://www.mongodb.com/docs/manual/reference/operator/query/text/#examples
- Super Stretch Goal:
  - elemMatch may be able to do a partial string match
  - https://www.mongodb.com/docs/manual/reference/operator/query/elemMatch/

### Requirements (Fullstack Part 3.2 - Blog Post Manager - Client)

- Implement the following Client-Side:
  - Create a new page <BlogManager />
  - In <App /> implement the following:
    - Add a new route "/blog-manager" in <App /> with <BlogManager /> as the element
      - <Route path="/blog-manager" element={<BlogManager />}>
    - Create a new state variable adminBlogList and initialize it to an empty array
    - Create a new state variable adminBlogsLoading and initialize it to false
    - Create a new useEffect for fetching the admin blog list from "admin/blog-list"
      - useEffect(() => {
        const fetchAdminBlogList = async () => {
        const apiResponse = await fetch(`${urlEndpoint}/admin/blog-list`);
        const json = await apiResponse.json();
        setAdminBlogList(json);
        return json;
        }
        fetchAdminBlogList()
        }, [adminBlogsLoading]);
    - Add the following function for sending the blog DELETE request
      - const deleteBlog = async (blogId) => {
        setAdminBlogsLoading(true)
        const url = `${urlEndpoint}/admin/delete-blog/${blogId}`
        const response = await fetch(url, {
        method: 'DELETE'
        });
        const responseJSON = await response.json();
        setAdminBlogsLoading(false)
        }
    - Pass adminBlogList and deleteBlog and as props into <BlogManager />
  - Create a new component <BlogManagerCard /> in ./src/components and import it into <BlogManager />
  - In <BlogManager />, map through the props.adminBlogList array and return a <BlogManagerCard /> component for each blog, with the blog variable and props.deleteBlog passed in as a prop to <BlogManagerCard /> :
    - {props.adminBlogList.map((blog)=>{
      return (
      <BlogManagerCard blog={blog} deleteBlog={props.deleteBlog}/>
      )
      })}
  - Implement the following in <BlogManagerCard />:
    - Display the blog id, title, author, createdAt, and lastModified in the <BlogManagerCard />
    - Add a button called Delete to the <BlogManagerCard /> which calls props.deleteBlog in the onClick handler with the props.blog.id passed in as the argument
      - <button onClick={()=>{
        await props.deleteBlog(props.blog.id)
        }}>Delete</button>
    - Apply css to <BlogManagerCard /> so that each card has a margin between other cards as well as a simple line outline around each card.
  - Test the delete functionality implemented above to verify everything is hooked up correctly.

### Requirements (Fullstack Part 3.3 - Blog Post Manager - Modal)

- Note: Our approach for this part of the Fullstack blogger is to implement the ability for an admin to edit blogs along with deleting them. We will add a new component called a Modal to our app. Then we will add a button to the <BlogManagerCard /> to open the Modal and at the same time, fetch blog data for a single blog for the Modal. We will then implement functionality to edit a single blog post in our Modal and send that updated blog data back to the server to be saved in the database.

- Implement the following Client-Side:

  - Create a new component <Modal> in "./src/components/Modal.js"

    - import React from "react";
      import "./Modal.css";

      const Modal = (props) => {

      if (!props.show) {
      return <></>
      }

      return (
      <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
      <h4 className="modal-title">{props.title}</h4>
      </div>
      <div className="modal-body">{props.children}</div>
      <div className="modal-footer">
      <button onClick={props.onClose} className="button">
      Close
      </button>
      </div>
      </div>
      </div>
      );
      };

      export default Modal;

  - Create a new Modal css file "./src/components/Modal.css"
    - .modal {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      }

      .modal-content {
      width: 50%;
      background-color: #fff;
      color: black;
      }

      .modal-header,
      .modal-footer {
      padding: 10px;
      }

      .modal-title {
      margin: 0;
      }

      .modal-body {
      padding: 10px;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      }
  - Note: The more robust implementation of the modal can be found here: https://medium.com/tinyso/how-to-create-a-modal-component-in-react-from-basic-to-advanced-a3357a2a716a
  - In <App />, implement the following:
    - Add the following function for fetching the data for a single blog
      - const fetchSingleBlog = async (blogId) => {
        const url = `${urlEndpoint}/blogs/single-blog/${blogId}`
        const response = await fetch(url);
        const responseJSON = await response.json();
        return responseJSON
        }
    - Pass fetchSingleBlog as a prop into <BlogManager />
  - In <BlogManager /> implement the following:
    - Import <Modal /> into <BlogManager />
    - Add a new state variable showModal and initialize it to false
    - Add four new state variables, editTitle, editAuthor, editText, and editBlogId. The state variables editTitle, editAuthor, editText should initialized to an empty string. The state variable editBlogId should be initialized to null.
    - Add the following code in the JSX of <BlogManager /> (near the top for organizational purposes)
      <Modal title={editTitle} onClose={() => setShowModal(false)} show={showModal}>
      <label>Author</label>
        <p>{editAuthor}</p>
        <label>Text</label>
        <p>{editText}</p>
      </Modal>
    - Update the props.adminBlogList.map code to the following:
      - {props.adminBlogList.map((blog) => {
        const fetchBlogAndShow = async () => {
        const blogPost = await fetchSingleBlog(blog.id)
        setEditTitle(blogPost.title)
        setEditAuthor(blogPost.author)
        setEditText(blogPost.text)
        setEditBlogId(blog.id)
        setShowModal(true)
        }
        return <BlogManagerCard blog={blog} deleteBlog={props.deleteBlog} fetchBlogAndShow={fetchBlogAndShow}/>;
        })}
      - Note: We are creating the function fetchBlogAndShow to do 2 things. 1. We are getting the id of the blog from the .map callback function and passing that into fetchSingleBlog to fetch the blog data from the server. 2. After fetchSingleBlog resolves with the blog data, we call setEditTitle, setEditAuthor, setEditText, and setEditBlogId to update the state variables. This function will be able to be called for every blog in our adminBlogList to load single blog data and display it in the modal.
  - In <BlogManagerCard />, add a button called Edit Blog that will call the function props.fetchBlogAndShow onClick
  - Note: At this point, you should be able to test the above functionality by clicking the Edit Blog button for any post in the Blog Manager page. The modal should show and it should be populated with the information from the selected blog post.
  - In <BlogManager /> implement the following:
    - Update the JSX enclosed in the <Modal></Modal> tags with the following:
      - <label>Title</label>
        <input
        type="text"
        value={editTitle}
        onChange={(e) => {
        setEditTitle(e.target.value);
        }}
        />
        <br/>
        <label>Author</label>
        <input
        type="text"
        value={editAuthor}
        onChange={(e) => {
        setEditAuthor(e.target.value);
        }}
        />
        <br/>
        <label>Text</label>
        <textarea
        value={editText}
        onChange={(e) => {
        setEditText(e.target.value);
        }}
        />
    - In <App />, pass urlEndpoint as a prop into <BlogManager />
    - Add the following function in <BlogManager />:
      - const putUpdatedBlog = async () => {
        const url = `${props.urlEndpoint}/admin/edit-blog`
        const response = await fetch(url, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        blogId: editBlogId,
        title: editTitle,
        author: editAuthor,
        text:editText
        }),
        });
        const responseJSON = await response.json();
        return responseJSON
        }
    - Pass putUpdatedBlog as a prop into <Modal>
    - Add a button in the footer of <Modal> called Update Blog that calls putUpdatedBlog onClick
      - <div className="modal-footer">
          <button
            onClick={() => {
              props.putUpdatedBlog();
            }}
          >
            Update Blog
          </button>
          <button onClick={props.onClose} className="button">
            Close
          </button>
        </div>
  - Note: At this point, CRUD (Create, Read, Update, and Delete) functionality should all be implemented in the Blogger application. You should be able to create new blog posts, view the new blog posts on the home page, update the blog posts using the blog-manager page Modal, and then delete a blog post in the blog-manager page. Test all this functionality to make sure that everything is working as it should.
