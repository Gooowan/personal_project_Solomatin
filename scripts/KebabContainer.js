function removeDishFromUI(dishName) {

    const dishElement = document.querySelector(`.dish[data-name='${dishName}']`);
    if (dishElement) {
        dishElement.remove();
    }
}

function deleteKebab(dishName) {
    let kebabsData = JSON.parse(localStorage.getItem('kebabsData'));
    const dishIndex = kebabsData.findIndex(d => d.name === dishName);

    if (dishIndex !== -1) {
        kebabsData.splice(dishIndex, 1);
        localStorage.setItem('kebabsData', JSON.stringify(kebabsData));

        removeDishFromUI(dishName);
    } else {
        console.log("Dish not found for deletion");
    }
}

function fetchKebabContent() {
    const kebabContainer = document.getElementById('kebab-container');

    if (kebabContainer.getAttribute("data-loaded") === "true") {
        return;
    }

    let kebabsData = JSON.parse(localStorage.getItem('kebabsData'));
    if (kebabsData) {
        displayKebabs(kebabsData, kebabContainer);
    } else {

        fetch('data/kebabs.json')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('kebabsData', JSON.stringify(data));
                displayKebabs(data, kebabContainer);
            });
    }
}

function displayKebabs(kebabs, container) {
    container.innerHTML = `
        <form id="add-kebab-form">
            <label for="kebab-name">Name:</label>
            <input type="text" id="kebab-name" name="kebab-name" required><br>

            <label for="kebab-description">Description:</label>
            <textarea id="kebab-description" name="kebab-description" required></textarea><br>

            <label for="kebab-price">Price:</label>
            <input type="number" id="kebab-price" name="kebab-price" required><br>

            <label for="kebab-image">Image URL (optional):</label>
            <input type="url" id="kebab-image" name="kebab-image"><br>

            <input type="submit" value="Add Kebab">
        </form>
        <div id="kebabs-list"></div>
    `;
    kebabs.forEach(kebab => {
        const kebabDiv = document.createElement('div');
        kebabDiv.classList.add('kebab-item');

        const kebabsList = container.querySelector('#kebabs-list');
        kebabsList.innerHTML = '';

        kebabDiv.setAttribute('ondblclick', `location.href='dishprofile.html?id=${encodeURIComponent(kebab.id)}'`);
        kebabDiv.style.cursor = 'pointer';

        kebabDiv.innerHTML = `
            <h3>${kebab.name}</h3>
            <img src="images/${kebab.image}" alt="${kebab.name}">
            <p>${kebab.description}</p>
            <p class="cost">${kebab.price}</p>
            <button class="delete-button" onclick="deleteKebab('${kebab.name}')">Delete Kebab</button>
        `;

        container.appendChild(kebabDiv);
    });

    container.setAttribute("data-loaded", "true");

    document.getElementById('add-kebab-form').addEventListener('submit', function(event) {
        event.preventDefault();

        let kebabsData = JSON.parse(localStorage.getItem('kebabsData')) || [];
        const newKebab = {
            id: `${kebabsData.length + 11}`,
            name: document.getElementById('kebab-name').value,
            description: document.getElementById('kebab-description').value,
            price: `$${document.getElementById('kebab-price').value}.99`,
            image: document.getElementById('kebab-image').value || 'default.jpg'
        };

        kebabsData.push(newKebab);
        localStorage.setItem('kebabsData', JSON.stringify(kebabsData));
        displayKebabs(kebabsData, document.getElementById('kebab-container'));
    });

}



