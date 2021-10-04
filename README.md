# TinyApp

This project was built upon [Node](https://nodejs.org/en/) and [Express](https://expressjs.com/). In essence it is the exact same thing as a traditional URL shortener, however, much more watered down with the goal of training me on the back end of full stack web development.

This is my very first full stack web application! I started and finished this project within my third week attending Lighthouse Labs. I have very minimal programming experience prior to starting school here; so when evaluating this in the future I would ask that you *please* keep that in mind :) 




The most impressive aspect of this project is the server-side infrastructure which handles the protection of user information through the use of both:

**Salted Hashing Algorithms:** User passwords are *NEVER* stored in plain-text at any point. This is vastly superior to standard password encryption because the algorithm used to hash the data is impossible[*](https://plaintextoffenders.com/faq/devs) to reverse; meaning this is a *one way* data transformation! When a password is submitted, there is **NO** chance of it being leaked, because it simply does't exist in the database! Well... technically it *does*, but only in a form which is useless to anybody who manages to get their hands on it. If you're curious about this and how to protect your users from database breaches I highly recommend reading [this FAQ](https://plaintextoffenders.com/faq/devs).

**Signed Cookie Encryption:** While not as advanced or secure as the above concept; cookie encryption prevents any malicious users from manipulating their browser cookies in order to impersonate another user and affect their data. A basic feature to implement, however, completely essential in any project that incorporates user-unique data sets that are intended *only* for that user! [Wow!](https://www.youtube.com/watch?v=t8WaRX-sHTQ)


## v1.0.1 screenshots
###### Note: Front end development starts next week and I would like to beautify the app in the future when I have more time... so if you are reading this it means that you are witnessing the original version in all it's glory :D
#
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
