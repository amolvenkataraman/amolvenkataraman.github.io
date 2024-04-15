---
layout: blog-post
title:  "How to add animated toggleable Dark Mode to your website in under 100 lines of code"
---

# How to add animated toggleable Dark Mode to your website in under 100 lines of code

# Introduction
Many of us have been there. You work hard to make a website, but even after all the effort you put into tweaking the CSS to make sure that everything looked perfect, there is always that one person who is unimpressed because you didn't add dark mode support.

This fictitious person isn't alone though. Many studies show that an increasing number of computer and phone users prefer using dark mode, whether it is to decrease eye stress, save battery, or just personal preference. Considering this, adding support dark mode should be on the to-do list of anyone who makes a website. However, many developers don't bother to add dark mode support due to the fact that it could take a long time and a lot of code to implement. However, I am here to show you that you can implement it in about an hour or two with under a hundred lines of code.

# The Basic Idea
In order to make it as easy as possible to implement, we are going to let CSS do most of the heavy lifting. More specifically, we are going to use the behaviour that if the classes associated with an element change, the element will automatically update itself based on the CSS properties of it's new class list.

The idea then is to have 2 different sets of CSS rules. One for dark mode and one for light mode, and to toggle between classes to toggle between the CSS rules. While this might seem hard due to the need to toggle the class list of every single element, we can actually get the same result by only updating the `<body>` element if we use variables and compound selectors.

# Using CSS Variables
Some of you might be asking. "Variables in CSS? Why would that even exist, and where could I use them?" Believe it or not, CSS actually has variables. Well, they're actually more akin to constants in "real" programming languages and serve a similar purpose. What if you wanted to use the same colour, width, font size, or some other property across many different elements, while still maintaining the ability to change them all by only changing one line of code? CSS variables exist to solve exactly this problem. You define a variable for an element, and it is available inside that element and all it's children (other elements inside that element).

**Example**: How to use CSS variables.
```css
.superclass {
	--var_name: #54a0ff;
	// Any variable names needs to be prepended with "--"
	// A variable can store any value
}

.subclass { // Has to be inside superclass
	background-color: var(--var_name);
}
```

In the above example, we define a variable named `--var-name` and use it to store a Hex code for a colour rather than hard coding it. The biggest advantage of this approach is that we can use the same `--var-name` selector for other sub-classes of `.superclass` as well, and if you ever want to change the colour, you can do so by just changing the value of the variable. We will be doing something similar.

The first step take all the colours that are supposed to change when toggling between light mode and dark mode and to replace them with a variable. Then, we can define these variables for the `body` element, which is the super class for all the elements in the DOM. However, rather than just defining everything once, we can have 2 compound selectors, one for if the `body` element has a class called `.light-mode`, and another for if it has a class called `.dark-mode`. We would also need two different colour palettes, one for light mode and one for dark mode.

