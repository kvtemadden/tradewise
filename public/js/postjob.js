const updateJob = async (event) => {
  event.preventDefault();

  var title = document.querySelector('#newJobTitle').innerHTML;
  var description = document.querySelector('#newJobDescription').innerHTML;

    const response = await fetch("/jobs/new", {
      method: 'POST',
      body: JSON.stringify({
        jobTitle: title,
        jobDescription: description,
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      alert('Post created!');
      document.location.replace('/dashboard');
    
    } else {
      alert('Failed to create post');
    }
};

document.querySelector('#postJob').addEventListener('click', createJob);
