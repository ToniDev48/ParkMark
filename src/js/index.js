const itemContainer = document.getElementById('item-container');
const addButton = document.getElementById('add-button');


let data = JSON.parse(localStorage.getItem('data')) || [];
renderItems();
console.log(data);
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
    itemContainer.innerHTML += ` <div class="bg-card h-[210px] w-[85%] p-[15px] rounded-2xl item mt-[30px] mb-[30px]">
                <h1>${item.name}</h1>
                <div class="flex justify-center mt-[5px]">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2427.952248680024!2d13.375125075926306!3d52.51620323651161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTLCsDMwJzU4LjMiTiAxM8KwMjInMzkuNyJF!5e0!3m2!1sde!2sde!4v1745235515744!5m2!1sde!2sde"
                        width="95%"
                        height="100px"
                        style="border-radius: 5px"
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
                <div class="mt-[10px]">
                    <button class="h-[40px] inline-flex items-center cursor-pointer justify-center border align-middle select-none font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-2xl py-2 px-4 shadow-sm hover:shadow-md bg-edit-mark-button border-0 text-button-font hover:bg-edit-mark-button-hover">
                        Mark parking place here
                    </button>
                    <button class="h-[40px] inline-flex items-center cursor-pointer justify-center border align-middle select-none font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-2xl py-2 px-4 shadow-sm hover:shadow-md bg-edit-mark-button border-0 text-button-font hover:bg-edit-mark-button-hover">
                      <img src="./assets/icons/edit.svg" alt="">
                  </button>
                </div>
            </div>`;
   });
}
