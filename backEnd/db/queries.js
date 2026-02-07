const prisma = require("../db/index.js")

async function GetAllPosts() {
  const posts = await prisma.post.findMany()
  return posts
}

async function GetAllPublishedPosts() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
  })
  return posts
}
async function GetUser(id) {
  const blogAuthor = await prisma.user.findUnique({
    where: {
      id: id,
    },
  })
  return blogAuthor
}

async function GetUserByname(name) {
  const user = await prisma.user.findUnique({
    where: {
      username: name,
    },
  })
  return user
}

async function CreateUser(username, password, blogAuthor) {
  const user = await prisma.user.create({
    data: {
      username: username,
      password: password,
      blogAuthor: blogAuthor,
    },
  })
  return user
}

async function CreatePost(title, text, publish, authorId) {
  const post = await prisma.post.create({
    data: {
      title: title,
      text: text,
      published: publish,
      authorId: authorId,
    },
  })
  return post
}

async function CreateComment(text, postId, authorId) {
  const comment = await prisma.comment.create({
    data: {
      text: text,
      postId: Number(postId),
      authorId: authorId ? authorId : null,
    },
  })
  return comment
}

async function GetPost(id) {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      comments: {
        include: {
          author: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  })
  return post
}

async function UpdateUser(id, name, password) {
  const UpdatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      username: name,
      password: Number(password),
    },
  })
  return UpdatedUser
}

async function UpdatePost(id, title, text, publish) {
  const updatedUser = await prisma.post.update({
    where: {
      id: Number(id),
    },
    data: {
      title: title,
      text: text,
      published: publish,
    },
  })
  return updatedUser
}

//// miising auth
async function DeletePost(id) {
  await prisma.post.delete({
    where: {
      id: Number(id),
    },
  })
}

async function DeleteComment(id) {
  await prisma.comment.delete({
    where: {
      id: Number(id),
    },
  })
}

module.exports = {
  GetAllPosts,
  GetUser,
  CreateUser,
  CreatePost,
  CreateComment,
  GetPost,
  GetAllPublishedPosts,
  UpdateUser,
  UpdatePost,
  GetUserByname,
  DeletePost,
  DeleteComment,
}
