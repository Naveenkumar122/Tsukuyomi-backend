const express = require('express');
const attService = require('./attendance.service');
const authorize = require('middleware/authorize')
const Role = require('helpers/role');

const router = express.Router();

// routes
router.get('/:id',authorize(), getById);//authenticated route
router.get('/', authorize(Role.Admin),getAll);//admin only route
router.post('/updt',authorize(Role.Admin),updateByID);//admin only route
router.post('/entry', entry);// public route

//exporting router for attendance module
module.exports = router;

function entry(req,res,next){
    attService.entry(req.body)
        .then(() => res.status(201).json({message:"Attendance Updated"}))
        .catch(err => next(err));
}

//function to get data by id
function getById(req,res,next){
    const currentUser = req.user;
    const id = req.params.id;

    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== 'Admin') {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    attService.getByIdtoDay(req.params.id)
        .then(result => result ? res.json(result) : res.json({ message: 'not updated' }))
        .catch(err => next(err));
}

//get all attendance records
function getAll(req,res,next){
    // only allow admins to access other user records
    if (req.user.role !== 'Admin') {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    attService.getAll()
        .then(result => result ? res.json(result) : res.json({ message: 'No records found' }))
        .catch(err => next(err));
}

//to update the attendance record by its id
function updateByID(req,res,next){
    //only admin can update the attendance record by id
    if(req.user.role !== 'Admin'){
        return res.status(401).json({ message: 'Unauthorized' });
    }
    //after authorization calling the update service
    attService.updateByID(req.body)
    .then(() => res.status(201).json({message:"Attendance Record Updated"}))
    .catch(err => next(err));
}