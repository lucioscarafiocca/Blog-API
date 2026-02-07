import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import Post from "./Post"
import Comment from "./Comment"
import axios from "axios"
import { attachInterceptor } from "./jwtLib"

function SinglePost() {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [text, setText] = useState("")
  const params = useParams()

  function handlePostComment(e, text, setLoading, id) {
    e.preventDefault()
    axios
      .post(`http://localhost:3000/posts/${id}/comments`, {
        headers: {
          "Content-Type": "application/json",
        },
        text,
      })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error")
        } else {
          return response.data
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(true))
  }

  useEffect(() => {
    attachInterceptor()
    axios
      .get(`http://localhost:3000/posts/${params.postId}`)
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
      ) : (
        <>
          <Post key={data.id} data={data}></Post>
          {data.comments.map((element) => {
            return (
              <Comment
                key={element.id}
                data={{ ...element, user: data.user }}
                setLoading={setLoading}
              ></Comment>
            )
          })}
          <div>
            <form
              onSubmit={(e) => handlePostComment(e, text, setLoading, data.id)}
              action="http://localhost:3000/posts/1/comments"
              method="post"
            >
              <label htmlFor="text">Comment here: </label>
              <input
                type="text"
                name="text"
                id="text"
                onChange={(event) => setText(event.target.value)}
              />

              <button>Submit</button>
            </form>
          </div>
        </>
      )}
      <Link to="/">Home</Link>
    </>
  )
}

export default SinglePost
