function submitprofile() {

  
  let username = document.getElementById("username");
  let bio = document.getElementById("bio");
  let phone = document.getElementById("phone");
  let passion = document.getElementById("passion");
  let hobby = document.getElementById("hobby");
  let img = document.getElementById("img")
    axios.post(`/api/v1/profile`, {
      username: username.value,
      bio: bio.value,
      phone:phone.value,
      passion: passion.value,
      hobby: hobby.value,
      img: img.files[0],
    })
      .then(function (response) {
       
        alert("Profile added mmmmm");
        renderprofile();
      })
      .catch(function (error) {
        alert("Problem in profile submission please fill the input field");
      });
      username.value = "";
      bio.value = "";
      phone.value = "";
      passion.value = "";
      hobby.value = "";
      img.files[0] = "";
    
  }

  function renderprofile() {
    axios.get('/api/v1/profiles') // Corrected the URL
      .then(function (response) {
        let profile = response.data; 
        let profilecontainer = document.querySelector(".result"); // Corrected variable name
        profilecontainer.innerHTML = ""; // Clear the container before appending new profiles
  
        profile.forEach(function (profile) { // Corrected variable name to 'profiles'
          let maindiv = document.createElement("div");
          maindiv.className = "maindiv";
          profilecontainer.appendChild(maindiv);
  
          let row1 = document.createElement("div");
          row1.className = "row1";
          maindiv.appendChild(row1);
  
          let imageElement = document.createElement("img");
          imageElement.src = URL.createObjectURL(profile.img);
          imageElement.alt = "Profile Image";
          imageElement.className = "imageelement";
          imageElement.width = 60;
          imageElement.height = 50;
          row1.appendChild(imageElement);
  
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
            let profileId = profile.id; // Assuming the profile object has an 'id' property
            editprofile(profileId);
          });
  
          const deleteButton = document.createElement("button");
          deleteButton.className = "btn btn-danger btn-sm button";
          deleteButton.id = "button";
          deleteButton.innerHTML = "<i class='bi bi-trash-fill'></i>";
          row3.appendChild(deleteButton);
          deleteButton.addEventListener("click", function (event) {
            let profileId = profile.id; // Assuming the profile object has an 'id' property
            deleteprofile(profileId);
          });
  
          profilecontainer.appendChild(maindiv);
        });
      })
      .catch(function (error) {
        alert("Error fetching profiles.");
      });
  } // Added the closing braces for the 'if' block
  




  // Function to handle the edit profile operation
function editprofile(profileId) {
  axios.get(`/api/v1/profile/${profileId}`)
    .then(function (response) {
      let profile = response.data;

      // Use prompt dialogs to get the updated profile details from the user
      let editedprofile = prompt("Enter the updated profile name:", profile.profile);
      let editedPrice = prompt("Enter the updated price:", profile.price);

      // If the user cancels any of the prompts or provides empty inputs, do not proceed with the update
      if (editedprofile === null || editedprofile.trim() === "" || editedPrice === null || editedPrice.trim() === "") {
        return;
      }

      // Perform the update using axios PUT request
      axios.put(`/api/v1/profile/${profileId}`, {
        profile: editedprofile,
        price: editedPrice,
      })
        .then(function (response) {
          alert("profile updated");
          renderprofile();
        })
        .catch(function (error) {
          alert("Error updating profile");
        });
    })
    .catch(function (error) {
      alert("Error fetching profile details");
    });
}

// function submitprofile() {
//   let username = document.getElementById("username").value;
//   let bio = document.getElementById("bio").value;
//   let phone = document.getElementById("phone").value;
//   let passion = document.getElementById("passion").value;
//   let hobby = document.getElementById("hobby").value;
//   let img = document.getElementById("img").files[0];

//   if (!username || !bio || !phone || !passion || !hobby || !img) {
//     alert("Please fill all input fields.");
//     return;
//   }

