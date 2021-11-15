window.addEventListener('load', () => {
    let boardLayout = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 0, 1, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]
    const colors = [
        '#2196f3',
        '#e91e63',
        '#ffeb3b',
        '#74ff1d'
    ]
    const board = document.getElementById('board');
    const prefixes = ['-o-', '-ms-', '-moz-', '-webkit-'];
    let turn='black';

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
    
    function createBoard() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                
                cell = document.createElement("div");
                cell.setAttribute("id", "cell" + i + "-" + j);
                cell.setAttribute("class", "cell");
                board.appendChild(cell);
            }
            
        }
        cells=document.getElementsByClassName('cell');
        for (let i = 0; i < cells.length; i++) {
            cells[i].addEventListener('click', () => {
                if (!cells[i].querySelector(".tile")) {
                    if (turn == 'black') {
                        turn='white';
                        tilexy=cells[i].id.split('cell',2)[1].split('-',2);
                        boardLayout[parseInt(tilexy[0])][parseInt(tilexy[1])]=2;
                        updateBoard();
                        console.log(cells[i].id.split('cell',2)[1].split('-',2));
                    } else if (turn == 'white'){
                        turn='black';
                        tilexy=cells[i].id.split('cell',2)[1].split('-',2);
                        boardLayout[parseInt(tilexy[0])][parseInt(tilexy[1])]=1;
                        updateBoard();
                        console.log(cells[i].id.split('cell',2)[1].split('-',2));
                    }
                }
                //     tile=cells[i].querySelector('.tile');
                //     if (tile.style.transform == 'rotateY(180deg)') {
                //         tile.style.transform= 'rotateY(0deg)';
                //         tile.classList.remove('white');
                //         tile.classList.add('black');
                //     }else {
                //         tile.style.transform= 'rotateY(180deg)';
                //         tile.classList.remove('black');
                //         tile.classList.add('white');
                //     }
                // }else {
                //     tile=cells[i].querySelector('.tile');
                //     if (tile.style.transform == 'rotateY(180deg)') {
                //         tile.style.transform= 'rotateY(0deg)';
                //         tile.classList.remove('white');
                //         tile.classList.add('black');
                //     }else {
                //         tile.style.transform= 'rotateY(180deg)';
                //         tile.classList.remove('black');
                //         tile.classList.add('white');
                //     }
                // }

            });
        }
    }

    function createTile(color) {
        // const tileContainer = document.createElement('div');
        const tile = document.createElement('div');
        // tile.innerHTML = '<div class="blackside"><div class="black"></div></div><div class="whiteside"><div class="white"></div></div>'
        // const blackSide = document.createElement('div');
        // const whiteSide = document.createElement('div');
        // const blackColor = document.createElement('div');
        // const whiteColor = document.createElement('div');
        tile.classList.add('tile');
        if (color == 'white') {
            tile.classList.add('white');
        } else if (color == 'black'){
            tile.classList.add('black');
        }
        return tile;
    }

    function updateBoard() {
        board.innerHTML="";
        createBoard();
        for (let row = 0; row < 8; row++) {
            for (let column = 0; column < 8; column++) {
                const currentTile = boardLayout[row][column];
                if (currentTile == 0) {
                }
                else {
                    currentTile == 1 ? document.getElementById('cell' + row + '-' + column).appendChild(createTile('black')) : document.getElementById('cell' + row + '-' + column).appendChild(createTile('white'));
                }
            }
        }
    }

    setInterval(createLine, 750);
    updateBoard();

})