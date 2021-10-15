module.exports = app => {
  const laserhelp = require("../controllers/laserhelp.controller.js");

  app.post("/api/signup", laserhelp.signUp);
  app.post("/api/login", laserhelp.logIn);
};
