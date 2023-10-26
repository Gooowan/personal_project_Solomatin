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
    kebabs.forEach(kebab => {
        const kebabDiv = document.createElement('div');
        kebabDiv.classList.add('kebab-item');

        kebabDiv.setAttribute('onclick', `location.href='dishprofile.html?id=${encodeURIComponent(kebab.id)}'`);
        kebabDiv.style.cursor = 'pointer';

        kebabDiv.innerHTML = `
            <h3>${kebab.name}</h3>
            <img src="images/${kebab.image}" alt="${kebab.name}">
            <p>${kebab.description}</p>
            <p class="cost">${kebab.price}</p>
        `;

        container.appendChild(kebabDiv);
    });

    container.setAttribute("data-loaded", "true");
}
