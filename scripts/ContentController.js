function isContainerVisible(containerId) {
    const container = document.getElementById(containerId);
    return container && container.style.display !== "none";
}

function showHomeContent() {
    if (!isContainerVisible("kebab-container")) {
        // Show home content
        document.getElementById("kebab-container").style.display = "block";
        // Hide other containers
        document.getElementById("faq-container").style.display = "none";
        document.getElementById("franchise-container").style.display = "none";
        fetchKebabContent();
    }
}

function showFAQContent() {
    if (!isContainerVisible("faq-container")) {
        // Show FAQ content
        document.getElementById("faq-container").style.display = "block";
        // Hide other containers
        document.getElementById("kebab-container").style.display = "none";
        document.getElementById("franchise-container").style.display = "none";
    }
}

function showFranchiseContent() {
    if (!isContainerVisible("franchise-container")) {
        // Show franchise content
        document.getElementById("franchise-container").style.display = "block";
        // Hide other containers
        document.getElementById("kebab-container").style.display = "none";
        document.getElementById("faq-container").style.display = "none";
        appendFranchiseContainer();
    }
}
