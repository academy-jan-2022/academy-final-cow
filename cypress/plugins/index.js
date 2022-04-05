const cucumber = require("cypress-cucumber-preprocessor").default;
const dotenv = require('dotenv')

dotenv.config()

module.exports = (on, config) => {

  config.env.googleRefreshToken = process.env.GOOGLE_REFRESH_TOKEN
  config.env.googleClientId = process.env.REACT_APP_GOOGLE_CLIENTID
  config.env.googleClientSecret = process.env.REACT_APP_GOOGLE_CLIENT_SECRET
  on("file:preprocessor", cucumber());

  return config

};