const router = require('express').Router();
const { Job, User } = require('../models');
const withAuth = require('../utils/auth');

// Main landing page for all traffic
router.get('/', (req, res) => {
    res.render('homepage');
});

// Main route for logged in users - loading jobs
// router.get('/home', withAuth, async (req, res) => {
//     try {
//         const jobData = await Job.findAll({
//             order: [['date_created', 'ASC']],
//             include: [
//                 {
//                     model: User,
//                     attributes: ['id', 'name']
//                 },
//             ]
//         });

//         const jobs = jobData.map((job) => job.get({ plain: true }));

//         res.render('homepage', {
//             jobs,
//             logged_in: req.session.logged_in,
//         });
//     }
//     catch (err) {
//         res.status(500).json(err);
//     }
// });


// Login or signup route / redirect page for users not logged in
router.get('/login', (req, res) => {

    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// Dashboard route which shows user's own job postings (if any) || must be logged in.
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userJobs = await Job.findAll({
            where: { user_id: req.session.user_id },
            order: [['date_created', 'ASC']],
        });

        const myJobs = userJobs.map((job) => job.get({ plain: true }));

        res.render('dashboard', {
            myJobs,
            logged_in: req.session.logged_in,
        });

    }
    catch (err) {
        res.status(500).json(err);
    }
});