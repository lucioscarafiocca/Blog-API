const { Router } = require("express")
const postRouter = Router()
const postController = require("../controller/postController")
const passport = require("passport")

postRouter.get(
  "/posts",
  (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) return next(err)
      if (user) {
        req.user = user
        next()
      } else {
        next()
      }
    })(req, res, next)
  },
  postController.PostsGet
)
postRouter.get(
  "/posts/:postId",
  (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) return next(err)
      if (user) {
        req.user = user
        next()
      } else {
        next()
      }
    })(req, res, next)
  },
  postController.PostGet
)
postRouter.post("/new/user", postController.NewUserPost)
postRouter.post(
  "/new/post",
  passport.authenticate("jwt", { session: false }),
  postController.CreatePostPost
)
postRouter.post(
  "/posts/:postId/comments",
  (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) return next(err)
      if (user) {
        req.user = user
        next()
      } else {
        next()
      }
    })(req, res, next)
  },
  postController.CreateCommentPost
)
postRouter.post("/users/login", postController.UserLoginPost)
postRouter.put("/users", postController.UpdateUser)
postRouter.put("/posts/:postId", postController.UpdatePostPut)
postRouter.delete("/posts/:postId", postController.DeletePostDelete)
postRouter.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json("success!!!")
  }
)
postRouter.delete("/comment/:commentId", postController.DeleteComment)

module.exports = postRouter
