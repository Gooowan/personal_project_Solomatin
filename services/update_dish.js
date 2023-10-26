function editElement(element, type) {
    const initialValue = element.textContent;
    console.log(initialValue);
    const input = document.createElement(type === 'name' ? 'input' : 'textarea');
    input.className = 'edit-input';
    input.value = initialValue;

    input.addEventListener('blur', function() {
        updateKebabData(initialValue, element, type, this.value);
    });
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            updateKebabData(initialValue, element, type, this.value);
        }
    });

    element.textContent = '';
    element.appendChild(input);
    input.focus();
}

function updateKebabData(initialValue, element, type, newValue) {
    const dishName = initialValue;
    let kebabsData = JSON.parse(localStorage.getItem('kebabsData'));

    console.log(dishName);
    let dish = kebabsData.find(d => d.name === dishName);

    if (dish) {
        dish[type] = newValue;
        localStorage.setItem('kebabsData', JSON.stringify(kebabsData));
        //console.log("Updated kebabsData in localStorage");
    }

    element.textContent = newValue;
}