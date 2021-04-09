const filterJobs = async (role_id) => {
      document.location.replace(`/dashboard/${role_id}`); 
};

var id = window.location.href.toString().split('dashboard/')[1];

if (id !== '') {
  document.querySelector('#filter-jobs').value = id;
}