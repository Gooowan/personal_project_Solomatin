document.getElementById("nav-toggle").addEventListener("click", function() {
    var nav = document.querySelector("nav");
    if (nav.classList.contains("active")) {
        nav.classList.remove("active");
    } else {
        nav.classList.add("active");
    }
});
