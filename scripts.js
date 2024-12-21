const textContainer = document.querySelector('.text-container');
const logoContainer = document.querySelector('.logo-container');
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

let scrollPosition = 0;
let logosVisible = 0;

window.addEventListener('scroll', () => {
    scrollPosition = window.scrollY;
    const scrollProgress = scrollPosition / (document.body.offsetHeight - window.innerHeight);

    // Fade in text
    if (scrollProgress > 0.1) {
        textContainer.classList.add('fade-in');
    } else {
        textContainer.classList.remove('fade-in');
    }

    // Animate logos
    logos.forEach((logo, index) => {
        const logoElement = document.createElement('div');
        logoElement.classList.add('logo');
        logoElement.style.backgroundImage = `url(${logo.url})`;
        logoElement.style.left = `${logo.x}px`;
        logoElement.style.top = `${logo.y}px`;

        if (scrollProgress > (index / logos.length)) {
            logoElement.style.opacity = 1;
            logoElement.style.transform = `translateY(-${scrollPosition / 10}px)`;
            logosVisible++;
        } else {
            logoElement.style.opacity = 0;
        }

        logoContainer.appendChild(logoElement);
    });

    // Add more logos as user scrolls down
    if (logosVisible < logos.length && scrollProgress > 0.5) {
        const newLogo = logos[logosVisible];
        const newLogoElement = document.createElement('div');
        newLogoElement.classList.add('logo');
        newLogoElement.style.backgroundImage = `url(${newLogo.url})`;
        newLogoElement.style.left = `${newLogo.x}px`;
        newLogoElement.style.top = `${newLogo.y}px`;
        logoContainer.appendChild(newLogoElement);
        logosVisible++;
    }
});
