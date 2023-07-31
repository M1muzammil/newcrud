
function submitProfile() {
  let username = document.getElementById("username").value;
  let bio = document.getElementById("bio").value;
  let phone = document.getElementById("phone").value;
  let passion = document.getElementById("passion").value;
  let hobby = document.getElementById("hobby").value;

  axios.post(`/api/v1/profile`, {
    username: username,
    bio: bio,
    phone: phone,
    passion: passion,
    hobby: hobby,
  })
    .then(function (response) {
      alert("Profile added successfully");
      renderProfile();
    })
    .catch(function (error) {
      alert("Problem in profile submission. Please fill the input fields.");
    });

  // Clear the form fields after submission
  document.getElementById("username").value = "";
  document.getElementById("bio").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("passion").value = "";
  document.getElementById("hobby").value = "";
}

// Function to render all profiles
function renderProfile() {
  axios.get('/api/v1/profiles')
    .then(function (response) {
      let profiles = response.data;
      let profilecontainer = document.querySelector(".result");
      profilecontainer.innerHTML = "";
      profiles = profiles.reverse();
      profiles.forEach(function (profile) {
        let maindiv = document.createElement("div");
        maindiv.className = "maindiv";
        profilecontainer.appendChild(maindiv);

        let row1 = document.createElement("div");
        row1.className = "row1";
        maindiv.appendChild(row1);

        let profileIcon = document.createElement("i");
        profileIcon.className = "bi bi-person-circle profile-icon";
        profileIcon.id = "profile1"
        row1.appendChild(profileIcon);
       


        let usernameElement = document.createElement("p");
        usernameElement.className = "user";
        usernameElement.textContent = profile.username;
        row1.appendChild(usernameElement);

        let bioElement = document.createElement("p");
        bioElement.className = "bio";
        bioElement.innerHTML = "BIO <br>" + profile.bio;
        maindiv.appendChild(bioElement);

        let phoneElement = document.createElement("p");
        phoneElement.innerHTML = "contact <br>" + profile.phone;
        phoneElement.className = "bio";
        maindiv.appendChild(phoneElement);

        let passionElement = document.createElement("p");
        passionElement.className = "bio";
        passionElement.innerHTML = "passion <br>" + profile.passion;
        maindiv.appendChild(passionElement);

        let hobbyElement = document.createElement("p");
        hobbyElement.className = "bio";
        hobbyElement.innerHTML = "Hobby <br>" + profile.hobby;
        maindiv.appendChild(hobbyElement);

        let row3 = document.createElement("div");
        row3.className = "row3";
        maindiv.appendChild(row3);

        const editButton = document.createElement("button");
        editButton.className = "btn btn-warning btn-sm button";
        editButton.id = "button";
        editButton.innerHTML = "<i class='bi bi-pencil'></i>";
        row3.appendChild(editButton);
        editButton.addEventListener("click", function (event) {
          let profileId = profile.id;
          editProfile(profileId);
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-danger btn-sm button";
        deleteButton.id = "button";
        deleteButton.innerHTML = "<i class='bi bi-trash-fill'></i>";
        row3.appendChild(deleteButton);
        deleteButton.addEventListener("click", function (event) {
          let profileId = profile.id;
          deleteProfile(profileId);
        });

        profilecontainer.appendChild(maindiv);
      });
    })
    .catch(function (error) {
      alert("Error fetching profiles.");
    });
}


function editProfile(profileId) {
  axios.get(`/api/v1/profile/${profileId}`)
    .then(function (response) {
      let profile = response.data;

      // Use SweetAlert dialogs to get the updated profile details from the user
      Swal.fire({
       
        html:
          `<div class = "main">

         <input type="text" id="editedUsername" value="${profile.username}" class="swal2-input" required>
          <br/>
          <label for="editedBio">Bio:</label>
          <textarea id="editedBio" class="swal2-textarea" rows="3" required>${profile.bio}</textarea>
          <br/>
          <label for="editedPhone">Phone:</label>
          <input type="text" id="editedPhone" value="${profile.phone}" class="swal2-input" required>
          <br/>
          <label for="editedPassion">Passion:</label>
          <input type="text" id="editedPassion" value="${profile.passion}" class="swal2-input" required>
          <br/>
          <label for="editedHobby">Hobby:</label>
          <input type="text" id="editedHobby" value="${profile.hobby}" class="swal2-input" required></div>`,
        focusConfirm: false,
        preConfirm: () => {
          const editedUsername = Swal.getPopup().querySelector('#editedUsername').value;
          const editedBio = Swal.getPopup().querySelector('#editedBio').value;
          const editedPhone = Swal.getPopup().querySelector('#editedPhone').value;
          const editedPassion = Swal.getPopup().querySelector('#editedPassion').value;
          const editedHobby = Swal.getPopup().querySelector('#editedHobby').value;

          // If the user cancels any of the inputs or provides empty inputs, return a resolved promise
          if (
            editedUsername.trim() === "" ||
            editedBio.trim() === "" ||
            editedPhone.trim() === "" ||
            editedPassion.trim() === "" ||
            editedHobby.trim() === ""
          ) {
            return Swal.showValidationMessage('Please fill all the input fields');
          }

          // Perform the update using axios PUT request
          return axios.put(`/api/v1/profile/${profileId}`, {
            username: editedUsername,
            bio: editedBio,
            phone: editedPhone,
            passion: editedPassion,
            hobby: editedHobby,
          })
            .then(function (response) {
              Swal.fire('Profile updated', '', 'success');
              renderProfile();
            })
            .catch(function (error) {
              Swal.fire('Error updating profile', '', 'error');
            });
        }
      });
    })
    .catch(function (error) {
      Swal.fire('Error fetching profile details', '', 'error');
    });
}


// Function to handle the delete profile operation
function deleteProfile(profileId) {
  axios.delete(`/api/v1/profile/${profileId}`)
    .then(function (response) {
      alert("Profile deleted");
      renderProfile();
    })
    .catch(function (error) {
      alert("Error deleting profile");
    });
}

// Call renderProfile() initially to load the existing profiles when the page loads
document.addEventListener("DOMContentLoaded", function () {
  renderProfile();
});
