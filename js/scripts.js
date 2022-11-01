//Global Variables
const galleryContainer = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');
const modalContainer = document.querySelector(".modal-container");
const modalClose = document.querySelector(".modal-close-btn");
let employeeData = [];
let card = document.querySelector('.card');

/** 
* Display 12 Random Users
* @param {usersInfo} grabs data from the API request
*/
const userData = (usersInfo) => {

    usersInfo.forEach((user, index) => {
        employeeData.push(user);
        let name = user.name;
        let email = user.email;
        let city = user.location.city;
        let state = user.location.state;
        let picture = user.picture;

        const userHTML =`
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
        gallery.insertAdjacentHTML('beforeend', userHTML);
    })
}

// FETCH requests data from Random User API
fetch('https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US')
    .then((response) => response.json())
    .then(response => response.results)
    .then(userData)
    .catch(err => console.log(err))

//Create a Modal Window
function displayModal(index) {
//Using object destructuring to make cleaner object literals
    let {name, dob, phone, email, location: {city, street, state, postcode}, picture } = employeeData[index];
//Date Setup to ensure date is done in format 
    let date = new Date(dob.date);
    date.toLocaleDateString();
    const month = String(date.getMonth() +1).padStart(2, '0');

//Captured information for Module Window
    const modalInfo = document.querySelector('.modal-info-container');
    modalInfo.innerHTML = '';

    const modalHTML = `
                <img class="modal-img" src="${picture.medium}" alt="profile picture">
                <div class="modal-info-container">
                <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
                <p class="modal-text">${email}</p>
                <p class="modal-text cap">${city}, ${state}</p>
                <hr>
                <p class="modal-text">${phone}</p>
                <p class="modal-text">${street.number} ${street.name}, ${city}, ${state}, ${postcode}  </p>
                <p class="modal-text">Birthday: ${month}/${date.getDate()}/${date.getFullYear()}</p>
            </div>
        </div>
        </div>`;

    modalInfo.innerHTML = modalHTML;
    }
//Event Listener to listen when user clicks on employee card
    gallery.addEventListener('click', e => {
        if (e.target !== gallery) {

            const card = e.target.closest(".card");
            const index = card.getAttribute('data-index')
            displayModal(index);
            modalContainer.style.display = 'block';
        }
    });

//Close the Modal Window
//Event Listener to listen when user clicks on the "x"
modalClose.addEventListener('click', () => {
    modalContainer.style.display = 'none';
});