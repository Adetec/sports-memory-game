

/*
 * Create a list that holds all of your cards
 */

let symbols = ['football-ball','football-ball','volleyball-ball','volleyball-ball','quidditch','quidditch','futbol','futbol','table-tennis','table-tennis','hockey-puck','hockey-puck','baseball-ball','baseball-ball','basketball-ball','basketball-ball'];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

symbols = shuffle(symbols);
let createCards = document.createElement('ul');
createCards.setAttribute('class','deck');
function createList() {
    let listCard = '';
    let symbolId = 0;
    for (const symbol of symbols) {
        listCard = `<li id="symbol-${symbolId}" class='card'><i class='fa fa-${symbol}'></i></li>`;
        symbolId++;
        createCards.innerHTML += listCard;
        console.log(symbolId+listCard);
        // createCards = createCards.appendChild(createList);       
    }
    
}


const gameBoard = $('#section-deck');
createList();
gameBoard.append(createCards);

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

 // ********faut pas oublier de mentionner le changement de flipInY direction*********

//Declarer des variables necessaires

let showMe = document.querySelectorAll('.card');
const countMoves = document.querySelector('#moves');
const textMoves = document.querySelector('#text-moves');
let moves = '';
countMoves.textContent = 0;
let count = 0;
let positionId= [];
function incrementMoves() {
    count++
    countMoves.textContent = count;
    moves = (count <2)? ' Move':' Moves';
    console.log(moves);
    textMoves.textContent = moves;
    // check stars rating
    starsRating();

}
const openCardClasses = ['animated', 'flipInY', 'open','show'];

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
            playSound();
            match.push(card.childNodes);

        }
        //call function to check if two opened cards matchs
        checkMatched();

    });
}



// create sound effects variables

//Wrong Answer sound (credit: https://freesound.org/people/Bertrof/sounds/131657/)
function playSound() {
    var flipSound = document.getElementById("flip-card");
    flipSound.play();
}

//$('.card').click(flipCard);

// /* let flipCard = */function playSound() {
//     var sound = document.getElementById("flip-card");
//     sound.play();
// }

// //$('.card').click(flipCard);





//Check if two opened cards matchs

let match = [];
let progression = 0;

let symbolCard = document.querySelectorAll('.open');
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
                    
                    swal({
                        title: 'Memory Game',
                        text: "Congratulation! You win, You have "+ starsNum + " and you've finshed at " + timerGame + " Secondes",
                        type: 'success',
                        showCancelButton: false,
                        confirmButtonText: 'Play again?',
                        confirmButtonColor:'#50bbb5', //Set the same color as match card
                      }).then((result) => {
                        if (result.value) {
                            location.reload();
                        }
                      })
                    
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
let second, minute ;
function timer() {
    let interval = setInterval (()=>{
        // if (second <=9) {
        //     second = "0"+second;
        // }

        timerGame++;

        if (timerGame<=300) {
            minute = parseInt(timerGame / 60);
            second = timerGame % 60;
            (second < 10)? $('.timer').text(`Elabsed time 0${minute} : 0${second}`) :  $('.timer').text(`Elabsed time 0${minute} : ${second}`);
           
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
            }) ;
        }
        
    },1000)
    
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

let starsNum = 3;
function starsRating() {
    if (count === 25) {
        $('.stars li:last').css('color','grey');
        starsNum--
    }
    
    if (count === 40) {
        $('.stars li:odd').css('color','grey');
        starsNum--
    }
    
    if (count === 50) {
        $('.stars li:first').css('color','grey');
        starsNum--
    }
    
}




// local storage







