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
          <div></div>
        </>
      )}
      <Link to="/">Home</Link>
    </>
  )
}

export default SinglePost
