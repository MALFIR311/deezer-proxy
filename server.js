const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Deezer proxy running. Use /deezer-proxy?q=song");
});

app.get("/deezer-proxy", async (req, res) => {
  try {
    const q = req.query.q;
    if (!q) {
      return res.status(400).json({ error: "missing query parameter q" });
    }

    const deezerUrl = `https://api.deezer.com/search/track?q=${encodeURIComponent(q)}`;
    const response = await fetch(deezerUrl);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error("Deezer proxy error:", err);
    res.status(500).json({ error: "deezer proxy error" });
  }
});

app.listen(PORT, () => {
  console.log(`Deezer proxy server listening on port ${PORT}`);
});
