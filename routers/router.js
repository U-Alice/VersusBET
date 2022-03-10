
const {login, register} = require('../handlers/userservices.js')
// const express = require('express')
const Router = require('express').Router

module.exports.setupRouter= (app, db)=>{
    const router = new Router
    router.post('/login', login(db));
    router.post('/register', register(db));
    app.use(router);
}