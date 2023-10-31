const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { expect } = require('chai');

describe('Navbar toggle', function() {
    let dom;
    let document;

    beforeEach(() => {
        dom = new JSDOM(`
        <!DOCTYPE html>
        <html>
        <body>
            <button id="nav-toggle">Toggle</button>
            <div class="navbar-column"></div>
        </body>
        </html>
        `);
        document = dom.window.document;

        const navToggle = document.getElementById('nav-toggle');
        navToggle.addEventListener('click', function() {
            const navLinks = document.querySelector('.navbar-column');
            navLinks.classList.toggle('active');
        });
    });

    it('should add "active" class to the navbar on first click', function() {
        const navToggle = document.getElementById('nav-toggle');
        const navLinks = document.querySelector('.navbar-column');

        navToggle.click();
        expect(navLinks.classList.contains('active')).to.be.true;
    });

    it('should remove "active" class from the navbar on second click', function() {
        const navToggle = document.getElementById('nav-toggle');
        const navLinks = document.querySelector('.navbar-column');

        navToggle.click();
        navToggle.click();
        expect(navLinks.classList.contains('active')).to.be.false;
    });
});
