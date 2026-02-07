const express = require("express")
const app = express()
const postRouter = require("./routes/postRouter")
const bodyParser = require("body-parser")
const passport = require("passport")
const cors = require("cors")

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

require("./passport")(passport)
app.use(passport.initialize())

app.use("/", postRouter)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`)
})
