import { change_to_next_scene } from "./index";


let gameDisplay = document.querySelector('.game-container') as HTMLInputElement;
let start_button = document.createElement("BUTTON");

// clicked play again
var click_play = false;

function clickPlay()
{
    click_play = true;
}

export function start_scence_setup()
{
    // For button
    start_button.classList.add('start-button');
    gameDisplay.appendChild(start_button);
    start_button.innerText = 'Play';
    start_button.onclick = function() {clickPlay()};;
}

export function start_scence_render()
{
    if(click_play == true)
    {
        click_play = false;
        start_button.remove();
        change_to_next_scene(0, true);
    }
}
