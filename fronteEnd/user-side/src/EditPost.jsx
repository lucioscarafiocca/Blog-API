import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Link, useParams } from "react-router-dom"

import "./TemplatePost.css"
import axios from "axios"
import { attachInterceptor } from "./jwtLib"

function EditPost() {
  const location = useLocation()
  const { data } = location.state
  const params = useParams()
  const [title, setTitle] = useState(data.title)
  const [text, setText] = useState(data.text)
  const [publish, setPublish] = useState(data.published)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    attachInterceptor()
    axios
      .put(`http://localhost:3000/posts/${params.postId}`, {
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
        action={`http://localhost:3000/posts/${params.postId}`}
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
          value={title}
        />

        <label htmlFor="text"> Text: </label>
        <textarea
          onChange={(e) => setText(e.target.value)}
          name="text"
          id="text"
          cols="30"
          rows="10"
          value={text}
        ></textarea>

        <button> Submit </button>
      </form>
      <Link to="/">Go back</Link>
    </>
  )
}

export default EditPost
