
// Sample mock data for products
const products = [
    { id: 1, name: "Drake T-shirt", price: 20, category: "tshirts", image: "path_to_image.jpg" },
    { id: 2, name: "Drake Pullover", price: 40, category: "pullovers", image: "path_to_image.jpg" },
    // ... add more products for each category
];

window.addEventListener("DOMContentLoaded", () => {
    displayProducts();
    detectDeviceType();
});

function displayProducts() {
    products.forEach(product => {
        const productSection = document.getElementById(product.category);
        const productDiv = document.createElement("div");
        productDiv.className = "product-item";
        productDiv.innerHTML = \`
            <img src="\${product.image}" alt="\${product.name}">
            <h3>\${product.name}</h3>
            <p>Price: $\${product.price}</p>
        \`;
        productDiv.addEventListener("click", () => {
            alert(\`\${product.name} - $\${product.price}\`);
        });
        productSection.appendChild(productDiv);
    });
}

function detectDeviceType() {
    const media = window.matchMedia("(max-width: 600px)").matches ? "Mobile" : "Desktop";
    console.log("Device Type:", media);
}
