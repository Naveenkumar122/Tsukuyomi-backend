const express = require('express');
const AdLoanService = require('../AdLoan/AdLoan.service');
const authorize = require('middleware/authorize')
const Role = require('helpers/role');

const router = express.Router();

// routes
router.post('/entry',authorize(),entry);// authenticated users 
router.post('/updt',authorize(Role.Admin),updateByID);//admin only route
router.get('/', authorize(Role.Admin),getAll);//admin only route

module.exports = router;

function entry(req,res,next){
    if(req.user.sub !== req.body.id){
      return res.status(401).json({ message: 'Unauthorized' });
    }
    AdLoanService.entry(req.body)
        .then(() => res.status(201).json({ message: `${req.body.type} Request Updated` }))
        .catch(err => next(err));
}

function getAll(req,res,next){
  // only allow admins to access other user records
  if (req.user.role !== 'Admin') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  AdLoanService.getAll()
    .then(result => result ? res.json(result) : res.json({ message: 'No records found' }))
    .catch(err => next(err));
}

//to update the attendance record by its id
function updateByID(req, res, next) {
  //only admin can update the attendance record by id
  if (req.user.role !== 'Admin') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  //after authorization calling the update service
  AdLoanService.updateByID(req.body)
    .then(() => res.status(201).json({ message: ` Request Updated` }))
    .catch(err => next(err));
}
