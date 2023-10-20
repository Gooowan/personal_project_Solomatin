// Fetch the kebab data from the provided kebabs.json file
fetch('/data/kebabs.json')
    .then(response => response.json())
    .then(data => {
        const kebabContainer = document.getElementById('kebab-container');

        // Loop through each kebab data and create a div for it
        data.forEach(kebab => {
            const kebabDiv = document.createElement('div');
            kebabDiv.classList.add('kebab-item');

            kebabDiv.innerHTML = `
                <h3>${kebab.name}</h3>
                <img src="images/${kebab.image}" alt="${kebab.name}">
                <p>${kebab.description}</p>
                <p class="cost">${kebab.price}</p>
            `;

            kebabContainer.appendChild(kebabDiv);
        });
    });
