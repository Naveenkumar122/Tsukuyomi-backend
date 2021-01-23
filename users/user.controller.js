const express = require('express');
const userService = require('./user.service');
const authorize = require('middleware/authorize')
const Role = require('helpers/role');

const router = express.Router();

// routes
router.post('/login', authenticate);     // public route
router.post('/register',register);       //public route for creating member profile
router.get('/', authorize(Role.Admin),getAll);//admin only route

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

//function return all user protected route accessed by admins
function getAll(req,res,next){
    // only allow admins to access other user records
    if (req.user.role !== 'Admin') {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    userService.getAll()
        .then(result => result ? res.json(result) : res.json({ message: 'No records found' }))
        .catch(err => next(err));
  }