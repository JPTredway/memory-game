// card constructor used for CARD_DATA
class Card {
		constructor(card, pairNum) {
		var CARD_ID = card.id + '_' + pairNum;
		this.id = '#' + card.id + '_' + pairNum;
		this.image = card.image;
		this.name = card.name;
		this.html = `<div class="card" id="${CARD_ID}">
						<div class="full-size back">
							<img src="images/rhlogo.png" class="center">
						</div>
						<div class="full-size flex front">
							<img src="images/${this.image}" class="center">
						</div>
					</div>`;
	}
}

// set default vars
var matchesFound = 0;
var moveCount = 0;
var numOfPairs = 0;
var cardsPerMatch = 2;
var compareArray = [];

function makeArray() {
	// creates an array from data.js
	var pairsArray = [];

	// create pairs of each card and add to array
	CARD_DATA.forEach(function(card) {
		pairsArray.push(new Card(card, 1));
		pairsArray.push(new Card(card, 2));
		numOfPairs++;
	});

	// shuffles and returns array
	return shuffle(pairsArray);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // while there remain elements to shuffle
  while (0 !== currentIndex) {

    // pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // and swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  // return shuffled array
  return array;
}

function fillBoard(cardArray) {
	// clear current board
	$('#gameboard').empty();

	cardArray.forEach(function(card) {

		// add each card to gameboard
		$('#gameboard').append(card.html);

		// bind each card to click function
		$(card.id).click(function() {

			// add flipped class on click
			$(card.id).addClass('flipped');
			
			// if array is empty, add card to the array.
			// if card is not already in array, add card to 2nd spot in array
			if (compareArray.length === 0) {
				compareArray[0] = card;
			} else if (compareArray[0] !== card) {
				compareArray[1] = card;
			};

			// check cards for match once array has two cards
			if (compareArray.length === cardsPerMatch) {
				checkForMatch();
			}
		});
	});
}

function checkForMatch() {
	// hide cards if not a match
	// reset array regardless of match
	if (compareArray[0].name !== compareArray[1].name) {
		notMatch();
	} else {
		// increase number of matches found and update html
		matchesFound++;
		$('.matches-found').text(matchesFound);
		
		// end game when all pairs have been matched
		if (matchesFound === numOfPairs) {
			gameWon();
		}
	}
	// increase move count and update html
	moveCount++;
	$('.move-count').text(moveCount);

	// clear match array
	compareArray.splice(0, cardsPerMatch);
}

function notMatch() {
	// remove class flipped
	compareArray.forEach(function(card) {
		setTimeout(function() {
			$(card.id).removeClass('flipped');
		}, 600);
	});
}

function gameWon() {
	// show winning modal
	setTimeout(function() {
		$('#win-modal').modal('show');

		// clicking replay hides modal and starts game again
		$('.replay').click(function() {
			$('#win-modal').modal('hide');

			startGame();
		})
	}, 600);
}

$(document).ready(function() {
	// add 16 filler cards to gameboard until game is started
	var cardsAdded = 0;

	while (cardsAdded < 16) {
		cardsAdded++;
		$('#gameboard').append(`<div class="card">
									<div class="full-size back">
										<img src="images/rhlogo.png" class="center">
									</div>
								</div>`);
	};
})

function startGame() {
	// show start modal on page load
	$('#start-modal').modal('show');

	// bind replay button to click function showing start modal
	$('.replay').click(function() {
		$('#start-modal').modal('show');
	});

	// bind start-game button to click function hiding modal and creating gameboard	
	$('#start-game').click(function() {
		// reset progress
		numOfPairs = 0;
		matchesFound = 0;
		moveCount = 0;

		// make sure html is cleared
		$('.matches-found').text('0');
		$('.move-count').text('0');
		
		$('#start-modal').modal('hide');
		fillBoard(makeArray());
	});
}

// starts the game
startGame();
