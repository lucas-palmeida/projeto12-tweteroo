import express, { json } from "express";
import cors from "cors";

const server = express();
const PORT = 5000;

server.use(cors());
server.use(json());

const usuarios = [];

const tweets = [];

server.post("/sign-up", (req, res) => {
  const novoUsuario = req.body;
  const usuarioExistente = usuarios.some(
    (u) => u.username === novoUsuario.username
  );

  if (novoUsuario.username && novoUsuario.avatar) {
    if (usuarioExistente) {
      return res.status(409).send("Usuário já existe.");
    }

    usuarios.push(novoUsuario);
    return res.status(201).send("OK");
  }

  return res.status(422).send("Todos os campos são obrigatórios.");
});

server.post("/tweets", (req, res) => {
  const novoTweet = req.body;
  const usuarioCadastrado = usuarios.some(
    (u) => u.username === novoTweet.username
  );

  if (!usuarioCadastrado) return res.status(401).send("UNAUTHORIZED");

  if (novoTweet.username && novoTweet.tweet) {
    tweets.push(novoTweet);
    return res.status(201).send("OK");
  }

  return res.status(422).send("Todos os campos são obrigatórios.");
});

server.get("/tweets", (req, res) => {
  const tweetsInvertidosComAvatar = tweets.reverse();

  for (let i = 0; i < tweetsInvertidosComAvatar.length; i++) {
    for (let j = 0; j < usuarios.length; j++) {
      if (tweetsInvertidosComAvatar[i].username === usuarios[j].username) {
        tweetsInvertidosComAvatar[i].avatar = usuarios[j].avatar;
      }
    }
  }

  if(tweetsInvertidosComAvatar.length < 10) {
    res.send(tweetsInvertidosComAvatar);
  }

  res.send(tweetsInvertidosComAvatar.slice(0, 10));
});

server.listen(PORT, () => {
  console.log("Servidor rodando em http://localhost:5000");
});
