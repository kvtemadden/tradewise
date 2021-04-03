
const router = require('express').Router();
const { User } = require('../models');


// Signing up a user for an account
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    }

    catch (err) {
        res.status(400).json(err);
    }
});

// Allowing existing users to login if they have an account. 
router.post('/signin', async (req, res) => {

    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        // If user's email isn't an account
        if (!userData) {
            res.status(400).json({ message: 'User does not exist, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        // If user's password is incorrect
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password, please try again' });
            return;
        }

        // If all okay, save session & log user in
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ 
                user: userData, 
                message: 'You are now logged in!' 
            });
        });

    } 
    catch (err) {
        res.status(400).json(err);
    }
});

// When a user logs out, destroy session
router.post('/signout', (req, res) => {
    
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } 
    else {
        res.status(404).end();
    }
});

module.exports = router;
