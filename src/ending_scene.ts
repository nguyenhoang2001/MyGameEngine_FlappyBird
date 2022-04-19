import { change_to_next_scene } from "./index";

var score = 0;
var highscore = 0;
let gameDisplay = document.querySelector('.game-container') as HTMLInputElement;
let text_score = document.createElement('div');
let high_score = document.createElement('div');
let restart_button = document.createElement("BUTTON");

// clicked play again
var click_play_again = false;

function clickPlayAgain()
{
    click_play_again = true;
}

export function updateNewScore(newScore: number)
{
    score = newScore;
    if(highscore < newScore)
        highscore = newScore;
}

export function ending_scene_setup()
{
    // For text
    text_score.classList.add('text_score');
    high_score.classList.add('high_score');
    gameDisplay.appendChild(text_score);
    gameDisplay.appendChild(high_score);
    text_score.innerHTML = "Your score: " + score;
    high_score.innerHTML = "High score: " + highscore;
    // For button
    restart_button.classList.add('restart-button');
    gameDisplay.appendChild(restart_button);
    restart_button.innerText = 'Play again';
    restart_button.onclick = function() {clickPlayAgain()};;
}

export function ending_scene_render()
{
    if(click_play_again == true)
    {
        click_play_again = false;
        text_score.remove();
        high_score.remove();
        restart_button.remove();
        change_to_next_scene(0, true);
    }
}