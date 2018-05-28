# Sport Memory Game Project

## Table of Contents

* [Interface Design](#interface-design)
* [Game rules](#game-rules)
* [Additinal compenents](#additinal-compenents)
* [Dependencies](#dependencies)
* [Credits](#credits)

## Interface Design:
### Theme:
The game design is customized. **Sport** is the theme chosen in this project, balloons as symbols of the cards from [Font Awesome](https://fontawesome.com) library, Goal nets as the back background card.

### Responsive:
All application components are usable across modern desktop, tablet, and phone browsers.

## Game rules

The game randomly shuffles the cards. Player wins once all cards have successfully been matched.
*  All cards are faced down, player select two cards.
*  When card is selected, the symbol is displayed after the Library [Animate.css](https://daneden.github.io/animate.css/) `flipInY` class turns it to its face.
*  If two cards are matched, both cards stay faced up, and their color are changed to green.
*  if cards aren't matched, both cards are faced down.
*  Each turn, a counter increments number of player moves.
*  There are 3 stars, player will loose one star after 12 moves, then the second after 18 moves.
*  The timer starts at the first move, player must finish matching all cards before 5 minutes, otherwise, timer stops and Game over popup message will be displayed.
*  When player wins the game, a popup message is displayed to congratulate the player and asks if he want to play again. It tells him also how much time it took to win the game, and what the star rating was.
* Player can restart game (reload web page - reset timer and stars rating), a popup is displayed and asks him if he want really restaring game.
## Additinal compenents

### Score board:

A modal contains score history, player can check it when he clicks on stars rating, including: 
* Time it took to win the game.
* Stars rating.
* Date and current time game winning.

### Locale Storage:

Get old Scores game history and store new each time player wins into local storage:

* Stores __time__ it took to win the game.
* Stores __stars rating__.
* Stores __date__ and current __time__ game winning.

### Sound effect:

play __flip__ sound effect when player turns cards.

### Timer colors

Timer changes color when it reaches:

* 03:00 to golden rod.
* 04:10 to orange.
* 04:40 to red and flashes using `animated flash infinte`classes from `animate.css`to tell player that he hasn't enough time.
 
### keyboard shortcuts:

* Player can press `R` key to restart game.
* Player can press `S` key to Display score history game baord.
* Player can press `V` key to Toggle *ON/OFF* sound effect.

## Dependencies:
1- [Jquery](https://jquery.com/)
2- [Font Awesome](https://fontawesome.com)
3- [Animate.css]()
4- [Baloo and Chettan fonts from google fonts](https://fonts.googleapis.com/css?family=Baloo+Chettan)
5- [Sweet alert 2](https://sweetalert2.github.io)
6- [polyfill](https://unpkg.com/promise-polyfill)
## Images credits
1- `Sports.png`: [Body background image](https://www.toptal.com/designers/subtlepatterns/sports)
2- `filet.png`: [Card background image](https://www.casalsport.com/img/W/CAS/ST/FB/20/16/FB2016/FB2016_ST.jpg) *I had to modify the file removing white background for transparency and inverse color of goal nets*