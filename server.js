const express = require("express");
const app = express();

app.use(express.json());

let posts = [];

// Trang chính
app.get("/", (req, res) => {
  res.send(`
    <h1>😂 Cuoivui</h1>
    <a href="/admin">Đăng bài</a>
    <hr/>
    ${posts.map(p => `
      <div>
        <h3>${p.title}</h3>
        <img src="${p.image}" width="300"/>
        <p>👍 ${p.likes}</p>
      </div>
    `).join("")}
  `);
});

// Trang admin
app.get("/admin", (req, res) => {
  res.send(`
    <h2>Đăng bài</h2>
    <input id="title" placeholder="Tiêu đề"><br><br>
    <input id="img" placeholder="Link ảnh"><br><br>
    <button onclick="post()">Đăng</button>

    <script>
      async function post() {
        await fetch("/posts", {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({
            title: title.value,
            image: img.value
          })
        });
        window.location.href = "/";
      }
    </script>
  `);
});

// API đăng bài
app.post("/posts", (req, res) => {
  const post = {
    ...req.body,
    _id: Date.now(),
    likes: 0
  };
  posts.push(post);
  res.json(post);
});

app.listen(3000, () => console.log("🚀 chạy 3000"));