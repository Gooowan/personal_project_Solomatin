
window.addEventListener('DOMContentLoaded', (event) => {
    const contentDiv = document.getElementById('content');
    navigate('home');

    // Navigation
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigate(e.target.getAttribute('href').substring(1));
        });
    });
});

async function fetchKebabs() {
    const response = await fetch('data/kebabs.json');
    const kebabs = await response.json();
    let kebabList = '<ul>';
    for (let kebab of kebabs) {
        kebabList += `
            <li>
                <h2><a href="#profile-${kebab.id}">${kebab.name}</a></h2>
                <img src="images/${kebab.image}" alt="${kebab.name}" width="100">
                <p>${kebab.description}</p>
                <p>Price: ${kebab.price}</p>
            </li>
        `;
    }
    kebabList += '</ul>';
    return kebabList;
}

async function navigate(page) {
    const contentDiv = document.getElementById('content');
    switch (page) {
        case 'home':
            contentDiv.innerHTML = await fetchKebabs();
            break;
        case 'about':
            contentDiv.innerHTML = '<h1>About Us</h1><p>Welcome to Drake Doner Kebab! We serve the best kebabs in town.</p>';
            break;
        default:
            if (page.startsWith('profile-')) {
                const kebabId = parseInt(page.split('-')[1]);
                const kebab = await fetchKebabById(kebabId);
                contentDiv.innerHTML = `
                    <h1>${kebab.name}</h1>
                    <img src="images/${kebab.image}" alt="${kebab.name}" width="200">
                    <p>${kebab.description}</p>
                    <p>Price: ${kebab.price}</p>
                `;
            }
            break;
    }
}

async function fetchKebabById(id) {
    const kebabs = await fetchKebabs();
    return kebabs.find(kebab => kebab.id === id);
}

// CRUD Operations
function addKebab(kebab) {
    // For simplicity, directly adding to the mock data
    // In a real-world scenario, you'd send a POST request to an API
    kebab_data.push(kebab);
}

function getKebab(id) {
    return kebab_data.find(kebab => kebab.id === id);
}

function updateKebab(updatedKebab) {
    const index = kebab_data.findIndex(kebab => kebab.id === updatedKebab.id);
    if (index !== -1) {
        kebab_data[index] = updatedKebab;
    }
}

function deleteKebab(id) {
    const index = kebab_data.findIndex(kebab => kebab.id === id);
    if (index !== -1) {
        kebab_data.splice(index, 1);
    }
}

// Basic Unit Tests for CRUD operations
function runTests() {
    // Test addKebab
    const newKebab = {
        id: 4,
        name: "Test Kebab",
        description: "This is a test kebab.",
        price: "$5.99",
        image: "test.jpg"
    };
    addKebab(newKebab);
    console.assert(getKebab(4).name === "Test Kebab", "Test for addKebab failed!");

    // Test updateKebab
    newKebab.name = "Updated Test Kebab";
    updateKebab(newKebab);
    console.assert(getKebab(4).name === "Updated Test Kebab", "Test for updateKebab failed!");

    // Test deleteKebab
    deleteKebab(4);
    console.assert(getKebab(4) === undefined, "Test for deleteKebab failed!");

    console.log("All tests passed!");
}

runTests();

function showAddKebabForm() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = `
        <h1>Add Kebab</h1>
        <form id="kebabForm">
            <div>
                <label>Name:</label>
                <input type="text" id="name" required>
            </div>
            <div>
                <label>Description:</label>
                <textarea id="description" required></textarea>
            </div>
            <div>
                <label>Price:</label>
                <input type="text" id="price" required>
            </div>
            <div>
                <label>Image:</label>
                <input type="file" id="image" required>
            </div>
            <div>
                <button type="button" onclick="submitKebabForm()">Submit</button>
            </div>
        </form>
    `;
}

function submitKebabForm() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const image = document.getElementById('image').files[0].name;

    const newKebab = {
        id: kebab_data.length + 1,
        name,
        description,
        price,
        image
    };

    addKebab(newKebab);
    alert('Kebab added successfully!');
    navigate('home');
}

function setFavoriteKebab(id) {
    localStorage.setItem('favoriteKebab', id.toString());
    alert('Kebab set as favorite!');
}

function getFavoriteKebab() {
    return localStorage.getItem('favoriteKebab');
}

// Update the fetchKebabs function to include a button for setting favorite
async function fetchKebabs() {
    const response = await fetch('data/kebabs.json');
    const kebabs = await response.json();
    const favoriteKebabId = getFavoriteKebab();
    let kebabList = '<ul>';
    for (let kebab of kebabs) {
        kebabList += `
            <li>
                <h2><a href="#profile-${kebab.id}">${kebab.name}</a></h2>
                <img src="images/${kebab.image}" alt="${kebab.name}" width="100">
                <p>${kebab.description}</p>
                <p>Price: ${kebab.price}</p>
                <button onclick="setFavoriteKebab(${kebab.id})">Set as Favorite</button>
                ${kebab.id.toString() === favoriteKebabId ? '<span>🌟</span>' : ''}
            </li>
        `;
    }
    kebabList += '</ul>';
    return kebabList;
}
