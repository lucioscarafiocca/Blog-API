import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import "./Post.css"

function Post({ data }) {
  const navigate = useNavigate()

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
    </>
  )
}

export default Post
