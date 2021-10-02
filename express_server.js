const express = require("express");
const cookieSession = require('cookie-session');
const app = express();
const helpers = require('./helpers.js');

app.use(cookieSession({
  name: 'session',
  keys: ["test"],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


const PORT = 8080;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');



const urlDatabase = {

  "82xVn2": {
    longURL: "http://www.lighthouselabs.ca",
    owner: "1234@a.a"
  },
  "9sm5xK": {
    longURL: "http://www.google.com",
    owner: "tom"
  }
};



const userDatabase = {
 
};



app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/register", (req, res) => {
  if (req.session.username) {
    res.redirect("/urls");
    return;
  }
  res.render("register");
});

app.post("/register", (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send("make sure username and password fields are not empty!");
    return;
  }
  if (!helpers.registerNewUser(req.body.username, req.body.email, req.body.password, userDatabase)) {
    res.status(400).send("user already exists!");
    return;
  }
  req.session.username = req.body.username;
  res.redirect("/urls");
});

app.get("/login", (req, res) => {
  if (req.session.username) {
    res.redirect("/urls");
    return;
  }
  res.render("login");
});

app.post("/login", (req, res) => {
  if (helpers.validateLoginCredentials(req.body.email, req.body.password, userDatabase)) {
    req.session.username = helpers.getUserID(req.body.email, userDatabase);
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
  if (!req.session.username) {
    res.redirect("/login");
    return;
  }
  const currentUser = req.session.username;
  const templateVars = { username: currentUser, urls: helpers.urlsForUser(currentUser, urlDatabase) };
  res.render("urls_index", templateVars);
});

app.post("/urls", (req, res) => {
  if (!req.session.username) {
    res.redirect("/login");
    return;
  }
    const urlKey = helpers.generateRandomString();
    urlDatabase[urlKey] = {longURL:req.body.longURL, owner:req.session.username};
    res.redirect(`/urls/${urlKey}`);
});

app.get("/urls/new", (req, res) => {
  if (!req.session.username) {
    res.redirect("/login");
    return;
  }
  const templateVars = { username: req.session.username};
  res.render("urls_new", templateVars);
});

app.get("/urls/:shortURL", (req, res) => {
  if (req.session.username !== urlDatabase[req.params.shortURL].owner) {
    res.redirect("/login");
    return;
  }
  
  const shortURL = req.params.shortURL;
  const templateVars = { username: req.session.username, shortURL: shortURL, longURL: urlDatabase[shortURL].longURL };
  res.render("urls_show", templateVars);
});

app.post("/urls/:shortURL/edit", (req, res) => {
  if (req.session.username !== urlDatabase[req.params.shortURL].owner) {
    res.redirect("/urls");
    return;
  }
  
  const shortURL = req.params.shortURL;
  urlDatabase[shortURL] = {longURL:req.body.longURL, owner:req.session.username};
  res.redirect(`/urls/${shortURL}`);
});

app.post("/urls/:shortURL/delete", (req, res) => {
  if (req.session.username !== urlDatabase[req.params.shortURL].owner) {
    res.redirect("/urls");
    return;
  }
  
  const shortURL = req.params.shortURL
  delete urlDatabase[shortURL];
  res.redirect(`/urls`);
});

app.get("/u/:shortURL", (req, res) => {
  if (!urlDatabase[req.params.shortURL]) {
    // res.status(404).send("this short URL has not been created yet :(");
    res.status(404).send("<a href= >this</a> short URL has not been created yet :(");
    
  } else {
    const longURL = urlDatabase[req.params.shortURL].longURL;
    res.redirect(longURL);
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
