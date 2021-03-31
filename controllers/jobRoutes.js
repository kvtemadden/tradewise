const router = require('express').Router();
const { Job, Comment, User } = require('../models');
const withAuth = require('../utils/auth');


// Renders page to post a job
router.get('/jobs/new', withAuth, async (req, res) => {
  try {
    res.render('postJob');
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.post('/jobs/new', withAuth, async (req, res) => {
    try {
      const newJob = await Job.create({
  
      });
  
      res.status(200).json(newJob);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  