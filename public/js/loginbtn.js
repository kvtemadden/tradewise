const redirect = async (e) => {
e.preventDefault();
document.location.replace('/signin');
};

document.querySelector('#signin').addEventListener('click', redirect);
