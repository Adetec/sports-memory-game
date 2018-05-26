

/*
 * Create a list that holds all of your cards
 */

// create array that store list of fontAwesome icon classes
let symbols = ['football-ball','football-ball','volleyball-ball','volleyball-ball','quidditch','quidditch','futbol','futbol','table-tennis','table-tennis','hockey-puck','hockey-puck','baseball-ball','baseball-ball','basketball-ball','basketball-ball'];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Random the icons list
 symbols = shuffle(symbols);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Create an ul element
let createCards = document.createElement('ul');

//TODO: Add deck class to the ul elemnt
createCards.setAttribute('class','deck');

// create function that loop through each card and create its HTML
function createList() {
    let listCard = '';
    let symbolId = 1; //Create an Id number to assign it for each id card
    
    //loop through each card and create its HTML
    for (const symbol of symbols) {
        listCard = `<li id="symbol-${symbolId}" class='card'><i class='fa fa-${symbol}'></i></li>`;
        symbolId++; //Increment symbol id
        createCards.innerHTML += listCard; //Put the child (li) to its parent (ul)
    }
}

// Get the section deck element from index.html
const sectionDeck = $('#section-deck');

// Call createList function to initiate the cards DOM
createList();

// Insert html cards into section deck element
sectionDeck.append(createCards);



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


//Declarer des variables necessaires

const showMe = document.querySelectorAll('.card'); //Get list of cards elements
const countMoves = document.querySelector('#moves'); //Get the Number of moves element
const textMoves = document.querySelector('#text-moves'); //Get the text of moves element

//TODO: Setup moves
let moves = '';
countMoves.textContent = 0;
let count = 0;

// Create function that increment moves counter each time player open a card
function incrementMoves() {
    count++
    countMoves.textContent = count;
    moves = txtPlural(count, 'move'); // If count > 1 move will be moves (plural)
    textMoves.textContent = moves; // insert moves text into its html
    starsRating(); // check stars rating
}

// create liste of classes names
const openCardClasses = ['animated', 'flipInY', 'open','show'];
/*
*I had to change flipInY animation class from [animate.css library file]
* (take a look at line 2005 and 2038)
* The change was invert rotation direction
*/


//Create array to store the opened card Id
let positionId= [];

//call function that loop event when player click on a card
playGame();
//Create function that loop event when player click on a card
function playGame() {

    for (const card of showMe) {
        card.addEventListener('click', function (event) {

            if (!card.classList.contains('open')) {

                card.classList.add(...openCardClasses);
                console.log(card.id);
                positionId.push(card.id);
                incrementMoves();
                //start the timer after first move
                if (count===1) {
                    timer();
                }
                //play flip sound effect
                playSound();
                match.push(card.childNodes);

            }
            //call function to check if two opened cards matchs
            checkMatched();

        });
    }
}



// create sound effects variables
let flipSound = document.getElementById("flip-card"); //get Flip card audio element

//Create function that play the flip card sound effect
function playSound() {
    flipSound.play();
}

//TODO: Check if two opened cards matchs
let match = []; //Array that store two open matched card
let progression = 0; // Initiate progession to 0
let symbolCard = document.querySelectorAll('.open'); //Get opened cards elements

//Create function that check if two opened cards matchs
function checkMatched (){
    if (match.length === 2) {
        console.log(2);
        if (match[0][0].classList[1]==match[1][0].classList[1]) {
            for (const id of positionId) {
                let matched = document.querySelector(`#${id}`);
                console.log('matched');

                setTimeout(() => {
                    matched.classList.add('match')
                    matched.classList.replace('flipInY', 'rubberBand');
                    console.log('one');
                    setTimeout(() => {
                        matched.classList.remove('flipInY',);

                    }, 1000);
                    console.log('two');
                }, 1000);
                match =[];
                positionId =[];
                progression++
                if (progression === 16) {

                    storageGame(starsNum, timerGame);
                    let swalStar = data.stars[data.stars.length-1];
                    let swalSeconds = data.seconds[data.seconds.length-1];

                    setTimeout(() => {
                        swal({
                            title: 'Memory Game',
                            text: "Congratulation! You win, You have "+ swalStar + " " + txtPlural(swalStar, 'star') + " and you've finshed at " + timeFormat(swalSeconds),
                            width: '70%',
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonText: 'Play again?',
                            confirmButtonColor:'#50bbb5', //Set the same color as match card
                          }).then((result) => {
                            if (result.value) {
                                location.reload();
                            }
                          })
                    }, 2000);
                    
                }
            }

        }
        else{
            console.log('Not matched');
            for (const id of positionId) {
                let notMatched = document.querySelector(`#${id}`);
                match =[];
                positionId =[];
                setTimeout(() => {
                    notMatched.classList.add('not-match')
                    notMatched.classList.replace('flipInY', 'wobble');
                    console.log('wrong 1');
                    setTimeout(() => {
                        notMatched.classList.remove('open','show', 'not-match');
                        notMatched.classList.add('flipInY');
                        notMatched.classList.remove('wobble');
                        setTimeout(() => {
                            notMatched.classList.remove('flipInY');
                        }, 1000);

                    }, 1500);
                    console.log('wrong 2');

                }, 1000);
            }
        }
    }
}

