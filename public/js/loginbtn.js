const redirect = async (e) => {
e.preventDefault();
document.location.replace('/login');
};

document.querySelector('#signin').addEventListener('click', redirect);
