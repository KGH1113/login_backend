const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const data = {
  ABCD1234: {
    point: 12,
    userName: "KGH1113",
    password: "password1234",
  },
};

const userIDs = {
  KGH1113: "ABCD1234",
};

app.post("/add", (req, res) => {
  const { userID } = req.body;
  const userData = data[userID];
  userData.point++;
  userData.console.log(data);
});

// Function to generate a unique userID
const generateID = (username) => {
  // Function to generate a random alphanumeric character
  const getRandomChar = (characters) => {
    return characters[Math.floor(Math.random() * characters.length)];
  };

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  let userID = "";

  while (true) {
    for (let i = 0; i < 4; i++) {
      const randomAlphabet = getRandomChar(alphabet);
      const randomNumber = getRandomChar(numbers);
      userID += randomAlphabet + randomNumber;
    }

    if (!Object.values(userIDs).includes(userID)) {
      userIDs[username] = userID;
      break;
    }
    userID = "";
  }
};

app.post("/login", (req, res) => {
  const { userName, password } = req.body;
  if (data.hasOwnProperty(userIDs[userName])) {
    if (data[userIDs[userName]].password == password) {
      res.status(200).json({
        status: "success",
        message: "success",
      });
    } else {
      res.status(400).json({
        status: "error",
        message: "wrong password",
      });
    }
  } else {
    res.status(400).json({
      status: "error",
      message: "userData not found",
    });
  }
});

app.post("/sign-in", (req, res) => {
  const { userName, password } = req.body;
  if (!data.hasOwnProperty(userIDs[userName])) {
    const userID = generateID(userName);
    data[userID] = { point: 0, userName: userName, password: password };
    res.status(200).json({
      status: "success",
      message: "success",
    });
  } else {
    res.status(400).json({
      status: "error",
      message: "userData exsists",
    });
  }
});

app.listen(3000, () => {
  console.log("listening on 3000");
});

app.get("/", (req, res) => {
  res.send("welcome to popop backend");
});
