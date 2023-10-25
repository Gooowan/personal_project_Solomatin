document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const dishName = decodeURIComponent(params.get('name'));

    fetch('data/kebabs.json')
        .then(response => response.json())
        .then(data => {
            const dish = data.find(d => d.name === dishName);
            if (dish) {
                document.getElementById('dish-name').textContent = dish.name;
                document.getElementById('dish-image').src = `images/${dish.image}`;
                document.getElementById('dish-image').alt = dish.name;
                document.getElementById('dish-description').textContent = dish.description;
            } else {

                document.getElementById('dish-content').innerHTML = '<h1>Dish is not found</h1>';
            }
        })
        .catch(error => {
            console.error('Error fetching dish data:', error);
        });
});
