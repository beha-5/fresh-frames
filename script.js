const randomImage = document.getElementById('randomImage');
const loadImageBtn = document.getElementById('loadImageBtn');
const imageContainer = document.querySelector('.image-container');
const welcomeScreen = document.getElementById('welcomeScreen');
const startBtn = document.getElementById('startBtn');

const UNSPLASH_ACCESS_KEY = 'ALn33s2xKtmFNZdg4vWreBjFlVMX2X1kBgc5EdF4nho';

const fetchRandomImage = async () => {
    try {
        imageContainer.classList.add('loading');
        randomImage.style.opacity = '0';

        const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }

        const data = await response.json();
        console.log(data);

        randomImage.src = data.urls.regular;
        randomImage.alt = data.alt_description || 'Random image';

        randomImage.onload = () => {
            imageContainer.classList.remove('loading');
            randomImage.style.opacity = '1';
            randomImage.style.transform = 'scale(1)';
            imageContainer.style.height = '300px';
        };
    } catch (error) {
        console.error('Error:', error);
        imageContainer.classList.remove('loading');
        randomImage.alt = 'Failed to load';
        randomImage.src = '';
    }
};

fetchRandomImage();
loadImageBtn.addEventListener('click', fetchRandomImage);

startBtn.addEventListener('click', () => {
    welcomeScreen.style.opacity = '0';
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
    }, 500);
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        welcomeScreen.style.opacity = '0';
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
        }, 500);
    }
});