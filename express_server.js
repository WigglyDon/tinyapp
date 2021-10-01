const express = require("express");
const cookieParser = require('cookie-parser')
const app = express();
app.use(cookieParser());
const PORT = 8080;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const userDatabase = {
  "1234@a.a": {
    id: "1234@a.a",
    email: "1234@a.a",
    password: "1"
  },
  "5678@a.a": {
    id: "5678@a.a",
    email: "5678@a.a",
    password: "2"
  },

  "tom": {
    id: "tom",
    email: "tom@bombadil.com",
    password: "goldberry"
  }
};



app.get("/", (req, res) => {
  res.redirect("/urls");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send("make sure username and password fields are not empty!");
    return;
  }
  if (!registerNewUser(req.body.username, req.body.email, req.body.password)) {
    res.status(400).send("user already exists!");
    return;
  }
  res.cookie("username", req.body.username);
  res.redirect("/urls");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {

  if (validateLoginCredentials(req.body.email, req.body.password)) {
    res.cookie("username", getUserID(req.body.email));
    res.redirect("/urls");
    return;
  }
  res.status(403).send("invalid credentials");
  
});

app.post("/logout", (req, res) => {
  res.clearCookie("username");
  res.redirect("/urls");
});

app.get('/urls', (req, res) => {
  const templateVars = { username: req.cookies["username"], urls: urlDatabase };
  res.render("urls_index", templateVars);
});
app.post("/urls", (req, res) => {
  const urlKey = generateRandomString();
  urlDatabase[urlKey] = req.body.longURL;
  res.redirect(`/urls/${urlKey}`);
});

app.get("/urls/new", (req, res) => {
  const templateVars = { username: req.cookies["username"]};
  res.render("urls_new", templateVars);
});

app.get("/urls/:shortURL", (req, res) => {
  const templateVars = { username: req.cookies["username"], shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  res.render("urls_show", templateVars);
});

app.post("/urls/:shortURL/edit", (req, res) => {
  const shortURL = req.params.shortURL;
  console.log(req.body.longURL);
  urlDatabase[shortURL] = req.body.longURL;
  res.redirect(`/urls/${shortURL}`);
});

app.post("/urls/:shortURL/delete", (req, res) => {
  const shortURL = req.params.shortURL
  delete urlDatabase[shortURL];
  res.redirect(`/urls`);
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});


app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/home", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

// -----------------------------------------------------------------
// helper functions

function registerNewUser(id, email, password) {
  if (userDatabase[id]) {
    return false;
  }
  for (const user in userDatabase) {
    if (email === userDatabase[user].email) {
      return false;
    }
  }
  
  userDatabase[id] = {id, email, password};
  return true;
}

function validateLoginCredentials(email, password) {
  for (const user in userDatabase) {
    if (email === userDatabase[user].email) {
      if (password === userDatabase[user].password) {
        return true;
      }
    }
  }
  return false;
}

function getUserID(email) {
  for (const user in userDatabase) {
    if (email === userDatabase[user].email) {
      return userDatabase[user].id;
    }
  }
}

function generateRandomString() {
  return Math.random().toString(36).substr(2, 6);
}


// const userDatabase = {
//   "1234@a.a": {
//     id: "1234@a.a",
//     email: "1234@a.a",
//     password: "1"
//   },
//   "5678@a.a": {
//     id: "5678@a.a",
//     email: "5678@a.a",
//     password: "2"
//   }
// };

// -----------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
