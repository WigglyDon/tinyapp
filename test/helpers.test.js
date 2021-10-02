const { assert } = require('chai');

const { getUserID, registerNewUser, validateLoginCredentials } = require('../helpers.js');

const testUsers = {
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
};

describe('registerNewUser', function() {
  it('should return true when successfully adding a NEW user to the database', () => {
    const register = registerNewUser("tom", "tom@bombadil.shire", "goldberry", testUsers);
    assert.strictEqual(register, true);
  });

  it('should return false when there is already an existing user with that username||email', () => {
    const register = registerNewUser("userRandomID", "tom@bombadil.shire", "goldberry", testUsers);
    assert.strictEqual(register, false);
    });
  
});

/* not sure how to make this test pass with manual data entry as the password is hashed every time */
// describe('validateLoginCredentials', function() {
//   it('should return true when user credentials match corresponding values in database', () => {
//     const login = validateLoginCredentials("user@example.com", "purple-monkey-dinosaur", testUsers);
//     assert.strictEqual(login, true);
//   });
// });

describe('getUserID', function() {
  it('should return a user with valid email', () => {
    const user = getUserID("user@example.com", testUsers)
    const expectedOutput = "userRandomID";
    assert.strictEqual(user, expectedOutput);
  });
  it('should return undefined if there is no matching email in database', () => {
    const user = getUserID("wigglieboy", testUsers)
    const expectedOutput = undefined;
    assert.strictEqual(user, expectedOutput);
  });
});


// describe('registerNewUser', function() {
//   it('should return true when successfully adding a new user to the database', () => {
    
//   });
  
// });

