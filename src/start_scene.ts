import { change_to_next_scene } from "./index";

var click_play = false;

export class start_scene {
    private gameDisplay: HTMLInputElement;
    private start_button = document.createElement("BUTTON");
    // public click_play: number;

    constructor() {
        this.gameDisplay = document.querySelector('.game-container') as HTMLInputElement;
        this.start_button = document.createElement("BUTTON");
        this.start_button.classList.add('start-button');
        this.gameDisplay.appendChild(this.start_button);
        // clicked play again
        // this.click_play = 0;
    }

    private clickPlay()
    {
        //this.click_play = true;        
        // console.log(this.click_play);
        click_play = true;
    }

    start_scence_setup()
    {
        // For button
        this.start_button.classList.add('start-button');
        this.gameDisplay.appendChild(this.start_button);
        this.start_button.innerText = 'Play';
        console.log('come to set up');
        this.start_button.onclick = this.clickPlay;
        console.log('finish set up');
    }

    start_scence_render()
    {
        // if(this.click_play == 1)
        // {
        //     this.click_play = 0;
        //     this.start_button.remove();
        //     change_to_next_scene(0, true);
        //     console.log('change to next scene');
        // }

        if(click_play == true)
        {
            click_play = false;
            this.start_button.remove();
            change_to_next_scene(0, true);
            console.log('change to next scene');
        }
    }    
}

// let gameDisplay = document.querySelector('.game-container') as HTMLInputElement;
// let start_button = document.createElement("BUTTON");

// // clicked play again
// var click_play = false;

// function clickPlay()
// {
//     click_play = true;
// }

// export function start_scence_setup()
// {
//     // For button
//     start_button.classList.add('start-button');
//     gameDisplay.appendChild(start_button);
//     start_button.innerText = 'Play';
//     start_button.onclick = function() {clickPlay()};;
// }

// export function start_scence_render()
// {
//     if(click_play == true)
//     {
//         click_play = false;
//         start_button.remove();
//         change_to_next_scene(0, true);
//     }
// }
