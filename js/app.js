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

        backgroundLine.appendChild(backgroundCircle);

        var size = Math.random() * 20;

        backgroundLine.style.height = size + 10 + 'vh';
        backgroundLine.style.width = backgroundLine.style.height / 3 + 'vh';
        backgroundLine.style.border = "0.3vh solid " + backgroundColor;
        backgroundLine.style.borderRadius = backgroundLine.style.height * 1.10 + 'vh';
        backgroundLine.style.top = Math.random() * 125 - 25 + '%';
        backgroundLine.style.left = Math.random() * 100 + 5 + '%';
        backgroundLine.style.boxShadow = 'inset 0 -0.5vh 1vh ' + backgroundColor + ', 0 1vh 1.5vh #000c, inset 0 1vh 1.5vh #000c';
        backgroundCircle.style.height = backgroundLine.style.width + 'vh';
        backgroundCircle.style.width = backgroundLine.style.width + 'vh';
        

        backgroundSection.appendChild(backgroundLine);

        setTimeout(() => {
            backgroundLine.remove();
        }, 5000);
    }
})