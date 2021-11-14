window.addEventListener('load', () => {
    const colors = [
        '#2196f3',
        '#e91e63',
        '#ffeb3b',
        '#74ff1d'
    ]

    function createLine() {
        const backgroundSection = document.getElementById('background');
        const backgroundLine = document.createElement('div');
        const backgroundCircle = document.createElement('div');
        const backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 20;

        // Line customization
        backgroundLine.classList.add('backgroundLine');
        backgroundLine.style.height = size + 10 + 'vh';
        backgroundLine.style.width = (size + 10) / 3 + 'vh';
        backgroundLine.style.border = "0.3vh solid " + backgroundColor;
        backgroundLine.style.borderRadius = (size + 10) * 1.10 + 'vh';
        backgroundLine.style.top = Math.random() * 125 - 25 + '%';
        backgroundLine.style.left = Math.random() * 100 + 5 + '%';
        backgroundLine.style.boxShadow = 'inset 0 -0.5vh 0.5vh ' + backgroundColor + ', 0 1vh 1.5vh #000c, inset 0 1vh 1.5vh #000c';

        // Circle customization
        backgroundCircle.classList.add('backgroundCircle');
        backgroundCircle.style.height = backgroundLine.style.width;
        backgroundCircle.style.width = backgroundLine.style.width;
        backgroundCircle.style.backgroundColor = backgroundColor;
        backgroundLine.style.boxShadow = 'inset 0 -0.5vh 0.5vh ' + backgroundColor + ', 0 1vh 1.5vh #000c, inset 0 1vh 1.5vh #000c';
        
        backgroundLine.appendChild(backgroundCircle);
        backgroundSection.appendChild(backgroundLine);

        setTimeout(() => {
            backgroundLine.remove();
        }, 15000);
    }

    setInterval(createLine, 750);

})