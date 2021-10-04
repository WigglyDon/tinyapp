const express = require("express");
const cookieSession = require('cookie-session');
const helpers = require('./helpers.js');
const bodyParser = require("body-parser");
const app = express();
const PORT = 8080;

app.use(cookieSession({
  name: 'session',
  keys: ["test"],
  maxAge: 24 * 60 * 60 * 1000
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const urlDatabase = {};
const userDatabase = {};

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/register", (req, res) => {
  if (req.session.email) {
    res.redirect("/urls");
    return;
  }
  const templateVars = { email: req.session.email };
  res.render("register", templateVars);
});

app.post("/register", (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send("make sure email and password fields are not empty!");
    return;
  }
  if (!helpers.registerNewUser(req.body.email, req.body.email, req.body.password, userDatabase)) {
    res.status(400).send("user already exists!");
    return;
  }
  req.session.email = req.body.email;
  res.redirect("/urls");
});

app.get("/login", (req, res) => {
  if (req.session.email) {
    res.redirect("/urls");
    return;
  }
  const templateVars = { email: req.session.email };
  res.render("login", templateVars);
});

app.post("/login", (req, res) => {
  if (helpers.validateLoginCredentials(req.body.email, req.body.password, userDatabase)) {
    req.session.email = helpers.getUserID(req.body.email, userDatabase);
    res.redirect("/urls");
    return;
  }
  res.status(403).send("invalid credentials");
});

app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/urls");
});

app.get('/urls', (req, res) => {
  if (!req.session.email) {
    res.status(403).send("please log in");
    return;
  }
  const currentUser = req.session.email;
  const templateVars = { email: currentUser, urls: helpers.urlsForUser(currentUser, urlDatabase) };
  res.render("urls_index", templateVars);
});

app.post("/urls", (req, res) => {
  if (!req.session.email) {
    res.status(403).send("please log in");
    return;
  }
  const urlKey = helpers.generateRandomString();
  urlDatabase[urlKey] = { longURL: req.body.longURL, owner: req.session.email };
  res.redirect(`/urls/${urlKey}`);
});

app.get("/urls/new", (req, res) => {
  if (!req.session.email) {
    res.status(403).send("please log in");
    return;
  }
  const templateVars = { email: req.session.email };
  res.render("urls_new", templateVars);
});

app.get("/urls/:shortURL", (req, res) => {
  if (req.session.email !== urlDatabase[req.params.shortURL].owner) {
    res.status(403).send("please log in");
    return;
  }
  const shortURL = req.params.shortURL;
  const templateVars = { email: req.session.email, shortURL: shortURL, longURL: urlDatabase[shortURL].longURL };
  res.render("urls_show", templateVars);
});

app.post("/urls/:shortURL", (req, res) => {
  if (req.session.email !== urlDatabase[req.params.shortURL].owner) {
    res.redirect("/urls");
    return;
  }
  const shortURL = req.params.shortURL;
  urlDatabase[shortURL] = { longURL: req.body.longURL, owner: req.session.email };
  res.redirect(`/urls`);
});

app.post("/urls/:shortURL/delete", (req, res) => {
  if (req.session.email !== urlDatabase[req.params.shortURL].owner) {
    res.redirect("/urls");
    return;
  }
  const shortURL = req.params.shortURL;
  delete urlDatabase[shortURL];
  res.redirect(`/urls`);
});

app.get("/u/:shortURL", (req, res) => {
  if (!urlDatabase[req.params.shortURL]) {
    res.status(404).send("<a href= >this</a> short URL has not been created yet :(");
  } else {
    const longURL = urlDatabase[req.params.shortURL].longURL;
    res.redirect(longURL);
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
