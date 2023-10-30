function isContainerVisible(containerId) {
    const container = document.getElementById(containerId);
    return container && container.style.display !== "none";
}

function showHomeContent() {
    if (!isContainerVisible("kebab-container")) {
        document.getElementById("kebab-container").style.display = "flex";
        document.getElementById("kebab-container").style.flexWrap = "wrap";
        document.getElementById("faq-container").style.display = "none";
        document.getElementById("franchise-container").style.display = "none";
        fetchKebabContent();
    }
}

function showFAQContent() {
    if (!isContainerVisible("faq-container")) {
        document.getElementById("faq-container").style.display = "block";
        document.getElementById("kebab-container").style.display = "none";
        document.getElementById("franchise-container").style.display = "none";
        appendFAQContainer();
    }
}

function showFranchiseContent() {
    if (!isContainerVisible("franchise-container")) {
        document.getElementById("franchise-container").style.display = "block";
        document.getElementById("kebab-container").style.display = "none";
        document.getElementById("faq-container").style.display = "none";
        appendFranchiseContainer();
    }
}

document.addEventListener('click', (event) => {
    if (event.target.matches('#nav-home')) {
        showHomeContent();
    } else if (event.target.matches('#nav-faq')) {
        showFAQContent();
    } else if (event.target.matches('#nav-franchise')) {
        showFranchiseContent();
    }
});

showHomeContent();

// localStorage.clear();