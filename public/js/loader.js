document.addEventListener("DOMContentLoaded", function() {
    const texts = [
     "Bringing your adventure alive.",
     "dsc.gg/plexilenetwork",
     "Created & Managed by willo",
     "Preparing a smooth journey!",
     "Hang tight, almost ready!",
     "Crafting something special!",
     "i like pee c'z",
     "Just a moment, please wait!",
     "Launching great content!",
     "Making things just right!",
     "Unblocking your experience!",
     "Loading your custom settings!",
     "Just a moment, hang tight!",
     "Getting everything in place!",
     "Almost there, stay tuned!",
     "Loading the latest updates!",
     "Hang tight, enjoy the wait!",
     "Crafting your unique journey",
     "Almost ready to dive in!",
     "Creating your experience!",
     "Getting ready for your fun!",
     "Hang on, magic in progress!",
     "Just a moment, good things!"
    ];

    const randomText = texts[Math.floor(Math.random() * texts.length)];

    const randomTextElement = document.createElement('p');
    randomTextElement.textContent = randomText;
    randomTextElement.id = 'random-text';

    const loader = document.getElementById('loader');
    loader.appendChild(randomTextElement);

    window.addEventListener('load', function() {
        setTimeout(function() {
            const loader = document.getElementById('loader');
            loader.classList.add('fade-out');

            loader.addEventListener('transitionend', function() {
                loader.style.display = 'none';
                document.getElementById('content').style.display = 'block';
            });
        }, 1000);
    });
});