Making a good-looking colour palette can be challenging, but there are many websites that make this task easy:
- Flat UI Colors: [https://flatuicolors.com/](https://flatuicolors.com/)
- Coolors: [https://coolors.co/](https://coolors.co/)

```css
// Variable definitions
body.light-mode { // Colours for light mode
	--accent1: #bdc3c7;
	--accent2: #bdc3c7;
	--accent3: #54a0ff;
	--accent4: #34495e;
	--background: #ecf0f1;
	--text: black; // Text colour should be black
	color: var(--text);
}

body.dark-mode { // Colours for dark mode
	--accent1: #636e72;
	--accent2: #636e72;
	--accent3: #0984e3;
	--accent4: #bdc3c7;
	--background: #2d3436;
	--text: white; // Text colour should be white
	color: var(--text);
}


// Example selectors and properties
.navbar {
	background-color: var(--accent3);
	// ... (any other styles)
}

#page-content {
	background-color: var(--background);
	// ... (any other styles)
}
```

Notice that in this case there are 4 accent colours (you can use as many or as few as you want), a background colour, and the text colour provided separately. The `--background` variable is set to a light and dark colour for light and dark modes respectively and can be set as the background colour of most of the page content. Other elements, like navbars, buttons, cards, etc. can use any of the accent colours, which could either change between light and dark mode or stay the same. Note that none of the variable names are special, and you could use any names.

Furthermore, notice that we have defined a variable called `--text` and then used it in the same selector to set it as the text colour. The reason for having this extra variable is so that we can also override the colour of elements that aren't affected by the `color` property (like links and icons).

Next, we need to let the page default to one of the modes. This is necessary because the variables are only defined if the `body` element has either the `.light-mode` or `.dark-mode` class, and if the variables are not defined, everything will default to the browser's default value (which is either all white or all black). So, we need to edit the HTML file to add one of the classes to `<body>`.

```html
<!-- Pick ONE of the following -->

<!-- Light mode default -->
<body class="light-mode">

<!-- Dark mode default -->
<body class="dark-mode">
```

# Switching between Light and Dark mode
Now that we have different styles for both light and dark mode, we can try switching between them. When you first load the page, it will be displayed in whatever you chose to be the default. However, if you use the browser developer tools to change `light-mode` to `dark-mode` (or vice versa) for the `body` element, then the page changes without having to reload.

Once we verify that it is possible to switch, it is time to make this happen with the press of a button. First we need to the button itself. There are many potential locations for this button, but I personally recommend adding it to either the navbar or to keep it fixed on a corner of the page. Here is an example of what the code for the button could look like. Inside the main `button` are 2 different `span`s, each of which have an icon inside them (one represents light mode and the other represents dark mode). I personally recommend Bootstrap icons: [https://icons.getbootstrap.com/](https://icons.getbootstrap.com/) to get the icons from.

```html
<button id="toggle-dark-mode" aria-label="Toggle dark mode">
	<span class="light-mode-toggle">
		<!-- Icon of sun (to switch to light mode) -->
	</span>

	<span class="dark-mode-toggle">
		<!-- Icon of moon (to switch to dark mode) -->
	</span>
</button>
```

Now, we have the toggle button, but we want only one of the icons to display at any time. We can do that with some CSS.

```css
#toggle-dark-mode {
	background-color: var(--accent3); // Make it blend in with the navbar
	border: 0; // Improve aesthetics
	outline: none;
	cursor: pointer;
}

.light-mode .light-mode-toggle {
	display: none; // Hide the light mode toggle when in light mode
}

.dark-mode .dark-mode-toggle {
	display: none; // Hide the dark mode toggle when in dark mode
}
```

Finally, it is time to write the actual JavaScript code. Here is what the code needs to accomplish:
- On first load, set the mode to whatever the user's preference is.
- Toggle between light and dark mode whenever the button is pressed.
- Store the current mode in local storage.
- When loading the page, if a mode is set in local storage, than use that.

The full JavaScript code with all the aforementioned functionality is provided below. Note that this code should only run once the full page has been loaded. Thus, the code (either inside a `<script>` tag or a link to a separate file) needs to either be at the end of the page body or inside an event listener for `DOMContentLoaded`.

```js
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
```

# Adding animations
Now, clicking the button makes the site toggle between light and dark mode. This is amazing, but we are still not done. The switch is quite abrupt, and does not look aesthetically pleasing. Luckily, CSS has exactly what we need in order to resolve this: *Transitions*. Just like transitions in PowerPoint or Google Slides, they are used to animate changing the properties of an object. The syntax to add a transition is as follows.

```css
.someclass {
	transition: <Property> <Speed> <Speed-Curve>
}
```

The *property* and *speed* are self-explanatory, but the speed curve is a bit more complicated. It is used to provide how the speed of the transition changes. In this case, `linear` is good enough, although there are a lot more options you could experiment with. Along with the `transition` property, there are also 2 other properties that you are recommended to add, in order to improve compatibility across browsers. These are `-webkit-transition` and `-ms-transition`, both of which should also have the exact same value as the `transition` property.

We need to animate 2 different things, changing the foreground colour and changing the background colour. The code to add the transitions is shown below. Note that the speed is stored in a variable so that it is easier to change it in the future if we want to. Furthermore, it is important to add the `transition` property of `color` before that of `background-color`, because switching the order can sometimes lead to issues where not everything is properly animated.

```css
* {
	--color-change-speed: 300ms;
	
	-webkit-transition: color var(--color-change-speed) linear!important;
	-ms-transition: color var(--color-change-speed) linear!important;
	transition: color var(--color-change-speed) linear!important;
	
	-webkit-transition: background-color color var(--color-change-speed) linear!important;
	-ms-transition: background-color var(--color-change-speed) linear!important;
	transition: background-color var(--color-change-speed) linear!important;
}
```

After adding this and refreshing the page, we can notice that pressing the toggle button not only switches between light and dark mode, but the colour change is also gradual and not abrupt, making it more aesthetically pleasing.

# Conclusion
**Congratulations!** You just added animated toggleable dark mode to your website in under 100 lines of total code. Furthermore, using CSS variables for all your colours will also make it very easy to change your website's colour scheme in the future.

All the code written here is inspired by what I did for my personal website, and you can see it's code to learn more:
- Website link: [https://amolvenkataraman.github.io/](https://amolvenkataraman.github.io/)
- Source code: [https://github.com/amolvenkataraman/amolvenkataraman.github.io](https://github.com/amolvenkataraman/amolvenkataraman.github.io)

<br><br>
