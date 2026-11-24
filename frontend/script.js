const genreButtons = document.querySelectorAll(".genre-button");

genreButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        button.classList.toggle("selected");
    });
});