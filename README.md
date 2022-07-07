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
