import express, { json } from "express";
import cors from "cors";

const server = express();
const PORT = 5000;

server.use(cors());
server.use(json());

const usuarios = [
  // {
  //   username: "sasukeuchiha",
  //   avatar: "https://upload.wikimedia.org/wikipedia/pt/0/02/Sasukereup.jpg",
  // },
  // {
  //   username: "narutouzumaki",
  //   avatar:
  //     "https://viciados.net/wp-content/uploads/2022/11/Naruto-Shippuden-Boruto-2023.webp",
  // },
  // {
  //   username: "kakashihatake",
  //   avatar:
  //     "https://quartoframe.com.br/wp-content/uploads/2021/07/kakashi-hatake-capa.jpg",
  // },
  // {
  //   username: "itachiuchiha",
  //   avatar:
  //     "https://upload.wikimedia.org/wikipedia/pt/thumb/e/e5/Itachi_Uchiha.jpg/200px-Itachi_Uchiha.jpg",
  // },
  // {
  //   username: "shikamarunara",
  //   avatar:
  //     "http://pm1.narvii.com/6370/9deb6493996e783b0c0d034b89ccbc2e67de4fca_00.jpg",
  // },
  // {
  //   username: "madarauchiha",
  //   avatar:
  //     "https://www.comboinfinito.com.br/principal/wp-content/uploads/2019/10/Jump-Force-1.jpg",
  // },
  // {
  //   username: "jiraiya",
  //   avatar:
  //     "https://i.pinimg.com/originals/97/c8/49/97c84938fa55449c6d7cc2799cec7f70.jpg",
  // },
];

const tweets = [
  // {
  //   username: "sasukeuchiha",
  //   tweet: "Desde que você não desista, vai sempre existir salvação.",
  // },
  // {
  //   username: "narutouzumaki",
  //   tweet: "Desista de me fazer desistir!",
  // },
  // {
  //   username: "kakashihatake",
  //   tweet: "Saber o que é certo e escolher ignorá-lo é um ato de covardia.",
  // },
  // {
  //   username: "itachiuchiha",
  //   tweet: "Você é fraco. Te falta ódio.",
  // },
  // {
  //   username: "shikamarunara",
  //   tweet: "Não há vantagem alguma em viver a vida correndo.",
  // },
  // {
  //   username: "madarauchiha",
  //   tweet: "Se você se concentrar em algo, poderá fazer qualquer coisa.",
  // },
  // {
  //   username: "jiraiya",
  //   tweet: "Quando você conhece a dor e o sentimento, não machuca as pessoas.",
  // },
  // {
  //   username: "sasukeuchiha",
  //   tweet: "Desde que você não desista, vai sempre existir salvação.",
  // },
  // {
  //   username: "narutouzumaki",
  //   tweet: "Desista de me fazer desistir!",
  // },
  // {
  //   username: "kakashihatake",
  //   tweet: "Saber o que é certo e escolher ignorá-lo é um ato de covardia.",
  // },
  // {
  //   username: "itachiuchiha",
  //   tweet: "Você é fraco. Te falta ódio.",
  // },
  // {
  //   username: "shikamarunara",
  //   tweet: "Não há vantagem alguma em viver a vida correndo.",
  // },
  // {
  //   username: "madarauchiha",
  //   tweet: "Se você se concentrar em algo, poderá fazer qualquer coisa.",
  // },
  // {
  //   username: "jiraiya",
  //   tweet: "Quando você conhece a dor e o sentimento, não machuca as pessoas.",
  // },
];

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

  if(tweets.length === 0) {
    res.send(tweets);
  }

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
