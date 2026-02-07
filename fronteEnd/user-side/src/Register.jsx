import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Register() {
  const [formData, setformData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    blogAuthor: false,
  })
  const [error, setError] = useState([])
  const navigate = useNavigate()

  ///proper error catching???/
  function handleSubmit(e) {
    e.preventDefault()
    fetch("http://localhost:3000/new/user", {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        if (response.status >= 400) {
          const text = await response.json()
          setError(text)
          throw new Error(text)
        } else {
          navigate("/")
        }
      })
      .catch((error) => console.log(error))
      .finally(() => console.log("done"))
  }

  return (
    <>
      {error.map((element) => {
        return <div>{element.msg}</div>
      })}
      <form
        onSubmit={async (e) => handleSubmit(e)}
        action="http://localhost:3000/new/user"
        method="POST"
      >
        <label htmlFor="username">Username: </label>
        <input
          onChange={(e) => {
            setformData({ ...formData, username: e.target.value })
          }}
          ontype="text"
          name="username"
          id="username"
        />
        <label htmlFor="paswword"> Password: </label>
        <input
          onChange={(e) => {
            setformData({ ...formData, password: e.target.value })
          }}
          type="text"
          name="password"
          id="password"
        />
        <label htmlFor="confirmPassword"> Confirm password: </label>
        <input
          onChange={(e) => {
            setformData({ ...formData, confirmPassword: e.target.value })
          }}
          type="text"
          name="onfirmPassword"
          id="onfirmPassword"
        />

        <button>Register</button>
      </form>
    </>
  )
}
export default Register
