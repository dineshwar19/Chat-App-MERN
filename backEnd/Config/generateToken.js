const jwt = require("jsonwebtoken");
/* 
it is an open standard that allows for the secure transmission of information between parties(clien and server) as a JSON object and authenticating clients who want to access the APIs.
In its compact form, JSON Web Tokens consist of three parts separated by dots (.), which are:
Header
Payload
Signature
ex. xxxxx.yyyyy.zzzzz
*/
const generateToken = (id) => {
  //This method takes three arguments, a payload, a token secret, and a configuration object.
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
