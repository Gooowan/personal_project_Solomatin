// Define the URL
const url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
let currentRate;

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Bank response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const usdData = data.find(item => item.txt === 'Долар США');

        if (usdData) {
            console.log('Rate:', usdData.rate);
            currentRate = usdData.rate;

            // Update the DOM to display the rate
            document.getElementById('rate-display').innerText = `Current Hryvna Rate: ${currentRate}`;
        } else {
            console.error('Долар США data not found');
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

