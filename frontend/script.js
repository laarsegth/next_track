// Hent genreknapperne, coverbilledet og teksten ved siden af.
const genreButtons = document.querySelectorAll(".genre-button");
const genreCover = document.getElementById("genre-cover");
const genreCoverLabel = document.getElementById("genre-cover-label");

// Kør showGenre, når brugeren klikker på en genreknap.
for (const button of genreButtons) {
    button.addEventListener("click", showGenre);
}

function showGenre(event) {
    // currentTarget er den knap, der lytter efter klikket.
    const button = event.currentTarget;
    const genre = button.querySelector(".genre-title").textContent;
    // Filnavnet står i knappens data-cover i HTML.
    const cover = button.dataset.cover;
    const hasCover = Boolean(cover);

    // CSS bruger aria-pressed til at markere den valgte knap.
    const previousButton = document.querySelector('.genre-button[aria-pressed="true"]');
    if (previousButton) {
        previousButton.setAttribute("aria-pressed", "false");
    }
    button.setAttribute("aria-pressed", "true");

    // Vis coveret, hvis der er et filnavn. Ellers vis genrens navn.
    genreCover.hidden = !hasCover;
    genreCoverLabel.hidden = hasCover;
    genreCoverLabel.textContent = genre;

    if (hasCover) {
        // src bestemmer, hvilken billedfil browseren viser.
        genreCover.src = "/images/" + cover;
        genreCover.alt = "Cover til " + genre;
    }
}
