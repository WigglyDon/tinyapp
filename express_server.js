const express = require("express");
const app = express();
const PORT = 8080;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');


function generateRandomString() {
  //read me
  return Math.random().toString(36).substr(2, 6);
}

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};




app.get("/", (req, res) => {
  res.send("HOMEPAGE");
});

app.get('/urls', (req, res) => {
  const templateVars = {urls: urlDatabase};
  res.render("urls_index", templateVars);
});
app.post("/urls", (req, res) => {
  const urlKey = generateRandomString();
  urlDatabase[urlKey] = req.body.longURL;
  res.redirect(`/urls/${urlKey}`);
  // res.redirect(urlDatabase[urlKey]); 
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/urls/:shortURL", (req, res) => {
  console.log(req.params);
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  res.render("urls_show", templateVars);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/home", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
