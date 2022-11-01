//Global Variables
const galleryContainer = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
let employeeData = [];
let card = document.querySelector('.card');

/** 
* Display 12 Random Users
* @param {usersInfo} grabs data from the API request
*/
const userData = (usersInfo) => {

    let userHTML = '';

    usersInfo.forEach((user, index) => {
        employeeData.push(user);
        let name = user.name;
        let email = user.email;
        let city = user.location.city;
        let state = user.location.state;
        let picture = user.picture;

        userHTML +=`
        <div class = "card" data-index = "${index}">
            <div class="card-img-container">
            <img class="card-img" src="${picture.medium}" alt="profile picture">
        </div>
        <div class="card-info-container">
        <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
        <p class="card-text">${email}</p>
        <p class="card-text cap">${city} ${state}</p>
         </div>
        `
})
    gallery.innerHTML = userHTML;
    console.log(employeeData)
}
// FETCH requests data from Random User API
fetch('https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US')
    .then((response) => response.json())
    .then(response => response.results)
    .then(userData)
    .catch(err => console.log(err))

//Create a Modal Window
//const index = card.getAttribute('data-index')
function displayModal (index) {
    
    let {name, dob, phone, email, location: {city, street, state, postcode}, picture } = employees[index];
    
    let date = new Date(dob.date);
    date.toLocaleDateString();

    const modalInfo = document.querySelector('.modal-info-container');
    modalInfo.innerHTML = '';

    const modalHTML=`
                <img class="modal-img" src="${picture.medium}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
                <p class="modal-text">${email}</p>
                <p class="modal-text cap">${city}, ${state}</p>
                <hr>
                <p class="modal-text">${phone}</p>
                <p class="modal-text">${street.number} ${street.name}, ${city}, ${state}, ${postcode}  </p>
                <p Birthday: ${date.getDate()}/${date.getFullYear()}</p>
            </div>
        </div>
        </div>`;

    modalInfo.innerHTML = modalHTML;
    }

//Close the Modal Window
