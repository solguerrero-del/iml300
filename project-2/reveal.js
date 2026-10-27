// Makes the text on the page appear slowly, one piece after another.
// The fading itself is done in style.css (look for "fade-in").

let pieces = document.querySelectorAll("h1, p, img");

for (let i = 0; i < pieces.length; i++) {
  pieces[i].classList.add("fade-in");
  // each piece waits 1 second longer than the one before it
  pieces[i].style.animationDelay = i + "s";
}
