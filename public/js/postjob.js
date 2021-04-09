const createJob = async (event) => {
  event.preventDefault();
  
  var role_id = document.querySelector('#job-type').value; 
  var title = document.querySelector('#newJobTitle').innerHTML;
  var description = document.querySelector('#newJobDescription').innerHTML;

    const response = await fetch("/jobs/new", {
      method: 'POST',
      body: JSON.stringify({
        role_id: role_id,
        jobTitle: title,
        jobDescription: description,
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      toastr.success('Post created!');
      document.location.replace('/dashboard');
    
    } else {
      toastr.error('Failed to create post');
    }
};

document.querySelector('#postJob').addEventListener('click', createJob);
