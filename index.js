const express = require("express");
const app = express();

const data = {
  ABCD1234: {
    point: 12,
    userName: "KGH1113",
    password: "password1234",
  },
};

const userData = {}

app.post("/add", (req, res) => {
  const { userID } = req.body;
  const userData = data[userID];
  userData.point++;
  userData.console.log(data);
});

// Function to generate a random alphanumeric character
const getRandomChar = (characters) => {
  return characters[Math.floor(Math.random() * characters.length)];
}

// Function to generate a unique userID
const signIn = (username, password) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  let userID = "";

  while (true) {
    for (let i = 0; i < 4; i++) {
      const randomAlphabet = getRandomChar(alphabet);
      const randomNumber = getRandomChar(numbers);
      userID += randomAlphabet + randomNumber;
    }

    if (!Object.keys(data).includes(userID)) {
        data[userID] = {point:0, userName:username, password:password};
        break;
    }
    userID = "";
  }
}

app.post("/login", (req, res) => {
  const { userName, password } = req.body;
  if (data.hasOwnProperty(userName)) {
    res.status(200).send("success");
  } else {
    res.status(400).send("UserData not found");
  }
});

app.listen(3000, () => {
  console.log("listening on 3000");
});

app.get("/", (req, res) => {
  res.send("Welcome to popop backend");
});
