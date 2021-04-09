const loginForm = async (e) => {
  e.preventDefault();

  const email = document.querySelector('#signin-email').value.trim();
  const password = document.querySelector('#signin-password').value.trim();

  if (email && password) {
    const response = await fetch('/user/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      toastr.info(response.statusText);
    }
  }
};

const checkPassword = () => {
  let passwordInput = document.querySelector('#signup-password').value;
  if (passwordInput.length < 8) {
    toastr.info('Please choose a password that is at least 8 characters long');
  }
  return;
}

const generatePassword = async (e) => {
  e.preventDefault();
    fetch('/user/signup/genpass', {
      method: 'GET',
    }).then(async response => {
      if (response.ok) {
        let password = await response.text();
        document.querySelector('#signup-password').value = password;
      } else {
        toastr.info(response.statusText);
      }
    })
};

document
  .querySelector('#signup-role')
  .addEventListener('change', (e) => {
    e.preventDefault();
    let passwordInput = document.querySelector('#signup-password');
    if (passwordInput.value != '') {
      passwordInput.setAttribute('type', 'password');
    }
    if (passwordInput.value.length < 8) {
      toastr.info('Please choose a password that is at least 8 characters long');
      passwordInput.value = '';
    }
    return;
  })

const signupForm = async (e) => {
  e.preventDefault();
  checkPassword();
  const username = document.querySelector('#signup-username').value.trim();
  const email = document.querySelector('#signup-email').value.trim();
  const password = document.querySelector('#signup-password').value.trim();
  const role_id = document.querySelector('#signup-role').value.trim();
  const is_customer = role_id == 1 ? true : false;

  if (username && email && password && role_id) {
    const response = await fetch('/user/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password, role_id, is_customer }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      toastr.info(response.statusText);
    }
  }
};

document
  .querySelector('.signin-form')
  .addEventListener('submit', loginForm);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupForm);

document
  .querySelector('#gen')
  .addEventListener('click', generatePassword);