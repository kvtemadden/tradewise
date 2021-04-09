const updateProfile = async (event) => {
  event.preventDefault();

  var id = window.location.href.toString().split('user/')[1];
 
  if (id.includes("edit/")) {
    id = id.split('edit/')[1];
  }

  var picture = document.querySelector('#newPicture').innerHTML;
  var username = document.querySelector('#newUsername').innerHTML;
  var email = document.querySelector('#newEmail').innerHTML;
  var password = document.querySelector('#newPassword').innerHTML;

    const response = await fetch("/user/" + id, {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        picture: picture,
        username: username,
        password: password,
        email: email,
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      alert('Profile updated!');
      document.location.replace(`/dashboard`);
    
    } else {
      alert('Failed to update profile');
    }
};

const picturePreview = async (event) => {
  event.preventDefault();

  var imgSrc = document.querySelector('#newPicture').innerHTML;

  if (!imgSrc) {
    document.querySelector('#newPicture').style.borderColor = "red";
    return
  }

  var profilePicture = document.querySelector('#profile-pic');
  
  profilePicture.src = imgSrc;

}

document.querySelector('#updateProfile').addEventListener('click', updateProfile);
document.querySelector('#preview').addEventListener('click', picturePreview);