const express = require('express');
const router = express.Router();
const { houses } = require('./hostRouter');

// GET: Login Page
router.get('/login', (req, res) => {
  res.render('login', { pageTitle: 'Login', user: null, activeTab: 'login' });
});

// POST: Handle Login Logic
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'nareshgouttam@gmail.com' && password === '1234') {
    // Store user info in session
    req.session.user = {
      name: 'Naresh Gouttam',
      email: email
    };
    return res.redirect('/');
  }

  // Invalid login
  res.render('login', {
    pageTitle: 'Login',
    errorMessage: 'Invalid credentials',
    user: null,
    activeTab: 'login'
  });
});


// GET: Handle Logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Logout Error:", err);
      return res.redirect('/');
    }

    res.redirect('/');
  });
});


module.exports = { authRouter: router };
