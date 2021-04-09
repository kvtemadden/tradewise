const updateJob = async (event) => {
  event.preventDefault();
  debugger;
  var id = window.location.href.toString().split('jobs/')[1];
 
  if (id.includes("edit/")) {
    id = id.split('edit/')[1];
  }

  var title = document.querySelector('.jobPostTitle').innerHTML;
  var description = document.querySelector('.jobPostDesc').innerHTML;

    const response = await fetch("/jobs/edit/" + id, {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        title: title,
        description: description,
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


document.querySelector('#updateJob').addEventListener('click', updateJob);
