import SinglePost from "./singlePost.jsx"
import App from "./App.jsx"
import Register from "./Register.jsx"
import Login from "./Login.jsx/"
import TemplatePost from "./TemplatePost.jsx"
import EditPost from "./EditPost.jsx"

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
  { path: "/new/post", element: <TemplatePost /> },
  { path: "/update/post/:postId", element: <EditPost /> },
]

export default routes
