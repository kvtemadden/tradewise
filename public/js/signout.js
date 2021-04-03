const signout = async () => {
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

document.querySelector('#signout').addEventListener('click', signout);
