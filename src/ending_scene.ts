import { change_to_next_scene } from "./index";

var click_play_again = false;

export class ending_scene {
    private score: number;
    private highscore: number;
    private gameDisplay: HTMLInputElement;
    private text_score: HTMLDivElement;
    private high_score: HTMLDivElement;
    private restart_button: HTMLElement;
    // clicked play again
    //private click_play_again: boolean;

    constructor() {
        this.score = 0;
        this.highscore = 0;
        this.gameDisplay = document.querySelector('.game-container') as HTMLInputElement;
        this.text_score = document.createElement('div');
        this.high_score = document.createElement('div');
        this.restart_button = document.createElement("BUTTON");
        // clicked play again
        //this.click_play_again = false;
    }

    private clickPlayAgain()
    {
        //this.click_play_again = true;
        click_play_again = true;
    }

    updateNewScore(newScore: number)
    {
        this.score = newScore;
        if(this.highscore < newScore)
            this.highscore = newScore;
    }

    ending_scene_setup()
    {
        // For text
        this.text_score.classList.add('text_score');
        this.high_score.classList.add('high_score');
        this.gameDisplay.appendChild(this.text_score);
        this.gameDisplay.appendChild(this.high_score);
        this.text_score.innerHTML = "Your score: " + this.score;
        this.high_score.innerHTML = "High score: " + this.highscore;
        // For button
        this.restart_button.classList.add('restart-button');
        this.gameDisplay.appendChild(this.restart_button);
        this.restart_button.innerText = 'Play again';
        this.restart_button.onclick = this.clickPlayAgain;
    }

    ending_scene_render()
    {
        // if(this.click_play_again == true)
        // {
        //     this.click_play_again = false;
        //     this.text_score.remove();
        //     this.high_score.remove();
        //     this.restart_button.remove();
        //     change_to_next_scene(0, true);
        // }
        if(click_play_again == true)
        {
            click_play_again = false;
            this.text_score.remove();
            this.high_score.remove();
            this.restart_button.remove();
            change_to_next_scene(0, true);
        }
    }   
}

// var score = 0;
// var highscore = 0;
// let gameDisplay = document.querySelector('.game-container') as HTMLInputElement;
// let text_score = document.createElement('div');
// let high_score = document.createElement('div');
// let restart_button = document.createElement("BUTTON");

// // clicked play again
// var click_play_again = false;

// function clickPlayAgain()
// {
//     click_play_again = true;
// }

// export function updateNewScore(newScore: number)
// {
//     score = newScore;
//     if(highscore < newScore)
//         highscore = newScore;
// }

// export function ending_scene_setup()
// {
//     // For text
//     text_score.classList.add('text_score');
//     high_score.classList.add('high_score');
//     gameDisplay.appendChild(text_score);
//     gameDisplay.appendChild(high_score);
//     text_score.innerHTML = "Your score: " + score;
//     high_score.innerHTML = "High score: " + highscore;
//     // For button
//     restart_button.classList.add('restart-button');
//     gameDisplay.appendChild(restart_button);
//     restart_button.innerText = 'Play again';
//     restart_button.onclick = function() {clickPlayAgain()};;
// }

// export function ending_scene_render()
// {
//     if(click_play_again == true)
//     {
//         click_play_again = false;
//         text_score.remove();
//         high_score.remove();
//         restart_button.remove();
//         change_to_next_scene(0, true);
//     }
// }