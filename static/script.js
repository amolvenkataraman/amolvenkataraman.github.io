COLOUR_KEY = "colour_scheme";

function set_colour(dark) {
    body = document.querySelector("body");
    body.classList.remove("light-mode");
    body.classList.remove("dark-mode");

    if (dark) {
        body.classList.add("dark-mode");
        localStorage.setItem(COLOUR_KEY, "dark");
    } else {
        body.classList.add("light-mode");
        localStorage.setItem(COLOUR_KEY, "light");
    }
}

if (!localStorage.getItem(COLOUR_KEY)) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        set_colour(true);
    } else {
        set_colour(false);
    }
} else {
    if (localStorage.getItem(COLOUR_KEY) == "dark") {
        set_colour(true);
    } else {
        set_colour(false);
    }
}

document.querySelector('#toggle-dark-mode').addEventListener("click", () => {
    set_colour(localStorage.getItem(COLOUR_KEY) == "light");
});

