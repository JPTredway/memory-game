# Radiohead Matching Game

## Purpose:

For the Extracurricular portion of Udacity's Intro to Programming.

## Accessing the game

- Clone the **[repo](https://github.com/Tredway91/memory-game.git)** and open index.html -- or --
- Play on GitHub.io: **[Radiohead Matching Game](https://tredway91.github.io/memory-game/)**

### Playing the game

The gameboard is created with 16 cards, holding 8 pairs of Radiohead album covers.

Player clicks 'Start Game' to begin.

On each turn:

- The player flips one card over to reveal its underlying symbol
- The player then turns over a second card, trying to find the corresponding card with the same symbol
- If the cards match, both cards stay flipped over
- If the cards do not match, both cards are returned to their initial hidden state
- The game ends once all cards have been correctly matched.

### Screenshots

![Start Screen](screenshots/start-screen.png "start screen")

![Game in Play](screenshots/game-board.png "Game Board") ![Game in Play](screenshots/play.png "Game in play")

![Win Screen](screenshots/win-screen.png "win screen")

## Resources used to create the game:

### Random shuffle:

- <https://github.com/Daplie/knuth-shuffle>

### Card Flipping CSS:

- <https://davidwalsh.name/css-flip>

### Radiohead Album Images:

- Various sources
