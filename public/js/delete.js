const deleteJob = async (event) => {
  event.preventDefault();
  
  var id = window.location.href.toString().split('jobs/')[1];

  if (id.includes("edit/")) {
    id = id.split('edit/')[1];
  }

    const response = await fetch("/jobs/" + id, {
      method: 'DELETE',
      body: JSON.stringify({
        id: id
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      alert('Job deleted!');
      document.location.replace('/dashboard');
    
    } else {
      alert('Failed to deleted job');
    }
};


document.querySelector('#delete').addEventListener('click', deleteJob);
