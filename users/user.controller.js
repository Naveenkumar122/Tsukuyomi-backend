const express = require('express');
const userService = require('./user.service');
const authorize = require('middleware/authorize')
const Role = require('helpers/role');

const router = express.Router();

// routes
router.post('/login', authenticate);     // public route
router.post('/register',register);       //public route for creating member profile

//exporting router for users module
module.exports = router;
function authenticate(req,res,next){
    userService.authenticate(req.body)
         .then(user => user ? res.status(200).json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
         .catch(err => next(err));
}

//function to create user profile and the auth record for the profile
function register(req,res,next){
    userService.create(req.body)
         .then(() => res.status(201).json({message:"profile created"}))
         .catch(err => next(err));
}