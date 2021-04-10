const redirect = async (e) => {
    e.preventDefault();
    document.location.replace('/jobs/new');
};

const redirect2 = async (e) => {
    e.preventDefault();
    document.location.replace('/dashboard');
};

document.querySelector('#postjob').addEventListener('click', redirect);
document.querySelector('#findjob').addEventListener('click', redirect2);
