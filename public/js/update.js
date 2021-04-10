const updateJob = async (event) => {
  event.preventDefault();

  var id = window.location.href.toString().split('jobs/')[1];
 
  if (id.includes("edit/")) {
    id = id.split('edit/')[1];
  }

  var role_id = document.querySelector('#job-type').value;
  var title = document.querySelector('.jobPostTitle').innerHTML;
  var description = document.querySelector('.jobPostDesc').innerHTML;

    const response = await fetch("/jobs/edit/" + id, {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        title: title,
        description: description,
        role_id: role_id,
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      toastr.success('Post updated!');
      document.location.replace(`/jobs/${id}`);
    
    } else {
      toastr.error('Failed to update post');
    }
};

var jobCategory = document.getElementsByClassName('label')[0].id;

document.querySelector('#job-type').value = jobCategory;

document.querySelector('#updateJob').addEventListener('click', updateJob);
