
document.addEventListener('DOMContentLoaded',() => {
    let bird = document.querySelector('.bird') as HTMLInputElement;
    let ground = document.querySelector('.ground') as HTMLInputElement;
    let gameDisplay = document.querySelector('.game-container') as HTMLInputElement;

    let position_bird_left = 220;
    let position_bird_bottom = 100;
    let gravity = 2;

    function jump() {
        if(position_bird_bottom < 500) position_bird_bottom += 50;
        console.log(position_bird_bottom);
    }

    function processInput() {
        document.addEventListener('click', jump);
    }

    function update(time: number, delta: number)
    {
        position_bird_bottom -= gravity;
    }

    function render() {
        bird.style.bottom = position_bird_bottom + 'px';
        bird.style.left = position_bird_left + 'px';
    }

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
