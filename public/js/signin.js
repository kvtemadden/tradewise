// Handles on-click event for the login page
const loginFormHandler = async (e) => {
  e.preventDefault();

  // Retrieve values from the login form
  const email = document.querySelector('#signin-email').value.trim();
  const password = document.querySelector('#signin-password').value.trim();

  if (email && password) {
    // Send POST request to the 'user' endpoint
    const response = await fetch('/user/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect user to dashboard page
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

// Handles on-click event for the signup page
const signupFormHandler = async (e) => {
  e.preventDefault();

  const username = document.querySelector('#signup-username').value.trim();
  const email = document.querySelector('#signup-email').value.trim();
  const password = document.querySelector('#signup-password').value.trim();
  const role_id = document.querySelector('#signup-role').value.trim();
  const is_customer = role_id == 1 ? true : false;

  if (username && email && password && role_id) {
    // Send POST request to the 'user' endpoint
    const response = await fetch('/user/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password, role_id, is_customer }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect user to dashboard page
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

// Listen out for a form submission on the signin.handlebars page
// If form is submitted then execute the function(s) above
document
  .querySelector('.signin-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

