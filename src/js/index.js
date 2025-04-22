const itemContainer = document.getElementById('item-container');
const addButton = document.getElementById('add-button');




let data = JSON.parse(localStorage.getItem('data')) || [];
renderItems();
let id = parseInt(localStorage.getItem('id')) || 0;


addButton.addEventListener('click', function() {
    let name = prompt('Choose a name for your new vehicle:');
    if(name === '') {
        alert('Please give your vehicle a name!');
    } else {
        id += 1;
        let object = {
            name: name, 
            id: id,
            position: {
                latitude: null,
                longitude: null
            }
        };

        alert(`${name} saved!`)
        
        data.push(object);
        
        localStorage.setItem('data', JSON.stringify(data));
        localStorage.setItem('id', id.toString());
        renderItems();
        
    }
});


function renderItems() {
    itemContainer.innerHTML = '';
    data.forEach(item => {
    itemContainer.innerHTML += `<div class="bg-card h-[220px] w-[85%] p-[15px] rounded-2xl item mt-[30px] mb-[30px]">
                <h1>${item.name}</h1>
                <div class="flex justify-center mt-[5px]">
                    <iframe class="mt-[1px] rounded-sm "
                            width="90%"
                            height="110"
                            style="border:0"
                            loading="lazy"
                            allowfullscreen
                            referrerpolicy="no-referrer-when-downgrade"
                            src="https://www.google.com/maps?q=${item.position.latitude},${item.position.longitude}&z=14&output=embed">
                    </iframe>
                </div>
                <div class="mt-[10px]">
                    <button data-id="${item.id}" class="mark-button h-[40px] inline-flex items-center cursor-pointer justify-center border align-middle select-none font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-2xl py-2 px-4 shadow-sm hover:shadow-md bg-edit-mark-button border-0 text-button-font hover:bg-edit-mark-button-hover">
                        Mark vehicle here
                    </button>
                    <button data-id="${item.id}" class="edit-button h-[40px]  inline-flex items-center cursor-pointer justify-center border align-middle select-none font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-2xl py-2 px-4 shadow-sm hover:shadow-md bg-edit-mark-button border-0 text-button-font hover:bg-edit-mark-button-hover">
                      <img  src="./assets/icons/edit.svg" alt="">
                  </button>
                   <button data-id="${item.id}" class="delete-button h-[40px] inline-flex items-center cursor-pointer justify-center border align-middle select-none font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-2xl py-2 px-4 shadow-sm hover:shadow-md bg-red-600 border-0 text-button-font hover:bg-red-900">
                      <img src="./assets/icons/delete.svg" alt="">
                  </button>
                  
                </div>
            </div>`;
   });

   const editButton = document.querySelectorAll('.edit-button');
   const markButton = document.querySelectorAll('.mark-button');
   const deleteButton = document.querySelectorAll('.delete-button');

   
   
   editButton.forEach(button => {
    button.addEventListener('click', function() {
        let dataId = button.getAttribute('data-id');
        let newName = prompt('Choose a new name!');
        let item = data.find(obj => obj.id == dataId);
        if(item) {
            item.name = newName;
            localStorage.setItem('data', JSON.stringify(data)); 
            renderItems();
        }
    });
});

markButton.forEach(button => {
    button.addEventListener('click', function() {
        let dataId = button.getAttribute('data-id');
        let item = data.find(obj => obj.id == dataId); 
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                if(item) {
                    item.position.latitude = latitude;
                    item.position.longitude = longitude;

                    localStorage.setItem('data', JSON.stringify(data));
                    renderItems();
                }
            }
        );     
    });
});

deleteButton.forEach(button => {
    button.addEventListener('click', function () {
        if (confirm('Are you sure you want to delete this vehicle?')) {

        const idToDelete = parseInt(button.getAttribute('data-id')); 
        data = data.filter(item => item.id !== idToDelete); 
        localStorage.setItem('data', JSON.stringify(data)); 
        renderItems(); 
        }
    });
});





};


