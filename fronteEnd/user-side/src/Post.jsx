import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import "./Post.css"
import { Link, useLocation } from "react-router-dom"
import { attachInterceptor } from "./jwtLib"
import axios from "axios"

function Post({ data, setLoading, user }) {
  const navigate = useNavigate()
  const location = useLocation()

  function handlePublish() {
    attachInterceptor()
    axios
      .put(`http://localhost:3000/posts/${data.id}`, {
        headers: { "Content-Type": "application/json" },
        title: data.title,
        text: data.text,
        publish: true,
      })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error")
        } else {
          if (location.pathname == "/") {
            setLoading(true)
          } else {
            navigate("/")
          }
        }
      })
      .catch((error) => console.log(error))
      .finally(() => console.log("done"))
  }

  function handleUnpublish() {
    attachInterceptor()
    axios
      .put(`http://localhost:3000/posts/${data.id}`, {
        headers: { "Content-Type": "application/json" },
        title: data.title,
        text: data.text,
        publish: false,
      })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error")
        } else {
          if (location.pathname == "/") {
            setLoading(true)
          } else {
            navigate("/")
          }
        }
      })
      .catch((error) => console.log(error))
      .finally(() => console.log("done"))
  }
  function handleDelete(setLoading) {
    fetch(`http://localhost:3000/posts/${data.id}`, {
      mode: "cors",
      method: "DELETE",
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error")
        } else {
          if (location.pathname == "/") {
            setLoading(true)
          } else {
            navigate("/")
          }
        }
      })
      .catch((error) => console.log(error))
      .finally(() => console.log("done"))
  }

  return (
    <>
      <div
        className="blog-parent"
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "lightgrey"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "white"
        }}
        onClick={(e) => navigate(`/posts/${data.id}`)}
      >
        <h3>{data.title}</h3>
        <p>{data.CreatedAt}</p>
        <p>{data.text}</p>
      </div>

      {user && (
        <>
          {!data.published ? (
            <button
              onClick={() => {
                handlePublish()
              }}
            >
              Publish
            </button>
          ) : (
            <button
              onClick={() => {
                handleUnpublish()
              }}
            >
              Unpublish
            </button>
          )}
          <Link state={{ data }} to={`/update/post/${data.id}`}>
            Edit
          </Link>
          <button
            onClick={async () => {
              handleDelete(setLoading)
            }}
          >
            Delete
          </button>
        </>
      )}
    </>
  )
}

export default Post
