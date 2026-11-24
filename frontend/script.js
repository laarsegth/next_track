const genreButtons = document.querySelectorAll(".genre-button");

genreButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        button.classList.toggle("selected");
    });
});


function SkiftCover(billede) {
    alert("Knappen virker!");

    document.getElementById("genre-cover").src = "/images/" + billede;
}


let trackListElement = document.getElementById("tracks");

let knap = document.createElement("button");
knap.type = "button";
knap.className = "genre-button";
knap.textContent = "Jazz";

trackListElement.appendChild(knap);

knap.onclick = function () {
    SkiftCover("jazz.png");
};