
const {login, register, recover} = require('../handlers/userservices.js')
// const express = require('express')
const Router = require('express').Router

module.exports.setupRouter= (app, db)=>{
    const router = new Router
    router.post('/login', login(db));
    router.post('/register', register(db));
    router.post('/reset', recover(db))
    app.use(router);
}