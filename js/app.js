window.addEventListener('load', () => {

    // Initial board state, 1 being black and 2 being white
    var boardLayout = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 0, 1, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ]

    // Background colors
    const colors = [
        '#2196f3',
        '#e91e63',
        '#ffeb3b',
        '#74ff1d'
    ]

    // Directions to look for when capturing tiles
    const directions = [
        [0,1],
        [1,1],
        [1,0],
        [1,-1],
        [0,-1],
        [-1,-1],
        [-1,0],
        [-1,1]
    ]

    var tilesCaptured = [];
    const board = document.getElementById('board');
    const playerScore = document.getElementById('playerScore');
    const AIScore = document.getElementById('AIScore');
    const announcer = document.getElementById('announcer');
    const helpIcon = document.getElementById('helpIcon');
    const rules = document.getElementById('rules');
    const gotIt = document.getElementById('gotIt');
    let turn='black';

    // Creates background lines
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

    helpIcon.addEventListener('click', () => {
        if (rules.classList.contains('showRules')) {
            rules.classList.remove('showRules');
            rules.classList.add('hideRules');
            gotIt.classList.add('hidden');
            setTimeout(() => {
                rules.classList.add('hidden');
            }, 1300);
        } else {
            rules.classList.remove('hidden');
            rules.classList.remove('hideRules');
            rules.classList.add('showRules');
            setTimeout(() => {
                gotIt.classList.remove('hidden');
            }, 1300);
        }
    });

    gotIt.addEventListener('click', () => {
        rules.classList.remove('showRules');
        rules.classList.add('hideRules');
        gotIt.classList.add('hidden');
        setTimeout(() => {
            rules.classList.add('hidden');
        }, 1300);
    });

    // When a game is over, the announcer will ask to play again after showing the match result. Clicking it will reset everything to start again.
    announcer.addEventListener('click', () => {
        if (announcer.classList.contains('playAgain')) {
            announcer.classList.remove('playAgain');
            announcer.style.visibility = 'hidden';
            turn = "black";
            boardLayout = [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 2, 1, 0, 0, 0],
                [0, 0, 0, 1, 2, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0]
            ]
            updateBoard();
        }
    });
    
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

        // Click event for player/s on valid cells
        for (let i = 0; i < cells.length; i++) {
            cells[i].addEventListener('click', () => {
                if (!cells[i].querySelector(".tile validMove")) {
                    tilexy=cells[i].id.split('cell',2)[1].split('-',2);
                    row = parseInt(tilexy[0]);
                    column = parseInt(tilexy[1]);
                    if (boardLayout[row][column] == 3) {
                        if (turn == 'black') {
                            boardLayout[row][column]=1;
                            move=[row,column];
                            captureTiles(move);
                            turn='white';
                            updateBoard();
                            canmove();
                        } 
                        // Multiplayer
                        /* else if (turn == 'white'){
                            boardLayout[row][column]=2;
                            move=[row,column];
                            captureTiles(move);
                            turn='black';
                            updateBoard();
                            canmove();
                        } */
                    }
                }
            });
        }
    }

    function createTile(color) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        if (color == 'white') {
            tile.classList.add('white');
        } else if (color == 'black'){
            tile.classList.add('black');
        } else if (color == 'validMove'){
            tile.classList.add('validMove');
        }
        return tile;
    }

    function updateScore() {
        let playerScoreUpdate = 0;
        let AIScoreUpdate = 0;

        for (let row = 0; row < 8; row++) {
            for (let column = 0; column < 8; column++) {
                let value = boardLayout[row][column];
                if (value == 1) {
                    playerScoreUpdate++;
                } else if (value == 2) {
                    AIScoreUpdate++;
                }
            }
        }

        playerScore.innerHTML = "You: " + playerScoreUpdate;
        AIScore.innerHTML = "AI: " + AIScoreUpdate;

    }

    function updateBoard() {
        board.innerHTML="";
        resetValidMoves();
        createBoard();
        checkValidMoves();
        for (let row = 0; row < 8; row++) {
            for (let column = 0; column < 8; column++) {
                const currentTile = boardLayout[row][column];
                if (currentTile == 3 && turn == 'black') {
                    document.getElementById('cell' + row + '-' + column).appendChild(createTile('validMove'));
                }else if (currentTile == 1){
                    document.getElementById('cell' + row + '-' + column).appendChild(createTile('black'));
                }
                else if (currentTile == 2){
                    document.getElementById('cell' + row + '-' + column).appendChild(createTile('white'));
                }
            }
        }

        if (tilesCaptured.length != 0) {
            for (let i = 0; i < tilesCaptured.length; i++) {
                rotateTile(tilesCaptured[i]);
            }
        }
        tilesCaptured=[];
        
        updateScore();

    }

    function gameFinish() {
        let finalPlayerScore = 0;
        let finalAIScore = 0;
        let scoreToSend = 0;

        for (let row = 0; row < 8; row++) {
            for (let column = 0; column < 8; column++) {
                let value = boardLayout[row][column];
                if (value == 1) {
                    finalPlayerScore++;
                } else if (value == 2) {
                    finalAIScore++;
                }
            }
        }

        if (finalPlayerScore > finalAIScore) {
            announcer.innerHTML = "YOU WIN";
            scoreToSend = finalPlayerScore*10;
        } else if (finalAIScore > finalPlayerScore) {
            announcer.innerHTML = "AI WINS";
            scoreToSend = -(finalAIScore*6);
        } else {
            announcer.innerHTML = "TIE";
        }

        announcer.style.visibility = "visible";
        send_score(scoreToSend);

        setTimeout(()=> {
            announcer.innerHTML = "PLAY AGAIN";
            announcer.classList.add('playAgain');
        }, 1500);

    }

    // Reset the moves that were valid before to 0 to replace them with the new ones 
    function resetValidMoves() {
        for (let row = 0; row < 8; row++) {
            for (let column = 0; column < 8; column++) {
                if (boardLayout[row][column] == 3) {
                    boardLayout[row][column] = 0;
                }
            }
        }
    }

    // Checks if player or AI can do a move, if no one can, the game ends
    function canmove() { 
        move=false;
        finish=true;
        // Check if there are valid moves on the board for the player or the AI
        for (let row = 0; row < 8; row++) {
            for (let column = 0; column < 8; column++) {
                if (boardLayout[row][column] == 3) {
                    move=true;
                }
            }
        }

        // Checks if there are no more spaces to place tiles on
        for (let row = 0; row < 8; row++) {
            for (let column = 0; column < 8; column++) {
                if (boardLayout[row][column] == 0 || boardLayout[row][column] == 3) {
                    finish=false;
                }
            }
        }
        if (finish==true) {
            gameFinish();
        }
        if (move==true && turn=='white' && finish==false) {
            playIA();
        }

        setTimeout(()=> {
            if (move==false && finish==false) {
                // If a player can't move, the turn will be passed automatically
                if (turn=='black') {
                    turn='white';
                    updateBoard();
                    for (let row = 0; row < 8; row++) {
                        for (let column = 0; column < 8; column++) {
                            if (boardLayout[row][column] == 3) {
                                move=true;
                            }
                        }
                    }
                    if (move==true) {
                        playIA();
                    }else if (move==false) {
                        gameFinish()
                    }
                }else if (turn=='white') {
                    turn='black';
                    updateBoard();
                    for (let row = 0; row < 8; row++) {
                        for (let column = 0; column < 8; column++) {
                            if (boardLayout[row][column] == 3) {
                                move=true;
                            }
                        }
                    }
                    if (move==false) {
                        gameFinish()
                    }
                }
            }
        }, 500)
    }

    // Looks for places where there are no tiles
    function checkValidMoves() {
        for (let row = 0; row < 8; row++) {
            for (let column = 0; column < 8; column++) {
                cell=[row,column];
                if (boardLayout[cell[0]][cell[1]] != 2 && boardLayout[cell[0]][cell[1]] != 1) {
                    if (checkMoves(cell)) {
                        boardLayout[cell[0]][cell[1]]=3;
                    };
                }
            }
        }
    }

    // Checks if there are rival tiles next to each empty cell
    function checkMoves(move) {
        for (let i = 0; i < 8; i++) {
            result=false;
            if (turn=='black') {
                if ( !(move[0]+directions[i][0] < 0) && !(move[0]+directions[i][0] > 7) && !(move[1]+directions[i][1] < 0) && !(move[0]+directions[i][0] > 7)) {
                    cellcheck=[move[0]+directions[i][0],move[1]+directions[i][1]];
                    if (boardLayout[cellcheck[0]][cellcheck[1]] == 2) {
                        if (checkDirections(directions[i],move)) {
                            result=true;
                            return result;
                        }
                    }
                }
            }else if (turn=='white') {
                if ( !(move[0]+directions[i][0] < 0) && !(move[0]+directions[i][0] > 7) && !(move[1]+directions[i][1] < 0) && !(move[0]+directions[i][0] > 7)) {
                    cellcheck=[move[0]+directions[i][0],move[1]+directions[i][1]];
                    if (boardLayout[cellcheck[0]][cellcheck[1]] == 1) {
                        if (checkDirections(directions[i],move)) {
                            result=true;
                            return result;
                        }
                    }
                }
            }
        }
        return result;
    }

    // Makes sure a move and direction are valid
    function checkDirections(direction,move) {
        let check=false;
        let found=false;
        rep=1;
        while (check==false) {
            // Avoids the direction check to go outside the board
            if ( !((move[0]+(direction[0]*rep)) < 0) && !((move[0]+(direction[0]*rep)) > 7) && !((move[1]+(direction[1]*rep)) < 0) && !((move[1]+(direction[1]*rep)) > 7)) {
                if (turn=='black') {
                    cellcheck=[move[0]+(direction[0]*rep),move[1]+(direction[1]*rep)];
                    if (boardLayout[cellcheck[0]][cellcheck[1]] == 2) {
                        found=false;
                        check=false;
                    }else if (boardLayout[cellcheck[0]][cellcheck[1]] == 1) {
                        found=true;
                        check=true;
                    }else if ((boardLayout[cellcheck[0]][cellcheck[1]] == 0)){
                        found=false;
                        check=true;
                    }else if ((boardLayout[cellcheck[0]][cellcheck[1]] == 3)){
                        found=false;
                        check=true;
                    }
                }else if (turn=='white') {
                    cellcheck=[move[0]+(direction[0]*rep),move[1]+(direction[1]*rep)];
                    if (boardLayout[cellcheck[0]][cellcheck[1]] == 2) {
                        found=true;
                        check=true;
                    }else if ((boardLayout[cellcheck[0]][cellcheck[1]] == 0)){
                        found=false;
                        check=true;
                    }else if ((boardLayout[cellcheck[0]][cellcheck[1]] == 3)){
                        found=false;
                        check=true;
                    }
                }
            }else {
                found=false;
                check=true
            }
            rep++
        }
        return found;
    }

    function captureTiles(move) {
        checkMove(move);
    }

    // Gets the direction where rival tiles might be captured by the placed tile
    function checkMove(move) {
        for (let i = 0; i < 8; i++) {
            if (turn=='black') {
                if ( !(move[0]+directions[i][0] < 0) && !(move[0]+directions[i][0] > 7) && !(move[1]+directions[i][1] < 0) && !(move[0]+directions[i][0] > 7)) {
                    cellcheck=[move[0]+directions[i][0],move[1]+directions[i][1]];
                    if (boardLayout[cellcheck[0]][cellcheck[1]] == 2) {
                        checkDirection(directions[i],move);
                    }
                }
            }else if (turn=='white') {
                if ( !(move[0]+directions[i][0] < 0) && !(move[0]+directions[i][0] > 7) && !(move[1]+directions[i][1] < 0) && !(move[0]+directions[i][0] > 7)) {
                    cellcheck=[move[0]+directions[i][0],move[1]+directions[i][1]];                    
                    if (boardLayout[cellcheck[0]][cellcheck[1]] == 1) {
                        checkDirection(directions[i],move);
                    }
                }
            }
        }
    }

    // Looks through all the directions that a tile might capture, checks if it can actually capture in that direction and captures those tiles
    function checkDirection(direction,move) {
        check=false;
        found=false;
        rep=1;
        while (check==false) {
            // Avoids the direction check to go outside the board
            if ( !((move[0]+(direction[0]*rep)) < 0) && !((move[0]+(direction[0]*rep)) > 7) && !((move[1]+(direction[1]*rep)) < 0) && !((move[1]+(direction[1]*rep)) > 7)) {                
                if (turn=='black') {
                    cellcheck=[move[0]+(direction[0]*rep),move[1]+(direction[1]*rep)];
                    if (boardLayout[cellcheck[0]][cellcheck[1]] == 1) {
                        found=true;
                        for (let i = 1; i <= rep; i++) {
                            cellcapture=[move[0]+(direction[0]*i),move[1]+(direction[1]*i)];
                            boardLayout[cellcapture[0]][cellcapture[1]]=1;
                            if (i != rep) {
                                tilesCaptured.push(cellcapture);
                            }
                        }
                        check=true;
                    }else if ((boardLayout[cellcheck[0]][cellcheck[1]] == 0)){
                        found=false;
                        check=true;
                    }else if ((boardLayout[cellcheck[0]][cellcheck[1]] == 3)){
                        found=false;
                        check=true;
                    }
                }else if (turn=='white') {
                    cellcheck=[move[0]+(direction[0]*rep),move[1]+(direction[1]*rep)];
                    if (boardLayout[cellcheck[0]][cellcheck[1]] == 2) {
                        found=true;
                        for (let i = 1; i <= rep; i++) {
                            cellcapture=[move[0]+(direction[0]*i),move[1]+(direction[1]*i)];
                            boardLayout[cellcapture[0]][cellcapture[1]]=2;
                            if (i != rep) {
                                tilesCaptured.push(cellcapture);
                            }
                        }
                        check=true;
                    }else if ((boardLayout[cellcheck[0]][cellcheck[1]] == 0)){
                        found=false;
                        check=true;
                    }else if ((boardLayout[cellcheck[0]][cellcheck[1]] == 3)){
                        found=false;
                        check=true;
                    }
                }
            }else {
                found=false;
                check=true
            }
            rep++
        }
    }

    function playIA() {
        posibleplays=[];
        boardLayout.map((lines,index) => {
            lines.map((cell,childindex) => {
                if (cell == 3) {
                    posibleplays[posibleplays.length]=[index,childindex];
                }
            })
        })
        indexplay=Math.floor(Math.random() * ((posibleplays.length -1) - 0 + 1) + 0);
        play=posibleplays[indexplay];
        row=play[0];
        column=play[1];
        boardLayout[row][column]=2;
        move=[row,column];
        setTimeout(()=> {
            captureTiles(move);
            turn='black';
            updateBoard();
            canmove();
        }, 1500)
    }

    // Send score to server
    function send_score(variableScore) {
        var token = localStorage.getItem("token");
        if (token) {
            var http = new XMLHttpRequest();
            var url = 'http://0.0.0.0:4000/api/rank/update';
            var params = JSON.stringify({
                nameGame: "Reversi",
                score: variableScore
            });
            http.open('POST', url, true);
    
            //Send the proper header information along with the request
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            http.setRequestHeader('Authorization', 'Token ' + token);
    
            http.onreadystatechange = function() { //Call a function when the state changes.
                if (http.readyState == 4 && http.status == 200) {
                    console.log(http.responseText);
                }
            }
            http.send(params);
        }
    }

    // Tile rotation animation
    function rotateTile(tile) {
        if (document.getElementById('cell'+tile[0]+"-"+tile[1]).childNodes[0].classList.contains('black')) {
            document.getElementById('cell'+tile[0]+"-"+tile[1]).childNodes[0].classList.remove('black');
            document.getElementById('cell'+tile[0]+"-"+tile[1]).childNodes[0].classList.add('white');
        } else {
            document.getElementById('cell'+tile[0]+"-"+tile[1]).childNodes[0].classList.remove('white');
            document.getElementById('cell'+tile[0]+"-"+tile[1]).childNodes[0].classList.add('black');
        }
        setTimeout(()=> {
            document.getElementById('cell'+tile[0]+"-"+tile[1]).childNodes[0].style.transform= 'rotateY(180deg)';
        }, 20)

        setTimeout(()=> {
            if (document.getElementById('cell'+tile[0]+"-"+tile[1]).childNodes[0].classList.contains('black')) {
                document.getElementById('cell'+tile[0]+"-"+tile[1]).childNodes[0].classList.remove('black');
                document.getElementById('cell'+tile[0]+"-"+tile[1]).childNodes[0].classList.add('white');
            } else {
                document.getElementById('cell'+tile[0]+"-"+tile[1]).childNodes[0].classList.remove('white');
                document.getElementById('cell'+tile[0]+"-"+tile[1]).childNodes[0].classList.add('black');
            }
        }, 207)
    }

    setInterval(createLine, 750);
    updateBoard();

});