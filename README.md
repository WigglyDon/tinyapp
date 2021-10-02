# TinyApp

This project is built on Node and Express. It is intended to be a very stripped down clone of bit.ly, with the goal of training me on the back end of full stack web development.

TinyApp is my first full stack web application. I started and finished this project within my third week attending Lighthouse Labs. I have very minimal programming experience prior to starting school here; so keep that in mind when criticising the simplicity and/or lack of visual taste when evaluating this project from the future! Note: Front end development starts next week and I would like to beautify the app in the future when I have more time.

The most impressive aspect of this project is the server-side infastructure which handles the protection of user information through the use of both:

salted hashing algorithms: user passwords are NEVER stored in plain-text at any point. This is vastly superior to standard password encryption because the algorithm used to hash the data is impossible* to reverse, meaning this is a one way data transformation. When a password is submitted there is no chance of it being leaked, because it simply does not exist on the database (technically it does, but it is a garbled string of nonsense, if you're curious about this and how to protect your users from database breaches I highly recommend reading this https://plaintextoffenders.com/faq/devs).

signed cookie encryption: while not as advanced or secure as the above concept; cookie encryption prevents any malicious users from manipulating their browser cookies in order to impersonate another user and affect their data. A basic feature to implement, however completely essential in any project that incorporates "user-priveledge"; where each user has a different set of data to manipulate that is independant and private to the other users of the platform.


## Final Product

!["user registration form"](https://github.com/WigglyDonnie/tinyapp/blob/master/docs/registration-form.png?raw=true)

!["url editing page"](https://github.com/WigglyDonnie/tinyapp/blob/master/docs/url-edit.png?raw=true)

!["homepage which displays all urls the user has submitted"](https://github.com/WigglyDonnie/tinyapp/blob/master/docs/urls-homepage.png?raw=true)

## Dependencies

- Node.js
- Express
- EJS
- bcrypt
- body-parser
- cookie-session

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `node express_server.js` command.