//Function timer
let timerGame = 0;
let second, minute;
function timer() {
    let interval = setInterval (()=>{
        timerGame++;
        if (timerGame<=300) {
            $('.timer').text(timeFormat(timerGame));

            if (timerGame === 180) {
                $('.timer').css('color','goldenrod');
            }

            if (timerGame === 250) {
                $('.timer').css('color','orange');
            }

            if (timerGame === 280) {
                $('.timer').css('color','red');
                $('.timer').addClass('animated flash infinite');
            }

            if (progression===16) {
                clearInterval(interval);
            }
        }
        else {
            clearInterval(interval);
            $('.timer').removeClass('animated flash infinite');
            swal({
                title: 'Game Over',
                text: 'Time finished',
                type: 'error',
                confirmButtonText : 'Try again!'
            }).then((result) =>{
                if (result.value) {
                    location.reload();
                }
            });
        }

    },1000);

}

//Function that restart the game board, the timer, and the star rating

function restart() {

    swal({
        title: 'Restart Memory game',
        text: "Are you sure?",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.value) {
            location.reload();
        }
      })
}
// Create Star rating function
let starsNum = 3;
function starsRating() {
    if (count === 50) {
        $('.stars li:last').css('color','grey');
        starsNum--;
    }

    if (count === 60) {
        $('.stars li:odd').css('color','grey');
        starsNum--;
    }

    if (count === 100) {
        $('.stars li:first').css('color','grey');
        starsNum--;
    }
}

// local storage
// create data storage object
let data = {
    "stars" : [],
    "seconds" : [],
    "gameDate" : []
};
// get data from local storage
function getDataStorage() {
    let getStars =JSON.parse(localStorage.getItem('stars', data.stars));
    let getSeconds = JSON.parse(localStorage.getItem('seconds', data.seconds));
    let getDataDate = JSON.parse(localStorage.getItem('date', data.gameDate));
    console.log('get stars: '+ getStars);
    console.log('get seconds: '+ getSeconds);
    console.log('get seconds: '+ getDataDate);
    
    if ((getStars === null) && (getSeconds === null) && (getDataDate === null)) {
        data.stars.concat(getStars);
        data.seconds.concat(getSeconds);
        data.gameDate.concat(getDataDate);
    } else {
        data.stars = getStars;
        data.seconds = getSeconds;
        data.gameDate = getDataDate;
    }    
}

// set data to local storage
function storageGame(st, sec) {
    // add new values to the data object
    data.stars.push(st);
    data.seconds.push(sec);
    data.gameDate.push(dateStorage());

    // add new values from data storage object to local storage
    localStorage.setItem('stars', JSON.stringify(data.stars));
    localStorage.setItem('seconds', JSON.stringify(data.seconds));
    localStorage.setItem('date', JSON.stringify(data.gameDate));
    let getit = localStorage.seconds + ", " + localStorage.stars + ", " + localStorage.gameDate;
    console.log('Storage: '+getit);
}
getDataStorage();
// Create timeFormat function that convert seconds to minutes and seconds format (00 : 00)
function timeFormat(gameSecond) {
    let minutes = `0${parseInt(gameSecond / 60)}`;
    let seconds = gameSecond % 60;
    (seconds < 10)? seconds = `0${seconds}`: seconds;
    return minutes + ":" + seconds;
}

function txtPlural(num , txt) {
    let txtPlural = (num > 1)? `${txt}s` : txt;
    return txtPlural;
}

//create date function
function dateStorage() {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let day = today.getDate();
    let hour = today.getHours();
    let minute = today.getMinutes();
    return `${year}/${month}/${day} - ${hour}:${minute}`;
}





//Toggle ON/OFF sound effect when audio button is clicked 
let audioButton = document.getElementById('audio');
audioButton.addEventListener('click', audio => {
    toggleAudioOnOff();
});

// create function that set audio On or Off
function toggleAudioOnOff() {
    let vol = (flipSound.volume === 1)? flipSound.volume = 0 : flipSound.volume = 1;
    let audioIcon = document.getElementById('volume');
    console.log(audioIcon.classList);
    if (vol === 1) {
        audioIcon.classList.replace('fa-volume-off', 'fa-volume-up');
    }
    else {
        audioIcon.classList.replace('fa-volume-up', 'fa-volume-off');
    }
    console.log(flipSound.volume);
}

//Score board

let scoreBoard = $('#score-board');

const score = {
    stars : data.stars,
    seconds : data.seconds,
    gameDate :data.gameDate         
}
scoreData();
function scoreData() {

    let scoreContent = '';
    for (let i = 0; i < score.stars.length; i++) {
        let scoreBody = document.createElement('div');
        scoreBody.setAttribute('class','score-body');
        let scoreUl = document.createElement('ul');
        

        scoreContent = `<li>Date: ${score.gameDate[i]}</li><li>Time: ${timeFormat(score.seconds[i])}</li><li>Score: ${score.stars[i]} ${txtPlural(score.stars[i], 'star')}</li>`;
        
        scoreUl.innerHTML =scoreContent;
        scoreBody.append(scoreUl);
        scoreBoard.append(scoreBody);
    }        
    
}

//create keyboard shortcuts event
document.addEventListener('keyup', event => {
    let k = event.which;
    // If R key is pressed, restart game
    if (k == 82) {
        console.log(k);
        restart();
    }
    // If S key is pressed, display score game board
    if (k == 83) {
        displayScoreBoard();
    }

    // If V key is pressed, toggle Audio volume to ON/OFF
    if (k == 86) {
        toggleAudioOnOff();
    }

});

// Display score board When player click on stars panel
displayScore = document.querySelector('.stars');
displayScore.addEventListener('click', event => {
    displayScoreBoard();
})

function displayScoreBoard() {
    if (score.stars.length > 0) { // if there is 
        scoreBoard.toggle();   
    }
    else {
        swal({
            title: 'Sport Game Memory',
            text: 'You have to win at least one time to see your score log!',
            type: 'info',
            confirmButtonColor: '#50bbb5'
        });
    }

}