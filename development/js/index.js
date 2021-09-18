const game = {
    board: null,
    numberOfTiles: 20,
    tilesInColumn: 4,
    tiles: [],
    tilesChecked: [],
    tilesImages: [],
    score: 0,
    moves: 0,
    tileEnable: true,
    tilesDone: 0

}


function addImages(object) {
    for (let i = 0; i < (object.numberOfTiles/2); i++) {
        const imageName = `./images/p${i+1}.jpg`;
       object.tilesImages.push(imageName);
    }
    return object.tilesImages;
}


function newGame({board, tiles, numberOfTiles, tilesChecked, score, moves, tileEnable, tilesDone}) {
    board = document.querySelector(".game-board");
    board.innerHTML = "";
    score = document.querySelector(".game-score");
    score.innerHTML = 0;
    tiles = [];
    tilesChecked = [];
    moves = [];
    tileEnable = true;
    tilesDone = 0;

    addImages(game);

    for (let i = 0; i < numberOfTiles; i++) {
        tiles.push(Math.floor(i/2));
    }

    tiles.sort(() => 0.5 - Math.random());

    for (let i=0; i<numberOfTiles; i++) {
        const tile = document.createElement("div");
        tile.classList.add("game-tile");
        board.appendChild(tile);
        tile.dataset.cardType = tiles[i];
        tile.dataset.index = i;
        tile.addEventListener("click", tile => tileClick(tile));
    }
}

function tileClick(tile) {
    if (!game.tilesChecked[0] || (game.tilesChecked[0].dataset.index !== tile.target.dataset.index)) {
        game.tilesChecked.push(tile.target);
        tile.target.style.backgroundImage = `url(${game.tilesImages[tile.target.dataset.cardType]})`;
    }
    if (game.tilesChecked.length === 2) {
        game.tileEnable = false;
        if (game.tilesChecked[0].dataset.cardType === game.tilesChecked[1].dataset.cardType) {
            setTimeout(() => deleteTiles(), 500);
            } else {
            setTimeout(() => resetTiles(), 500);
            }

            game.moves++;
            game.score.innerText = game.moves;
    }
}

function deleteTiles() {
    game.tilesChecked.forEach(el => {
        const emptyDiv = document.createElement('div');
        el.after(emptyDiv);
        el.remove();
    });

    game.tileEnable = true;
    game.tilesChecked = [];

    game.tilesDone++;
    if (game.tilesDone >= game.numberOfTiles / 2) {
        console.log("Well done"); //TODO: zrobić jakiś element z animacją
    }
}

function resetTiles() {
    game.tilesChecked.forEach(el => el.style.backgroundImage = "");
    game.tilesChecked = [];
    game.tileEnable = true;
}

document.addEventListener("DOMContentLoaded", () => {
    const gameStartContainer = document.querySelector(".new-game__container");
    const startBtn = document.querySelector(".game-start");
    startBtn.addEventListener("click", () => {
        gameStartContainer.classList.add("not-active");
        newGame(game);
    });
});