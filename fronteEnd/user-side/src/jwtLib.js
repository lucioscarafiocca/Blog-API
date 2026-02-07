import axios from "axios"
import moment from "moment"

// const axiosInstance = axios.create({ baseURL: "http://localhost:3000/" })

function attachInterceptor() {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("jwtToken")
      const notExpired = moment().isBefore(checkExpiration())
      if (token && notExpired) {
        config.headers.Authorization = token
      } else {
        LogOut()
      }
      return config
    },
    (error) => {
      console.log(error)
      return Promise.reject(error)
    }
  )
}

function setLocalStorage(response) {
  const amount = response.exp.charAt(0)
  const type = response.exp.charAt(1)
  const expires = moment().add(amount, type)

  localStorage.setItem("jwtToken", response.token)
  localStorage.setItem("expires", JSON.stringify(expires.valueOf()))
}

function checkExpiration() {
  const expiration = localStorage.getItem("expires")
  const expiresAt = JSON.parse(expiration)
  return moment(expiresAt)
}

function loggedIn() {
  const token = localStorage.getItem("jwtToken")
  if (token) {
    return true
  }
  return false
}

function LogOut() {
  localStorage.removeItem("jwtToken")
  localStorage.removeItem("expires")
}
export { setLocalStorage, attachInterceptor, loggedIn, LogOut }
