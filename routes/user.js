const {
  login,
  register,
  recover,
  getGoogleUser,
  oAuth,
} = require("../controllers/userController.js");
const auth = require("../middleware/auth");
// const express = require('express')
const Router = require("express").Router;

module.exports.setupRouter = (app, db) => {
  const router = new Router();
  router.post("/login", login());
  router.post("/register", register());
//   router.post("/reset", recover());
  router.get("/googleAuth", oAuth());
  router.post("/getGoogleAuth", getGoogleUser());
  router.get('/home', (req, res)=>{
    res.send("This works just fine");
  })
  app.use(router);
};
