document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const dishID = decodeURIComponent(params.get('id'));
    console.log(dishID);

    let kebabsData = localStorage.getItem('kebabsData');
    if (kebabsData) {
        kebabsData = JSON.parse(kebabsData);
        displayDish(kebabsData, dishID);
    } else {

        fetch('data/kebabs.json')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('kebabsData', JSON.stringify(data));
                displayDish(data, dishID);
            })
            .catch(error => {
                console.error('Error fetching dish data:', error);
            });
    }
    document.getElementById('dish-name').addEventListener('dblclick', function() {
        editElement(this, 'name');
    });

    document.getElementById('dish-description').addEventListener('dblclick', function() {
        editElement(this, 'description');
    });

});


function displayDish(kebabs, dishID) {
    const dish = kebabs.find(d => d.id === parseInt(dishID));
    if (dish) {
        document.getElementById('dish-name').textContent = dish.name;
        document.getElementById('dish-image').src = `images/${dish.image}`;
        document.getElementById('dish-image').alt = dish.name;
        document.getElementById('dish-description').textContent = dish.description;
    } else {
        document.getElementById('dish-content').innerHTML = '<h1>Dish not found</h1>';
    }
}
