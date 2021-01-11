const express = require('express');
const attService = require('./attendance.service');
const authorize = require('middleware/authorize')
const Role = require('helpers/role');

const router = express.Router();

// routes
router.post('/entry', entry);// public route

//exporting router for attendance module

module.exports = router;

function entry(req,res,next){
    attService.entry(req.body)
        .then(() => res.status(201).json({message:"Attendance Updated"}))
        .catch(err => next(err));
}