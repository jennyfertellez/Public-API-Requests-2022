const galleryContainer = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');
let employeeData = [];

//Gallery Container
galleryContainer.innerHTML = `
<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form> `;

// FETCH requests data from Random User API
fetch('https://randomuser.me/api/?results=12&nat=US')
    .then((response) => response.json())
    .then(data => {
        employeeData = data.results
    })
    .then(() => userData(employeeData))

//Display 12 Random Users
function userData(data) {
    for (let i = 0; i < data.length; i++){
        const userCard =
        `<div class = "card">
            <div class="card-img-container">
             <img class="card-img" src="${data[i].picture.medium}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${data[i].name.first} ${data[i].name.last}</h3>
        <p class="card-text">${data[i].email}</p>
        <p class="card-text cap">${data[i].location.city} ${data[i].location.state}</p>
    </div>`;

    gallery.insertAdjacentHTML('beforeend', userCard);


    }
}

//Create a Modal Window
function displayModal (data) {
    console.log(employeeData)
    const modalContainer=
    `<div class = "modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${data.picture.medium}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
                <p class="modal-text">${data.email}</p>
                <p class="modal-text cap">${data.location.city}, ${data.location.state}</p>
                <hr>
                <p class="modal-text">${data.cell}</p>
                <p class="modal-text">${data.location.street.number} ${data.location.street.name}, ${data.location.city}, ${data.location.state}, ${data.location.postCode}  </p>
                <p class="modal-text">${data.dob.date}</p>
            </div>
        </div>
        </div>`;

    gallery.insertAdjacentHTML('beforeend', modalContainer);
    }

//Close the Modal Window
