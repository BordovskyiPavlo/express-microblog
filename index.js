import express from "express";
import fs from "fs";

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Store posts in memory
let posts = [];

app.listen(port, () => {
  console.log(`Listening port: ${port}`);
});

app.get("/", (req,res) => {
  res.render("index.ejs", { posts: posts });
});

app.post("/submit", (req, res) => {
  const newPost = {
    username: "Anonime",
    text: req.body.postText
  };
  posts.unshift(newPost);
  res.redirect("/");
});