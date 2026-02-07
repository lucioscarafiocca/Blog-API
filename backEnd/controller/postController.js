const db = require("../db/queries")
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const issueJWT = require("../utils").issueJWT
const lengthErr = "must have a maximum of 12 characters"
const numErr = "must only contain numbers"
const passErr = "must be the same"
const validateUser = [
  body("username")
    .trim()
    .isLength({ max: 12 })
    .withMessage(`Name ${lengthErr}`)
    .custom(async (value) => {
      let nameCheck = await db.GetUserByname(value)
      if (nameCheck == null) {
        return true
      } else {
        throw new Error()
      }
    })
    .withMessage("user already exists"),
  body("password")
    .trim()
    .isNumeric()
    .withMessage(`Password ${numErr}`)
    .isLength({ max: 12 })
    .withMessage(`Names ${lengthErr}`),
  body("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      return value == req.body.password
    })
    .withMessage(`Passwords ${passErr}`),
]

async function PostsGet(req, res) {
  const user = req.user
  if (user && user.blogAuthor) {
    const posts = await db.GetAllPosts()
    res.json({ posts, user })
  } else {
    const posts = await db.GetAllPublishedPosts()
    res.json(posts)
  }
}

async function CreatePostPost(req, res) {
  const { title, text, publish } = req.body
  const user = req.user
  if (user.blogAuthor) {
    const post = await db.CreatePost(title, text, publish, user.id)
    res.json(post)
  } else {
    res.status(400).json("failure")
  }
}

const NewUserPost = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json(errors.array())
    } else {
      const { username, password, blogAuthor } = req.body
      const hashedpassword = await bcrypt.hash(password, 10)
      const user = await db.CreateUser(username, hashedpassword, blogAuthor)
      res.json({ user, message: "user created successfully" })
    }
  },
]

async function UserLoginPost(req, res) {
  const { username, password } = req.body
  const user = await db.GetUserByname(username)
  if (!user) {
    res.status(400).json("no user found")
  }
  const match = await bcrypt.compare(password, user.password)
  if (match) {
    const jwt = issueJWT(user)
    res.json({ user, token: jwt.token, exp: jwt.expires })
  } else {
    res.status(400).json("password is wrong lol")
  }
}

async function CreateCommentPost(req, res) {
  const { postId } = req.params
  const { text } = req.body
  const user = req.user
  if (!user) {
    const comment = await db.CreateComment(text, postId)
    res.json(comment)
  } else if (user && !user.blogAuthor) {
    const comment = await db.CreateComment(text, postId, user.id)
    res.json(comment)
  } else {
    res.json("denied you can comment on your own posts :)")
  }
}

//add one without comments
async function PostGet(req, res) {
  const { postId } = req.params
  const user = req.user
  const post = await db.GetPost(postId)
  if (post) {
    if (!post.published && user && user.blogAuthor) {
      res.json({ ...post, user })
    } else if (!post.published && user && !user.blogAuthor) {
      res.json("not allowed to see this one faggot :)")
    } else {
      res.json({ ...post, user })
    }
  } else {
    res.json("post doesnt exist")
  }
}

async function UpdateUser(req, res) {
  const { name, password } = req.body
  const user = await db.GetUserByname(name)
  if (user == null) {
    const UpdatedUser = await db.UpdateUser(3, name, password)
    res.json(UpdatedUser)
  } else {
    res.json("user already exists")
  }
}

async function UpdatePostPut(req, res) {
  const { postId } = req.params
  const { title, text, publish } = req.body
  const user = await db.GetUser(1)
  if (user.blogAuthor) {
    const updatedPost = await db.UpdatePost(postId, title, text, publish)
    res.json(updatedPost)
  } else {
    res.status(400).json("FORBIDDEN LOL")
  }
}

//not done
async function DeletePostDelete(req, res) {
  const { postId } = req.params
  await db.DeletePost(postId)
  res.json("success")
}

////missing auth
async function DeleteComment(req, res) {
  const { commentId } = req.params
  await db.DeleteComment(commentId)
  res.json("success")
}

module.exports = {
  PostsGet,
  NewUserPost,
  CreatePostPost,
  CreateCommentPost,
  PostGet,
  UpdateUser,
  UpdatePostPut,
  DeletePostDelete,
  UserLoginPost,
  DeleteComment,
}
