
document.addEventListener('DOMContentLoaded',() => {
    let bird = document.querySelector('.bird') as HTMLInputElement;
    let ground = document.querySelector('.ground') as HTMLInputElement;
    let gameDisplay = document.querySelector('.game-container') as HTMLInputElement;
    let position_bird_left = 220;
    let position_bird_bottom = 180;
    let gravity = 2;
    let click_action = false;
    let gap = 450;
    let currentScore = 0;
    
    let isGameOver = false;
    var lastTimeCall_generateObstacleFunction: number;

    function generateObstacle()
    {
        let randomHeight = Math.random() * 60;
        let obstacleLeft = 500;
        let obstacleBottom = randomHeight;
        var obstacle = document.createElement('div');
        var topObstacle = document.createElement('div');
        var updateScore = false;
        if(isGameOver == false) {
            obstacle.classList.add('obstacle');
            topObstacle.classList.add('topObstacle');
        }
        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topObstacle);
        obstacle.style.left = obstacleLeft + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
        topObstacle.style.left = obstacleLeft + 'px';
        topObstacle.style.bottom = obstacleBottom +gap + 'px';
        function moveObstacle() {
            if(isGameOver == false) {
                obstacleLeft -= 2;
                obstacle.style.left = obstacleLeft + 'px';
                topObstacle.style.left = obstacleLeft + 'px';
                if(obstacleLeft === -60) {
                    clearInterval(timerId);
                    gameDisplay.removeChild(obstacle);
                    gameDisplay.removeChild(topObstacle);
                }
                if(obstacleLeft > 200 && obstacleLeft < 280 && position_bird_left === 220 && 
                    (position_bird_bottom < obstacleBottom + 153 || 
                        position_bird_bottom > obstacleBottom + gap - 200) ||
                    position_bird_bottom === 0) {
                    gameOver();
                    
                }
                if(updateScore == false)
                    if(obstacleLeft + 60 <= position_bird_left ) {
                        currentScore += 1;
                        console.log("your score:" + currentScore);
                        updateScore = true;
                    }
            }
        }
        let timerId = setInterval(moveObstacle,20);
    }
    
    function gameOver() {
        isGameOver = true;
        document.removeEventListener('click', click_confirm);
        console.log('Game over');
    }

    function setup() {
        generateObstacle();
        lastTimeCall_generateObstacleFunction = window.performance.now();
    }
    
    function click_confirm() {
        click_action = true;
    }
    document.addEventListener('click', click_confirm);

    function processInput() {
        if(click_action == true)
        {   
            if(position_bird_bottom < 500) position_bird_bottom += 50;
            //console.log(position_bird_bottom);
            click_action = false;
        }
    }

    function update(time: number, delta: number)
    {
        if(isGameOver == false) {
            position_bird_bottom -= gravity;
            var deltacallGenerateObstacle = time - lastTimeCall_generateObstacleFunction;
            if(deltacallGenerateObstacle >= 3000) {
                generateObstacle(); 
                lastTimeCall_generateObstacleFunction = time;
            }
        }
    }

    function render() {
        if(isGameOver == false) {
            bird.style.bottom = position_bird_bottom + 'px';
            bird.style.left = position_bird_left + 'px';
        }else {
            var text_score =  document.getElementsByClassName("text_score");
            text_score[0].innerHTML = "Your score is: " + currentScore;
            var restart_button = document.querySelector('.restart-button') as HTMLInputElement;
            restart_button.style.zIndex = "+2";
        }
    }
    setup()
    let lastTime = window.performance.now();
    function loop() {
        var time = window.performance.now();
        var delta = time - lastTime;
        processInput();
        update(time, delta);
        render();
        lastTime = time;
        requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)

})