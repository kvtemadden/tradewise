const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#signin-username').value.trim();
  const password = document.querySelector('#signin-password').value.trim();

  if (username && password) {
    
    const response = await fetch('/user/login', {
      method: 'POST',
      body: JSON.stringify(
        { 
          username, 
          password 
        }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }
};

document.querySelector('.signin-btn').addEventListener('submit', loginFormHandler);
