const logout = async () => {
  const response = await fetch('/user/signout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/signin');
  } 
  else {
    alert('Failed to log out');
  }
};

document.querySelector('#logout').addEventListener('submit', logout);