//   // Use FormData to send form data properly
//   let formData = new FormData();
//   formData.append("username", username);
//   formData.append("bio", bio);
//   formData.append("phone", phone);
//   formData.append("passion", passion);
//   formData.append("hobby", hobby);
//   formData.append("img", img);

//   axios.post(`/api/v1/profile`, formData)
//     .then(function (response) {
//       alert("Profile added successfully");
//       renderprofile();
//     })
//     .catch(function (error) {
//       alert("Problem in profile submission. Please try again.");
//     });

//   // Clear the form fields after submission (except for the file input)
//   document.getElementById("username").value = "";
//   document.getElementById("bio").value = "";
//   document.getElementById("phone").value = "";
//   document.getElementById("passion").value = "";
//   document.getElementById("hobby").value = "";
// }


// function renderprofile() {
//   axios.get('/api/v1/profiles')
//   .then(function (response) {
//     let profiles = response.data;
//     let profilecontainer = document.querySelector(".result");
//     profilecontainer.innerHTML = "";

//     profiles.forEach(function (profile) {
//       let maindiv = document.createElement("div");
//       maindiv.className = "maindiv";
//       profilecontainer.appendChild(maindiv);

//       let row1 = document.createElement("div");
//       row1.className = "row1";
//       maindiv.appendChild(row1);

//       let imageElement = document.createElement("img");
//       imageElement.src = URL.createObjectURL(profile.img);
//       imageElement.alt = "Profile Image";
//       imageElement.className = "imageelement";
//       imageElement.width = 60;
//       imageElement.height = 50;
//       row1.appendChild(imageElement);

//       let usernameElement = document.createElement("p");
//       usernameElement.className = "user";
//       usernameElement.textContent = profile.username;
//       row1.appendChild(usernameElement);

//       let bioElement = document.createElement("p");
//       bioElement.className = "bio";
//       bioElement.innerHTML = "BIO <br>" + profile.bio;
//       maindiv.appendChild(bioElement);

//       let phoneElement = document.createElement("p");
//       phoneElement.innerHTML = "contact <br>" + profile.phone;
//       phoneElement.className = "bio";
//       maindiv.appendChild(phoneElement);

//       let passionElement = document.createElement("p");
//       passionElement.className = "bio";
//       passionElement.innerHTML = "passion <br>" + profile.passion;
//       maindiv.appendChild(passionElement);

//       let hobbyElement = document.createElement("p");
//       hobbyElement.className = "bio";
//       hobbyElement.innerHTML = "Hobby <br>" + profile.hobby;
//       maindiv.appendChild(hobbyElement);

//       let row3 = document.createElement("div");
//       row3.className = "row3";
//       maindiv.appendChild(row3);

//       const editButton = document.createElement("button");
//       editButton.className = "btn btn-warning btn-sm button";
//       editButton.id = "button";
//       editButton.innerHTML = "<i class='bi bi-pencil'></i>";
//       row3.appendChild(editButton);
//       editButton.addEventListener("click", function (event) {
//         let profileId = profile.id;
//         editprofile(profileId);
//       });

//       const deleteButton = document.createElement("button");
//       deleteButton.className = "btn btn-danger btn-sm button";
//       deleteButton.id = "button";
//       deleteButton.innerHTML = "<i class='bi bi-trash-fill'></i>";
//       row3.appendChild(deleteButton);
//       deleteButton.addEventListener("click", function (event) {
//         let profileId = profile.id;
//         deleteprofile(profileId);
//       });

//       profilecontainer.appendChild(maindiv);
//     });
//   })
//   .catch(function (error) {
//     alert("Error fetching profiles.");
//   });
// }









// // Function to handle the delete profile operation
// function deleteprofile(profileId) {
//   axios.delete(`/api/v1/profile/${profileId}`)
//     .then(function (response) {
//       alert("profile deleted");
//       renderprofile();
//     })
//     .catch(function (error) {
//       alert("Error deleting profile");
//     });
// }

// // Call renderprofile() initially to load the existing profiles when the page loads
// document.addEventListener("DOMContentLoaded", function () {
//   renderprofile();
// });