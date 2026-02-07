import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { setLocalStorage } from "./jwtLib"

function Login() {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    fetch("http://localhost:3000/users/login", {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ username, password }),
    })
      .then(async (response) => {
        if (response.status >= 400) {
          const text = await response.json()
          console.log(text + "the text")
          setError(text)
          throw new Error("server error")
        } else {
          return response.json()
        }
      })
      .then((response) => {
        setLocalStorage(response)
        navigate("/")
      })
      .catch((error) => console.log(error))
      .finally(() => console.log("done"))
  }

  return (
    <>
      {error && <div>{error}</div>}

      <form
        onSubmit={async (e) => handleSubmit(e)}
        action="http://localhost:3000/users/login"
        method="POST"
      >
        <label htmlFor="username">Username: </label>
        <input
          onChange={(e) => {
            setUsername(e.target.value)
          }}
          ontype="text"
          name="username"
          id="username"
        />
        <label htmlFor="paswword"> Password: </label>
        <input
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          type="text"
          name="password"
          id="password"
        />

        <button>Login</button>
      </form>
    </>
  )
}

export default Login
