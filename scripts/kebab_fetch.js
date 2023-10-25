function fetchKebabContent(){
    const kebabContainer = document.getElementById('kebab-container');

    if (kebabContainer.getAttribute("data-loaded") === "true") {
        return;
    }

    fetch('data/kebabs.json')
        .then(response => response.json())
        .then(data => {
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

            kebabContainer.setAttribute("data-loaded", "true");
        });
}
