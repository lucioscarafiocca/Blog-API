import { useEffect, useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import Post from "./Post"
import { Link } from "react-router-dom"
import { attachInterceptor, LogOut, loggedIn } from "./jwtLib"
import axios from "axios"

function App() {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    attachInterceptor()
    axios
      .get("http://localhost:3000/posts")
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error")
        } else {
          setData(response.data)
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [loading])
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : data.user ? (
        data.posts.map((element) => {
          return (
            <Post
              setLoading={setLoading}
              key={element.id}
              data={element}
              user={data.user}
            ></Post>
          )
        })
      ) : (
        data.map((element) => {
          return (
            <Post
              setLoading={setLoading}
              key={element.id}
              data={element}
              user={data.user}
            ></Post>
          )
        })
      )}

      {loggedIn() ? (
        <button
          onClick={() => {
            LogOut()
            setLoading(true)
          }}
        >
          Logout
        </button>
      ) : (
        <>
          <Link to="/sign-up">Sign up </Link>
          <Link to="/login">Login </Link>
        </>
      )}
    </>
  )
}

export default App
