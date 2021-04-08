const router = require('express').Router();
const { Job, Comment, User } = require('../models');
const withAuth = require('../utils/auth');


// Renders page to post a job
router.get('/new', withAuth, async (req, res) => {
  try {
    res.render('postJob', {
      logged_in: req.session.logged_in,
    });
  }
  catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Creating a new job record
router.post('/new', withAuth, async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.session.user_id,
      },
    });

    const newJob = await Job.create({
      title: req.body.jobTitle,
      description: req.body.jobDescription,
      user_id: req.session.user_id,
      role_id: user.role_id,
    });

    console.log(req.session);

    res.status(200).json(newJob);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

// Deleting a job record
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deleteJob = await Job.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteJob) {
      res.status(404).json({
        message: 'No job found with this id!'
      });
      return;
    }

    res.status(200).json(deleteJob);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// Updating a job record
router.put('/:id', withAuth, async (req, res) => {
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
        message: 'No job found with this id!'
      });
      return;
    }

    res.status(200).json(newJob);
  }
  catch (err) {
    res.status(500).json(err);
  }
});


// ------------ Routes for Single Job Page -------------

// Gets single job page and comments
router.get('/:id', withAuth, async (req, res) => {
  try {
    const jobData = await Job.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Comment,
          attributes: ['id', 'content', 'job_id', 'user_id', 'date_created'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }],
    });

    if (!jobData) {
      res.status(404).json(
        {
          message: 'No job found with this id!'
        });
      return;
    }

    const job = jobData.get({ plain: true });

    res.render('singleJob', {
      job,
      logged_in: req.session.logged_in,
    });

    res.status(200);
  }
  catch (err) {
    res.status(500).json(err);
  }
});


// New comments
router.post('/:id', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      job_id: req.body.job_id,
    });

    res.status(200).json(newComment);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
