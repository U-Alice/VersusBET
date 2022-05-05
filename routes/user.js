
const {login, register, recover} = require('../controllers/userController.js')
const auth = require('../middleware/auth')
// const express = require('express')
const Router = require('express').Router

module.exports.setupRouter= (app, db)=>{
    const router = new Router
    router.post('/login',login());
    router.post('/register', register());
    router.post('/reset', recover())
    app.use(router);
}