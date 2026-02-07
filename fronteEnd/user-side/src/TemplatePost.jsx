import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import "./TemplatePost.css"
import axios from "axios"
import { attachInterceptor } from "./jwtLib"

function TemplatePost() {
  const [title, setTitle] = useState()
  const [text, setText] = useState()
  const [publish, setPublish] = useState(false)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    attachInterceptor()
    axios
      .post("http://localhost:3000/new/post", {
        headers: { "Content-Type": "application/json" },
        title,
        text,
        publish,
      })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error")
        } else {
          navigate("/")
        }
      })
      .catch((error) => console.log(error))
      .finally(() => console.log("done"))
  }
  return (
    <>
      <form
        className="form"
        action="http://localhost:3000/new/post"
        method="POST"
        onSubmit={async (e) => {
          handleSubmit(e)
        }}
      >
        <label htmlFor="title">Title: </label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          name="title"
          id="title"
        />

        <label htmlFor="text"> Text: </label>
        <textarea
          onChange={(e) => setText(e.target.value)}
          name="text"
          id="text"
          cols="30"
          rows="10"
        ></textarea>

        <div>
          <label htmlFor="publish">Publish</label>
          <input
            onChange={(e) => {
              setPublish(e.target.checked)
            }}
            type="checkbox"
            name="publish"
            id="publish"
          />
        </div>

        <button> Submit </button>
      </form>
      <Link to="/">Go back</Link>
    </>
  )
}

export default TemplatePost
