const textContainer = document.querySelector('.text-container');
const logoContainer = document.querySelector('.logo-container');
const textElement = document.querySelector('#text');
const logos = [
    { url: 'https://logo.clearbit.com/google.com', x: 10, y: 10 },
    { url: 'https://logo.clearbit.com/amazon.com', x: 200, y: 300 },
    { url: 'https://logo.clearbit.com/microsoft.com', x: 400, y: 100 },
    { url: 'https://logo.clearbit.com/facebook.com', x: 600, y: 200 },
    { url: 'https://logo.clearbit.com/apple.com', x: 800, y: 400 },
    { url: 'https://logo.clearbit.com/netflix.com', x: 100, y: 500 },
    { url: 'https://logo.clearbit.com/spotify.com', x: 300, y: 600 },
    { url: 'https://logo.clearbit.com/uber.com', x: 500, y: 700 },
    { url: 'https://logo.clearbit.com/airbnb.com', x: 700, y: 800 },
    { url: 'https://logo.clearbit.com/dropbox.com', x: 900, y: 900 },
];

const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.';

// Split the text into individual letters
const letters = text.split('').map((letter, index) => {
    const span = document.createElement('span');
    span.classList.add('letter');
    span.textContent = letter;
    return span;
});

// Append the letters to the text element
letters.forEach((letter) => {
    textElement.appendChild(letter);
});

let scrollPosition = 0;
let logosVisible = 0;

// Animate the logos
logos.forEach((logo, index) => {
    const logoElement = document.createElement('div');
    logoElement.classList.add('logo');
    logoElement.style.backgroundImage = `url(${logo.url})`;
    logoElement.style.left = `${logo.x}px`;
    logoElement.style.top = `${logo.y}px`;
    logoContainer.appendChild(logoElement);
});

window.addEventListener('scroll', () => {
    scrollPosition = window.scrollY;
    const scrollProgress = scrollPosition / (document.body.offsetHeight - window.innerHeight);

    // Animate the logos
    logos.forEach((logo, index) => {
        const logoElement = logoContainer.children[index];
        logoElement.style.opacity = scrollProgress;
        logoElement.style.transform = `translateY(-${scrollPosition / 10}px)`;
    });

    // Animate the text
    letters.forEach((letter, index) => {
        const scrollThreshold = index / letters.length;
        if (scrollProgress > scrollThreshold) {
            letter.style.color = '#fff'; // White
        } else {
            letter.style.color = '#ccc'; // Light gray
        }
    });
});

