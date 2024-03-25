const images = ['0.jpeg', '1.jpeg', '2.jpeg'];

const chosenImage = images[Math.floor(Math.random() * images.length)];

// > ame logic as adding <img src=""/> on index.html file
const bgImage = document.createElement('img');
bgImage.src = `/assets/img/${chosenImage}`; // <- Create html element from javascript
document.body.appendChild(bgImage);
