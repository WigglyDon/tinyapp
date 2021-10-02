const bcrypt = require('bcryptjs');

function registerNewUser(id, email, inputPassword, database) {
  if (database[id]) {
    return false;
  }
  for (const user in database) {
    if (email === database[user].email) {
      return false;
    }
  }
  const password = bcrypt.hashSync(inputPassword, 10);  
  database[id] = {id, email, password};
  return true;
}

function validateLoginCredentials(email, password, database) {
  for (const user in database) {
    if (email === database[user].email) {
      if (bcrypt.compareSync(password, database[user].password)) {
        return true;
      }
    }
  }
  return false;
}

function getUserID(email, database) {
  for (const user in database) {
    if (email === database[user].email) {
      return database[user].id;
    }
  }
}

function urlsForUser(id, database) {
const ownedUrls = {};

for (const url in database) {
  if (database[url].owner === id) {
    ownedUrls[url] = database[url];
  }
}
return ownedUrls;
};

function generateRandomString() {
  return Math.random().toString(36).substr(2, 6);
}

module.exports = {
  registerNewUser,
  validateLoginCredentials,
  getUserID,
  urlsForUser,
  generateRandomString
}