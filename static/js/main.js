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

var matchesFound = 0;
var moveCount = 0;
var numOfPairs = 0;
var compareArray = [];
var gameStarted = false;

function makeArray() {
	// creates an array from data.js
	var pairsArray = [];

	// Create pairs of each card and add to array
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

  // While there remain elements to shuffle
  while (0 !== currentIndex) {

    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  // return shuffled array
  return array;
}

function fillBoard(cardArray) {
	// Clear current board
	$('#gameboard').empty();

	cardArray.forEach(function(card) {

		// Add cards to game board
		$('#gameboard').append(card.html);

		// Bind each card to click function
		$(card.id).click(function() {

			$(card.id).addClass('flipped');
			
			// if array is empty, add card to the array.
			// if card is not already in array, add card to array
			// else add to array and compare cards
			if (compareArray.length === 0) {
				compareArray[0] = card;
			} else if (compareArray[0] !== card) {
				compareArray[1] = card;
			};

			if (compareArray.length === 2) {
				checkForMatch();
			}
		});
	});
}

function checkForMatch() {
	// Hide cards if not a match
	// Reset array regardless of match
	if (compareArray[0].name !== compareArray[1].name) {
		notMatch();
	} else {
		matchesFound++;
		$('.matches-found').text(matchesFound);
		
		if (matchesFound === numOfPairs) {
			gameWon();
		}
	}
	moveCount++;
	$('.move-count').text(moveCount);
	compareArray.splice(0, 2);
}

function notMatch() {
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
		$('.replay').click(function() {
			$('#win-modal').modal('hide');

			// Bring up start modal
			$('#start-modal').modal('show');
		})
	}, 600);
}

$(document).ready(function() {
	// Add 16 filler cards until game is started
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

// show start modal on page load
$('#start-modal').modal('show');

// bind replay button to click function showing start modal
$('.replay').click(function() {
	$('#start-modal').modal('show');
})

// bind start-game button to click function hiding modal and creating gameboard	
$('#start-game').click(function() {
	// reset progress
	numOfPairs = 0;
	matchesFound = 0;
	moveCount = 0;

	//reset html
	$('.matches-found').text('0');
	$('.move-count').text('0');
	
	$('#start-modal').modal('hide');
	fillBoard(makeArray());
})

// $('#win-modal').modal('show');