// Splits every <span class="joy"> into single letters,
// so each letter can change color a little later than the one before it.
// The colors themselves are in style.css (look for "rainbow").

let joyWords = document.querySelectorAll(".joy");

for (let joy of joyWords) {
  let words = joy.textContent.split(" ");
  joy.innerHTML = "";
  let count = 0;

  for (let w = 0; w < words.length; w++) {
    // keep the letters of one word together, so a word never breaks across two lines
    let word = document.createElement("span");
    word.className = "word";

    for (let letter of words[w]) {
      let span = document.createElement("span");
      span.textContent = letter;
      span.style.animationDelay = count * -0.3 + "s";
      word.appendChild(span);
      count++;
    }

    joy.appendChild(word);
    // put the space back between words
    if (w < words.length - 1) joy.append(" ");
  }
}
