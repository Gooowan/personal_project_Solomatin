function editElement(DOMElement, kebabID, type) {
    const initialValue = DOMElement.textContent;
    console.log(initialValue);
    const input = document.createElement(type === 'name' ? 'input' : 'textarea');
    input.className = 'edit-input';
    input.value = initialValue;

    input.addEventListener('blur', function() {
        updateKebabData(kebabID, type, this.value, DOMElement);
    });
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            updateKebabData(kebabID, type, this.value, DOMElement);
        }
    });

    DOMElement.textContent = '';
    DOMElement.appendChild(input);
    input.focus();
}

function updateKebabData(kebabID, type, newValue, DOMElement) {
    let kebabsData = JSON.parse(localStorage.getItem('kebabsData'));

    console.log(kebabID, kebabsData);
    let dish = kebabsData.find(d => +d.id === +kebabID);

    if (dish) {
        dish[type] = newValue;
        localStorage.setItem('kebabsData', JSON.stringify(kebabsData));
        console.log("Updated kebabsData in localStorage", kebabsData);
    }

    DOMElement.textContent = newValue;
}