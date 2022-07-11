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
