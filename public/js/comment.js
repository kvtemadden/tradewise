const postComment = async (event) => {
  event.preventDefault();

  var comment = document.querySelector('#comment').innerHTML;
  var id = window.location.href.toString().split('jobs/')[1];


    const response = await fetch("/jobs/" + id, {
      method: 'POST',
      body: JSON.stringify({
        job_id: id,
        content: comment
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    //adds to db.json
    if (response.ok) {
      toastr.info('Reply posted!');
      location.reload();
      return false;
    
    } else {
      toastr.info('Failed to post comment');
    }
};

document.querySelector('#submit-comment').addEventListener('click', postComment);
