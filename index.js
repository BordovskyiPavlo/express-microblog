import express from "express";
import fs from "fs";
import methodOverride from "method-override";

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

// Store posts in memory
let posts = [];
let lastId = 0;

app.listen(port, () => {
  console.log(`Listening port: ${port}`);
});

app.get("/", (req,res) => {
  res.render("index.ejs", { posts: posts });
});

app.post("/submit", (req, res) => {
  const id = `content-${lastId}`;
  const newPost = {
    username: "Anonime",
    text: req.body.postText,
    id: id
  };
  lastId++;
  posts.unshift(newPost);
  console.log(posts);
  res.redirect("/");
});

app.post("/edit", (req,res) => {
  const postId = req.body.postId;
  const postIndex = posts.findIndex(p => p.id === postId);
  console.log("Post updated:", posts[postIndex]);
  if (postIndex !== -1) {
    posts[postIndex].text = req.body.postText;
    console.log("Post updated:", posts[postIndex]);
  }
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const postId = req.body.postId;
  posts = posts.filter((post) => post.id !== postId);
  console.log("Post deleted:", postId);
  res.redirect("/");
});
