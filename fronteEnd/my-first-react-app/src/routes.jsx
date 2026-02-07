import SinglePost from "./singlePost.jsx"
import App from "./App.jsx"
import Register from "./Register.jsx"
import Login from "./Login.jsx/"

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "posts/:postId",
    element: <SinglePost />,
  },
  { path: "/sign-up", element: <Register /> },
  { path: "/login", element: <Login /> },
]

export default routes
