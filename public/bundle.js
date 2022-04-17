/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (() => {

eval("\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n    let bird = document.querySelector('.bird');\r\n    let ground = document.querySelector('.ground');\r\n    let gameDisplay = document.querySelector('.game-container');\r\n    let position_bird_left = 220;\r\n    let position_bird_bottom = 180;\r\n    let gravity = 2;\r\n    let click_action = false;\r\n    let isGameOver = false;\r\n    var lastTimeCall_generateObstacleFunction;\r\n    function generateObstacle() {\r\n        let randomHeight = Math.random() * 60;\r\n        let obstacleLeft = 500;\r\n        let obstacleBottom = randomHeight;\r\n        var obstacle = document.createElement('div');\r\n        obstacle.classList.add('obstacle');\r\n        gameDisplay.appendChild(obstacle);\r\n        obstacle.style.left = obstacleLeft + 'px';\r\n        obstacle.style.bottom = obstacleBottom + 'px';\r\n        function moveObstacle() {\r\n            if (isGameOver == false) {\r\n                obstacleLeft -= 2;\r\n                obstacle.style.left = obstacleLeft + 'px';\r\n                if (obstacleLeft === -60) {\r\n                    clearInterval(timerId);\r\n                    gameDisplay.removeChild(obstacle);\r\n                }\r\n                if (obstacleLeft > 200 && obstacleLeft < 280 && position_bird_left === 220 &&\r\n                    position_bird_bottom < obstacleBottom + 153 ||\r\n                    position_bird_bottom === 0) {\r\n                    gameOver();\r\n                }\r\n            }\r\n        }\r\n        let timerId = setInterval(moveObstacle, 20);\r\n    }\r\n    function gameOver() {\r\n        isGameOver = true;\r\n        document.removeEventListener('click', click_confirm);\r\n    }\r\n    function setup() {\r\n        generateObstacle();\r\n        lastTimeCall_generateObstacleFunction = window.performance.now();\r\n    }\r\n    function click_confirm() {\r\n        click_action = true;\r\n    }\r\n    document.addEventListener('click', click_confirm);\r\n    function processInput() {\r\n        if (click_action == true) {\r\n            if (position_bird_bottom < 500)\r\n                position_bird_bottom += 70;\r\n            console.log(position_bird_bottom);\r\n            click_action = false;\r\n        }\r\n    }\r\n    function update(time, delta) {\r\n        if (isGameOver == false) {\r\n            position_bird_bottom -= gravity;\r\n            var deltacallGenerateObstacle = time - lastTimeCall_generateObstacleFunction;\r\n            if (deltacallGenerateObstacle >= 3000) {\r\n                generateObstacle();\r\n                lastTimeCall_generateObstacleFunction = time;\r\n            }\r\n        }\r\n    }\r\n    function render() {\r\n        if (isGameOver == false) {\r\n            bird.style.bottom = position_bird_bottom + 'px';\r\n            bird.style.left = position_bird_left + 'px';\r\n        }\r\n    }\r\n    setup();\r\n    let lastTime = window.performance.now();\r\n    function loop() {\r\n        var time = window.performance.now();\r\n        var delta = time - lastTime;\r\n        processInput();\r\n        update(time, delta);\r\n        render();\r\n        lastTime = time;\r\n        requestAnimationFrame(loop);\r\n    }\r\n    requestAnimationFrame(loop);\r\n});\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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XSwic291cmNlc0NvbnRlbnQiOlsiXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCgpID0+IHtcclxuICAgIGxldCBiaXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJpcmQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgbGV0IGdyb3VuZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncm91bmQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgbGV0IGdhbWVEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtY29udGFpbmVyJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgICBsZXQgcG9zaXRpb25fYmlyZF9sZWZ0ID0gMjIwO1xyXG4gICAgbGV0IHBvc2l0aW9uX2JpcmRfYm90dG9tID0gMTgwO1xyXG4gICAgbGV0IGdyYXZpdHkgPSAyO1xyXG4gICAgbGV0IGNsaWNrX2FjdGlvbiA9IGZhbHNlO1xyXG4gICAgXHJcbiAgICBsZXQgaXNHYW1lT3ZlciA9IGZhbHNlO1xyXG4gICAgdmFyIGxhc3RUaW1lQ2FsbF9nZW5lcmF0ZU9ic3RhY2xlRnVuY3Rpb246IG51bWJlcjtcclxuXHJcbiAgICBmdW5jdGlvbiBnZW5lcmF0ZU9ic3RhY2xlKClcclxuICAgIHtcclxuICAgICAgICBsZXQgcmFuZG9tSGVpZ2h0ID0gTWF0aC5yYW5kb20oKSAqIDYwO1xyXG4gICAgICAgIGxldCBvYnN0YWNsZUxlZnQgPSA1MDA7XHJcbiAgICAgICAgbGV0IG9ic3RhY2xlQm90dG9tID0gcmFuZG9tSGVpZ2h0O1xyXG4gICAgICAgIHZhciBvYnN0YWNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIG9ic3RhY2xlLmNsYXNzTGlzdC5hZGQoJ29ic3RhY2xlJyk7XHJcbiAgICAgICAgZ2FtZURpc3BsYXkuYXBwZW5kQ2hpbGQob2JzdGFjbGUpO1xyXG4gICAgICAgIG9ic3RhY2xlLnN0eWxlLmxlZnQgPSBvYnN0YWNsZUxlZnQgKyAncHgnO1xyXG4gICAgICAgIG9ic3RhY2xlLnN0eWxlLmJvdHRvbSA9IG9ic3RhY2xlQm90dG9tICsgJ3B4JztcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbW92ZU9ic3RhY2xlKCkge1xyXG4gICAgICAgICAgICBpZihpc0dhbWVPdmVyID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBvYnN0YWNsZUxlZnQgLT0gMjtcclxuICAgICAgICAgICAgICAgIG9ic3RhY2xlLnN0eWxlLmxlZnQgPSBvYnN0YWNsZUxlZnQgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgaWYob2JzdGFjbGVMZWZ0ID09PSAtNjApIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVySWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVEaXNwbGF5LnJlbW92ZUNoaWxkKG9ic3RhY2xlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKG9ic3RhY2xlTGVmdCA+IDIwMCAmJiBvYnN0YWNsZUxlZnQgPCAyODAgJiYgcG9zaXRpb25fYmlyZF9sZWZ0ID09PSAyMjAgJiYgXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25fYmlyZF9ib3R0b20gPCBvYnN0YWNsZUJvdHRvbSArIDE1MyB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uX2JpcmRfYm90dG9tID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZU92ZXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdGltZXJJZCA9IHNldEludGVydmFsKG1vdmVPYnN0YWNsZSwyMCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGdhbWVPdmVyKCkge1xyXG4gICAgICAgIGlzR2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tfY29uZmlybSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0dXAoKSB7XHJcbiAgICAgICAgZ2VuZXJhdGVPYnN0YWNsZSgpO1xyXG4gICAgICAgIGxhc3RUaW1lQ2FsbF9nZW5lcmF0ZU9ic3RhY2xlRnVuY3Rpb24gPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGNsaWNrX2NvbmZpcm0oKSB7XHJcbiAgICAgICAgY2xpY2tfYWN0aW9uID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tfY29uZmlybSk7XHJcblxyXG4gICAgZnVuY3Rpb24gcHJvY2Vzc0lucHV0KCkge1xyXG4gICAgICAgIGlmKGNsaWNrX2FjdGlvbiA9PSB0cnVlKVxyXG4gICAgICAgIHsgICBcclxuICAgICAgICAgICAgaWYocG9zaXRpb25fYmlyZF9ib3R0b20gPCA1MDApIHBvc2l0aW9uX2JpcmRfYm90dG9tICs9IDcwO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwb3NpdGlvbl9iaXJkX2JvdHRvbSk7XHJcbiAgICAgICAgICAgIGNsaWNrX2FjdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGUodGltZTogbnVtYmVyLCBkZWx0YTogbnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKGlzR2FtZU92ZXIgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcG9zaXRpb25fYmlyZF9ib3R0b20gLT0gZ3Jhdml0eTtcclxuICAgICAgICAgICAgdmFyIGRlbHRhY2FsbEdlbmVyYXRlT2JzdGFjbGUgPSB0aW1lIC0gbGFzdFRpbWVDYWxsX2dlbmVyYXRlT2JzdGFjbGVGdW5jdGlvbjtcclxuICAgICAgICAgICAgaWYoZGVsdGFjYWxsR2VuZXJhdGVPYnN0YWNsZSA+PSAzMDAwKSB7XHJcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZU9ic3RhY2xlKCk7IFxyXG4gICAgICAgICAgICAgICAgbGFzdFRpbWVDYWxsX2dlbmVyYXRlT2JzdGFjbGVGdW5jdGlvbiA9IHRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVuZGVyKCkge1xyXG4gICAgICAgIGlmKGlzR2FtZU92ZXIgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgYmlyZC5zdHlsZS5ib3R0b20gPSBwb3NpdGlvbl9iaXJkX2JvdHRvbSArICdweCc7XHJcbiAgICAgICAgICAgIGJpcmQuc3R5bGUubGVmdCA9IHBvc2l0aW9uX2JpcmRfbGVmdCArICdweCc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2V0dXAoKVxyXG4gICAgbGV0IGxhc3RUaW1lID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgZnVuY3Rpb24gbG9vcCgpIHtcclxuICAgICAgICB2YXIgdGltZSA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICB2YXIgZGVsdGEgPSB0aW1lIC0gbGFzdFRpbWU7XHJcbiAgICAgICAgcHJvY2Vzc0lucHV0KCk7XHJcbiAgICAgICAgdXBkYXRlKHRpbWUsIGRlbHRhKTtcclxuICAgICAgICByZW5kZXIoKTtcclxuICAgICAgICBsYXN0VGltZSA9IHRpbWU7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApXHJcbiAgICB9XHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcClcclxuXHJcbn0pXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.ts\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.ts"]();
/******/ 	
/******/ })()
;