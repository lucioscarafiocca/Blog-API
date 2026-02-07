import { useEffect, useState } from "react"

function handleSize(id, setLoading) {
  fetch(`http://localhost:3000/comment/${id}`, {
    mode: "cors",
    method: "DELETE",
  })
    .then((response) => {
      if (response.status >= 400) {
        throw new Error("server error")
      } else {
        return response.json()
      }
    })
    .catch((error) => console.log(error))
    .finally(() => setLoading(true))
}
function Comment({ data, setLoading }) {
  return (
    <>
      {data.authorId ? <p>{data.author.username}</p> : <p>Anonymous</p>}
      <p>{data.CreatedAt}</p>
      <p>{data.text}</p>
      {data.authorId &&
        data.user &&
        data.user.username == data.author.username && (
          <button onClick={async () => handleSize(data.id, setLoading)}>
            Delete
          </button>
        )}
    </>
  )
}

export default Comment
