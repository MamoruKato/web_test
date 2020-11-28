document.addEventListener('DOMContentLoaded',()=>{
    const grid = document.querySelector('.grid');
    const ScoreDisplay = document.querySelector('#score');
    const StartBtn = document.querySelector('#start-button');
    const width = 10;

    let squares = Array.from(document.querySelectorAll('.grid div'));
    let nextRandom = 0;
    let score = 0;

    //The tetrominoes
    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
      ]

        
    const zTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ]

    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ]

    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ]

    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ]

    const Tetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    //random select a tetromino and its  position 
    let currentPosition = 4;
    let currentRotation = 0;
    let random = Math.floor(Math.random()*Tetrominoes.length)
    let current = Tetrominoes[random][currentRotation];

    //Draw tetromino
    function draw()
    {
        current.forEach(index =>{
            squares[currentPosition + index].classList.add('tetromino');
        })
    }

    //Undraw the tetromino
    function undraw()
    {
        current.forEach( index => {
            squares[currentPosition + index].classList.remove('tetromino');
        })
    }

    draw();
    //Move down Tetromino
    //timerId = setInterval(moveDown,1000)
    timerId = null;

    //assign functions to keyCodes
    function control(e)
    {
        if(e.keyCode == 37 || e.keyCode == 65)
        {
            moveLeft();
        }
        else if(e.keyCode == 83 || e.keyCode == 40)
        {
            moveDown();
        }
        else if(e.keyCode == 68 || e.keyCode == 39)
        {
            moveRight();
        }
        else if(e.keyCode == 32)
        {
            rotate();
        }
    }
    moveLeftId = document.addEventListener('keyup',control)


    //move down FUNCTION
    function moveDown()
    {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }

    //Freeze function
    function freeze()
    {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            //start new tetromino falling
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * Tetrominoes.length)
            current = Tetrominoes[random][0]
            currentPosition = 4
            draw()
            displayShape();
            addScore();
            gameOver();
        }
    }

    //move the tetromino left
    function moveLeft()
    {
        undraw();

        const isAtLeftEdge = current.some(index => (currentPosition + index) % width == 0)
        if(!isAtLeftEdge) currentPosition -= 1;

        if(current.some(index => squares[currentPosition + index].classList.contains('taken')))
        {
            currentPosition += 1
        }
        draw();
    }

    //move the tetromino right
    function moveRight()
    {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width == width - 1)

        if(!isAtRightEdge) currentPosition += 1;

        if(current.some(index => squares[currentPosition + index].classList.contains('taken')))
        {
            currentPosition -+ 1;
        }
        draw();
    }

    //rotate tetromino
    function rotate()
    {
        undraw();
        let oldRotation  = currentRotation;
        currentRotation++;
        if(currentRotation == current.length)
        {
            currentRotation = 0;
        }

        current = Tetrominoes[random][currentRotation];
        const overRighEdge = current.some(index => (currentPosition + index) % width == width - 1)
        const overLeftEdge = current.some(index => (currentPosition + index) % width == 0)
        
        if(overLeftEdge || overRighEdge)
        {
            currentRotation = oldRotation;
        }
        current = Tetrominoes[random][currentRotation];

        draw();
    }

    //show up-next tetromino in mini-grid
    const displaySquares = document.querySelectorAll('.mini-grid div');
    const displayWidth = 4;
    let displayIndex = 0;

    //the Tetromino without rotations
    const upNextTetrominoes = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], //ltetromino
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],//ztetromino
        [1, displayWidth, displayWidth + 1, displayWidth + 2],//ttetromino
        [0, 1, displayWidth, displayWidth + 1],//otetromino
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],//itetromino
    ]

    //display next tetromino in the small display
    function displayShape()
    {
        //remove any trace of a tetromino form from entire grid
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
        })
        
        upNextTetrominoes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetromino')
        })


    }

    //add functionality to start/pause button
    StartBtn.addEventListener('click',() => {
        if(timerId)
        {
            clearInterval(timerId);
            timerId = null;
        }
        else
        {
            draw();
            timerId = setInterval(moveDown,1000);
        }
    })
    //add score
    function addScore()
    {
        for(let i = 0; i < 199; i+=width)
        {
            const row = [i,i+1, i+2, i +3, i+4, i+5, i+6, i+7 , i+8, i+9];
            if(row.every(index=> squares[index].classList.contains('taken')))
            {
                score += 10;
                ScoreDisplay.innerHTML = score;
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetromino')

                })
                const squaresRemoved = squares.splice(i,width);
                squares = squaresRemoved.concat(squares);
                squares.forEach(cell => grid.appendChild(cell));
            }

        }
    }
    

    //add game over feature
    function gameOver()
    {
        if(current.some(index => squares[currentPosition + index].classList.contains('taken')))
        {
            ScoreDisplay.innerHTML = "Game Over";
            clearInterval(timerId);
        }
    }
})