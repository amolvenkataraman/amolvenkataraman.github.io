COLOUR_KEY = "colour_scheme"; // Store the local storage key as a constant

// Switch between light and dark mode
// If 'dark' is true, set to dark mode, light mode otherwise
function set_colour(dark) {
	// Remove all mode selector classes from body
	body = document.querySelector("body");
	body.classList.remove("light-mode");
	body.classList.remove("dark-mode");
	// Add the correct class and add it to local storage
	if (dark) {
		body.classList.add("dark-mode");
		localStorage.setItem(COLOUR_KEY, "dark");
	} else {
		body.classList.add("light-mode");
		localStorage.setItem(COLOUR_KEY, "light");
	}
}

// If the local storage key is not defined (first load)
if (!localStorage.getItem(COLOUR_KEY)) {
	// Check if the user prefers dark mode
	if (window.matchMedia && 
		window.matchMedia('(prefers-color-scheme: dark)').matches) {
		// Set dark mode if the user prefers it
		set_colour(true);
	} else {
		// Set light mode if the user has no preference
		set_colour(false);
	}
} else { // If the local storage key is defined
	// Set light or dark mode based on the local storage key
	if (localStorage.getItem(COLOUR_KEY) == "dark") {
		set_colour(true);
	} else {
		set_colour(false);
	}
}

// Listener for button press
document.getElementById('toggle-dark-mode').addEventListener("click", () => {
	// Toggle between light and dark mode
	set_colour(localStorage.getItem(COLOUR_KEY) == "light");
});