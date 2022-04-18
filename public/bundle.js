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

eval("\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n    let bird = document.querySelector('.bird');\r\n    let ground = document.querySelector('.ground');\r\n    let gameDisplay = document.querySelector('.game-container');\r\n    let position_bird_left = 220;\r\n    let position_bird_bottom = 180;\r\n    let gravity = 2;\r\n    let click_action = false;\r\n    let gap = 450;\r\n    let currentScore = 0;\r\n    let isGameOver = false;\r\n    var lastTimeCall_generateObstacleFunction;\r\n    function generateObstacle() {\r\n        let randomHeight = Math.random() * 60;\r\n        let obstacleLeft = 500;\r\n        let obstacleBottom = randomHeight;\r\n        var obstacle = document.createElement('div');\r\n        var topObstacle = document.createElement('div');\r\n        var updateScore = false;\r\n        if (isGameOver == false) {\r\n            obstacle.classList.add('obstacle');\r\n            topObstacle.classList.add('topObstacle');\r\n        }\r\n        gameDisplay.appendChild(obstacle);\r\n        gameDisplay.appendChild(topObstacle);\r\n        obstacle.style.left = obstacleLeft + 'px';\r\n        obstacle.style.bottom = obstacleBottom + 'px';\r\n        topObstacle.style.left = obstacleLeft + 'px';\r\n        topObstacle.style.bottom = obstacleBottom + gap + 'px';\r\n        function moveObstacle() {\r\n            if (isGameOver == false) {\r\n                obstacleLeft -= 2;\r\n                obstacle.style.left = obstacleLeft + 'px';\r\n                topObstacle.style.left = obstacleLeft + 'px';\r\n                if (obstacleLeft === -60) {\r\n                    clearInterval(timerId);\r\n                    gameDisplay.removeChild(obstacle);\r\n                    gameDisplay.removeChild(topObstacle);\r\n                }\r\n                if (obstacleLeft > 200 && obstacleLeft < 280 && position_bird_left === 220 &&\r\n                    (position_bird_bottom < obstacleBottom + 153 ||\r\n                        position_bird_bottom > obstacleBottom + gap - 200) ||\r\n                    position_bird_bottom === 0) {\r\n                    gameOver();\r\n                }\r\n                if (updateScore == false)\r\n                    if (obstacleLeft + 60 <= position_bird_left) {\r\n                        currentScore += 1;\r\n                        console.log(\"your score:\" + currentScore);\r\n                        updateScore = true;\r\n                    }\r\n            }\r\n        }\r\n        let timerId = setInterval(moveObstacle, 20);\r\n    }\r\n    function gameOver() {\r\n        isGameOver = true;\r\n        document.removeEventListener('click', click_confirm);\r\n        console.log('Game over');\r\n    }\r\n    function setup() {\r\n        generateObstacle();\r\n        lastTimeCall_generateObstacleFunction = window.performance.now();\r\n    }\r\n    function click_confirm() {\r\n        click_action = true;\r\n    }\r\n    document.addEventListener('click', click_confirm);\r\n    function processInput() {\r\n        if (click_action == true) {\r\n            if (position_bird_bottom < 500)\r\n                position_bird_bottom += 50;\r\n            //console.log(position_bird_bottom);\r\n            click_action = false;\r\n        }\r\n    }\r\n    function update(time, delta) {\r\n        if (isGameOver == false) {\r\n            position_bird_bottom -= gravity;\r\n            var deltacallGenerateObstacle = time - lastTimeCall_generateObstacleFunction;\r\n            if (deltacallGenerateObstacle >= 3000) {\r\n                generateObstacle();\r\n                lastTimeCall_generateObstacleFunction = time;\r\n            }\r\n        }\r\n    }\r\n    function render() {\r\n        if (isGameOver == false) {\r\n            bird.style.bottom = position_bird_bottom + 'px';\r\n            bird.style.left = position_bird_left + 'px';\r\n        }\r\n        else {\r\n            var text_score = document.getElementsByClassName(\"text_score\");\r\n            text_score[0].innerHTML = \"Your score is: \" + currentScore;\r\n            var restart_button = document.querySelector('.restart-button');\r\n            restart_button.style.zIndex = \"+2\";\r\n        }\r\n    }\r\n    setup();\r\n    let lastTime = window.performance.now();\r\n    function loop() {\r\n        var time = window.performance.now();\r\n        var delta = time - lastTime;\r\n        processInput();\r\n        update(time, delta);\r\n        render();\r\n        lastTime = time;\r\n        requestAnimationFrame(loop);\r\n    }\r\n    requestAnimationFrame(loop);\r\n});\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RS9CLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL215Z2FtZWVuZ2luZV9mbGFwcHliaXJkLy4vc3JjL2luZGV4LnRzP2ZmYjQiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCgpID0+IHtcclxuICAgIGxldCBiaXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJpcmQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgbGV0IGdyb3VuZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncm91bmQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgbGV0IGdhbWVEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtY29udGFpbmVyJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIGxldCBwb3NpdGlvbl9iaXJkX2xlZnQgPSAyMjA7XHJcbiAgICBsZXQgcG9zaXRpb25fYmlyZF9ib3R0b20gPSAxODA7XHJcbiAgICBsZXQgZ3Jhdml0eSA9IDI7XHJcbiAgICBsZXQgY2xpY2tfYWN0aW9uID0gZmFsc2U7XHJcbiAgICBsZXQgZ2FwID0gNDUwO1xyXG4gICAgbGV0IGN1cnJlbnRTY29yZSA9IDA7XHJcbiAgICBcclxuICAgIGxldCBpc0dhbWVPdmVyID0gZmFsc2U7XHJcbiAgICB2YXIgbGFzdFRpbWVDYWxsX2dlbmVyYXRlT2JzdGFjbGVGdW5jdGlvbjogbnVtYmVyO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdlbmVyYXRlT2JzdGFjbGUoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCByYW5kb21IZWlnaHQgPSBNYXRoLnJhbmRvbSgpICogNjA7XHJcbiAgICAgICAgbGV0IG9ic3RhY2xlTGVmdCA9IDUwMDtcclxuICAgICAgICBsZXQgb2JzdGFjbGVCb3R0b20gPSByYW5kb21IZWlnaHQ7XHJcbiAgICAgICAgdmFyIG9ic3RhY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdmFyIHRvcE9ic3RhY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdmFyIHVwZGF0ZVNjb3JlID0gZmFsc2U7XHJcbiAgICAgICAgaWYoaXNHYW1lT3ZlciA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBvYnN0YWNsZS5jbGFzc0xpc3QuYWRkKCdvYnN0YWNsZScpO1xyXG4gICAgICAgICAgICB0b3BPYnN0YWNsZS5jbGFzc0xpc3QuYWRkKCd0b3BPYnN0YWNsZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnYW1lRGlzcGxheS5hcHBlbmRDaGlsZChvYnN0YWNsZSk7XHJcbiAgICAgICAgZ2FtZURpc3BsYXkuYXBwZW5kQ2hpbGQodG9wT2JzdGFjbGUpO1xyXG4gICAgICAgIG9ic3RhY2xlLnN0eWxlLmxlZnQgPSBvYnN0YWNsZUxlZnQgKyAncHgnO1xyXG4gICAgICAgIG9ic3RhY2xlLnN0eWxlLmJvdHRvbSA9IG9ic3RhY2xlQm90dG9tICsgJ3B4JztcclxuICAgICAgICB0b3BPYnN0YWNsZS5zdHlsZS5sZWZ0ID0gb2JzdGFjbGVMZWZ0ICsgJ3B4JztcclxuICAgICAgICB0b3BPYnN0YWNsZS5zdHlsZS5ib3R0b20gPSBvYnN0YWNsZUJvdHRvbSArZ2FwICsgJ3B4JztcclxuICAgICAgICBmdW5jdGlvbiBtb3ZlT2JzdGFjbGUoKSB7XHJcbiAgICAgICAgICAgIGlmKGlzR2FtZU92ZXIgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIG9ic3RhY2xlTGVmdCAtPSAyO1xyXG4gICAgICAgICAgICAgICAgb2JzdGFjbGUuc3R5bGUubGVmdCA9IG9ic3RhY2xlTGVmdCArICdweCc7XHJcbiAgICAgICAgICAgICAgICB0b3BPYnN0YWNsZS5zdHlsZS5sZWZ0ID0gb2JzdGFjbGVMZWZ0ICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIGlmKG9ic3RhY2xlTGVmdCA9PT0gLTYwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcklkKTtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lRGlzcGxheS5yZW1vdmVDaGlsZChvYnN0YWNsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZURpc3BsYXkucmVtb3ZlQ2hpbGQodG9wT2JzdGFjbGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYob2JzdGFjbGVMZWZ0ID4gMjAwICYmIG9ic3RhY2xlTGVmdCA8IDI4MCAmJiBwb3NpdGlvbl9iaXJkX2xlZnQgPT09IDIyMCAmJiBcclxuICAgICAgICAgICAgICAgICAgICAocG9zaXRpb25fYmlyZF9ib3R0b20gPCBvYnN0YWNsZUJvdHRvbSArIDE1MyB8fCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25fYmlyZF9ib3R0b20gPiBvYnN0YWNsZUJvdHRvbSArIGdhcCAtIDIwMCkgfHxcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbl9iaXJkX2JvdHRvbSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVPdmVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih1cGRhdGVTY29yZSA9PSBmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICBpZihvYnN0YWNsZUxlZnQgKyA2MCA8PSBwb3NpdGlvbl9iaXJkX2xlZnQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTY29yZSArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdXIgc2NvcmU6XCIgKyBjdXJyZW50U2NvcmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVTY29yZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0aW1lcklkID0gc2V0SW50ZXJ2YWwobW92ZU9ic3RhY2xlLDIwKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZnVuY3Rpb24gZ2FtZU92ZXIoKSB7XHJcbiAgICAgICAgaXNHYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja19jb25maXJtKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnR2FtZSBvdmVyJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0dXAoKSB7XHJcbiAgICAgICAgZ2VuZXJhdGVPYnN0YWNsZSgpO1xyXG4gICAgICAgIGxhc3RUaW1lQ2FsbF9nZW5lcmF0ZU9ic3RhY2xlRnVuY3Rpb24gPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGNsaWNrX2NvbmZpcm0oKSB7XHJcbiAgICAgICAgY2xpY2tfYWN0aW9uID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tfY29uZmlybSk7XHJcblxyXG4gICAgZnVuY3Rpb24gcHJvY2Vzc0lucHV0KCkge1xyXG4gICAgICAgIGlmKGNsaWNrX2FjdGlvbiA9PSB0cnVlKVxyXG4gICAgICAgIHsgICBcclxuICAgICAgICAgICAgaWYocG9zaXRpb25fYmlyZF9ib3R0b20gPCA1MDApIHBvc2l0aW9uX2JpcmRfYm90dG9tICs9IDUwO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHBvc2l0aW9uX2JpcmRfYm90dG9tKTtcclxuICAgICAgICAgICAgY2xpY2tfYWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZSh0aW1lOiBudW1iZXIsIGRlbHRhOiBudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoaXNHYW1lT3ZlciA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBwb3NpdGlvbl9iaXJkX2JvdHRvbSAtPSBncmF2aXR5O1xyXG4gICAgICAgICAgICB2YXIgZGVsdGFjYWxsR2VuZXJhdGVPYnN0YWNsZSA9IHRpbWUgLSBsYXN0VGltZUNhbGxfZ2VuZXJhdGVPYnN0YWNsZUZ1bmN0aW9uO1xyXG4gICAgICAgICAgICBpZihkZWx0YWNhbGxHZW5lcmF0ZU9ic3RhY2xlID49IDMwMDApIHtcclxuICAgICAgICAgICAgICAgIGdlbmVyYXRlT2JzdGFjbGUoKTsgXHJcbiAgICAgICAgICAgICAgICBsYXN0VGltZUNhbGxfZ2VuZXJhdGVPYnN0YWNsZUZ1bmN0aW9uID0gdGltZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYoaXNHYW1lT3ZlciA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBiaXJkLnN0eWxlLmJvdHRvbSA9IHBvc2l0aW9uX2JpcmRfYm90dG9tICsgJ3B4JztcclxuICAgICAgICAgICAgYmlyZC5zdHlsZS5sZWZ0ID0gcG9zaXRpb25fYmlyZF9sZWZ0ICsgJ3B4JztcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0X3Njb3JlID0gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0ZXh0X3Njb3JlXCIpO1xyXG4gICAgICAgICAgICB0ZXh0X3Njb3JlWzBdLmlubmVySFRNTCA9IFwiWW91ciBzY29yZSBpczogXCIgKyBjdXJyZW50U2NvcmU7XHJcbiAgICAgICAgICAgIHZhciByZXN0YXJ0X2J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN0YXJ0LWJ1dHRvbicpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHJlc3RhcnRfYnV0dG9uLnN0eWxlLnpJbmRleCA9IFwiKzJcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzZXR1cCgpXHJcbiAgICBsZXQgbGFzdFRpbWUgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICBmdW5jdGlvbiBsb29wKCkge1xyXG4gICAgICAgIHZhciB0aW1lID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgIHZhciBkZWx0YSA9IHRpbWUgLSBsYXN0VGltZTtcclxuICAgICAgICBwcm9jZXNzSW5wdXQoKTtcclxuICAgICAgICB1cGRhdGUodGltZSwgZGVsdGEpO1xyXG4gICAgICAgIHJlbmRlcigpO1xyXG4gICAgICAgIGxhc3RUaW1lID0gdGltZTtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcClcclxuICAgIH1cclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKVxyXG5cclxufSkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.ts\n");

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