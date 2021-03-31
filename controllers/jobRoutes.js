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

// Creating a new job record
router.post('/jobs/new', withAuth, async (req, res) => {
    try {
      const newJob = await Job.create({
        title: req.body.jobTitle,
        description: req.body.jobDescription,
        user_id: req.session.user_id,
        role_id: req.body.role_id
      });
  
      res.status(200).json(newJob);
    } 
    catch (err) {
      res.status(400).json(err);
    }
  });

// Deleting a job record
router.delete('/jobs/:id', withAuth, async (req, res) => {
    try {
        const deleteJob = await Job.destroy({
        where: {
            id: req.params.id,
        },
      });

    if (!deleteJob) {
        res.status(404).json({ 
            message: 'No blog found with this id!' 
        });
        return;
    }

    res.status(200).json(deleteJob);
    } 
    catch (err) {
    res.status(500).json(err);
    }
});
  
router.put('/jobs/:id', withAuth, async (req, res) => {
    try {
      const newJob = await Job.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
  
      newJob.title = req.body.jobTitle;
      newJob.description = req.body.jobDescription;
  
      if (!newJob) {
        res.status(404).json({ 
            message: 'No blog found with this id!'
        });
        return;
      }
  
      res.status(200).json(newJob);
    } 
    catch (err) {
      res.status(500).json(err);
    }
  });