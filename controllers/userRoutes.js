const router = require('express').Router();
const { User } = require('../models');
const generator = require('generate-password');
const withAuth = require('../utils/auth');
const bcrypt = require('bcrypt');

router.get('/:id', withAuth, async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          id: req.session.user_id,
        },
      });

      const userValues = user.dataValues;
      const checkCustomer = user.is_customer == 1 ? true : false;
  
      res.render('editprofile', {
        checkCustomer,
        logged_in: req.session.logged_in,
        userValues,
      });
    }
    catch (err) {
      res.status(400).json(err);
    }
  });


  // Updates user info
  router.put('/:id', withAuth, async (req, res) => {
    try {
        const userCurrent = await User.findOne({
            where: {
              id: req.session.user_id,
            },
          });

        if (req.body.username == "" | req.body.username == userCurrent.username) {
            req.body.username = userCurrent.username;
    
          }

        if (req.body.role_id == "" | req.body.role_id == userCurrent.role_id) {
          req.body.role_id = userCurrent.role_id;
  
        }

          
        if (req.body.picture == '' | req.body.picture == userCurrent.picture) {
            req.body.picture = userCurrent.picture;
    
        }
              
        if (req.body.email == '' | req.body.email == userCurrent.email) {
            req.body.email = userCurrent.email;
        }
    
        if (req.body.password == '' | req.body.password == userCurrent.password) {
            req.body.password = userCurrent.password;

        }
        else {
           req.body.password = await bcrypt.hash(req.body.password, 10);
        }

      const thisUser = await User.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      
      if (!thisUser) {
        res.status(404).json({
          message: 'No user found with this id!'
        });
        return;
      }
  
      res.status(200).json(thisUser);
    }
    catch (err) {

      res.status(500).json(err);
    }
  });

// Generate a password and send it in the server response
router.get('/signup/genpass', async (_req, res) => {
    const generatePassword = () => {
        let generatedPassword = generator.generate({
          length: 10,
          numbers: true,
          uppercase: true,
          lowercase: true,
        });
        return generatedPassword;
      };

    try {
        const password = await generatePassword();
        res.send(password);
    }

    catch (err) {
        
        res.status(400).json(err);
    }
});

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
                email: req.body.email
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