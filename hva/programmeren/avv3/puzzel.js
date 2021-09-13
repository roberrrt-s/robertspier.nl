/*

 __          __     _   _______ ______ _____       _____ _____          _   _ _   _ _    _ _________________     _  _       _____  _____  ______  _____ _____ _____  ______ _   _ _______ 
 \ \        / /\   | | |__   __|  ____|  __ \     / ____|_   _|   /\   | \ | | \ | | |  | |___  /___  /_   _|   | || |     |  __ \|  __ \|  ____|/ ____|_   _|  __ \|  ____| \ | |__   __|
  \ \  /\  / /  \  | |    | |  | |__  | |__) |   | |  __  | |    /  \  |  \| |  \| | |  | |  / /   / /  | |     | || |_    | |__) | |__) | |__  | (___   | | | |  | | |__  |  \| |  | |   
   \ \/  \/ / /\ \ | |    | |  |  __| |  _  /    | | |_ | | |   / /\ \ | . ` | . ` | |  | | / /   / /   | |     |__   _|   |  ___/|  _  /|  __|  \___ \  | | | |  | |  __| | . ` |  | |   
    \  /\  / ____ \| |____| |  | |____| | \ \    | |__| |_| |_ / ____ \| |\  | |\  | |__| |/ /__ / /__ _| |_       | |     | |    | | \ \| |____ ____) |_| |_| |__| | |____| |\  |  | |   
     \/  \/_/    \_\______|_|  |______|_|  \_\    \_____|_____/_/    \_\_| \_|_| \_|\____//_____/_____|_____|      |_|     |_|    |_|  \_\______|_____/|_____|_____/|______|_| \_|  |_|   
                                                                                                                                                                                          
                                                                                                                                                                                          
*/

/* Aangeven dat dit script gebruik moet maken van het canvas met het 'puzzle' id */
var context = document.getElementById('puzzle').getContext('2d');

/* Afbeelding inladen, en ervoor zorgen dat de afbeelding geladen wordt voor het script gestart wordt */
var img = new Image();
img.src = 'puzzel.png';
img.addEventListener('load', drawTiles, false);

/* Het aantal tiles bepalen (do/while loop om de gebruiker zelf input te geven)  */
var boardSize = document.getElementById('puzzle').width;
var tileCount = prompt("How many rows / columns do you wish to use? (between 3-6)") 

do {
  if(tileCount > 6) {
    window.alert('You picked more than 6 rows / columns');
    tileCount = prompt("Pick again, between 3 and 6");
  }
  else if(tileCount < 3) { 
    window.alert('You picked less than 3 rows / columns');
    tileCount = prompt("Pick again, between 3 and 6");
  }
  else {
  }
}
  while(tileCount < 3 || tileCount > 6);


/* Afmeting van de tiles definieren */
var tileSize = boardSize / tileCount;

/* Waardes van de kliklocatie en de locatie van het lege veld bepalen met objecten (x en y as) */
var clickLoc = new Object;
clickLoc.x = 0;
clickLoc.y = 0;

var emptyLoc = new Object;
emptyLoc.x = 0;
emptyLoc.y = 0;

/* Belangrijkste variabele van het script, kijkt of de puzzel is opgelost, wordt hier gedefinieerd met standaardwaarde 'false' */
var solved = false;

/* Variabele boardParts gemaakt */
var boardParts;

/* Executeer functie setBoard(); */
setBoard();

/* Importeer een audio bestand */
var audio = new Audio('music.mp3');

/* Deze functie wordt geactiveerd door te klikken op het id (= canvas) 'puzzle' 
   Letterlijk checkt deze functie waar er op het canvas geklikt wordt, en als er op een tile geklikt wordt die zich naast een lege is wisselt die om met de geklikte tile */
document.getElementById('puzzle').onclick = function(e) {
  clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / tileSize);
  clickLoc.y = Math.floor((e.pageY - this.offsetTop) / tileSize);
/* Hier controleert de functie of de tiles naast elkaar liggen, en wisselt hij ze om */
  if (distance(clickLoc.x, clickLoc.y, emptyLoc.x, emptyLoc.y) == 1) {
    slideTile(emptyLoc, clickLoc);
    drawTiles();
  }
/* Als de laatste tiles gewisselt zijn wordt de volgende code uitgevoerd */
  if (solved) {
    setTimeout(function() {alert("WALTER 4 PRESIDENT");}, 500);
    audio.play();
  }
};

function setBoard() {
  boardParts = new Array(tileCount);
  for (var i = 0; i < tileCount; ++i) {
    boardParts[i] = new Array(tileCount);
    for (var j = 0; j < tileCount; ++j) {
      boardParts[i][j] = new Object;
      boardParts[i][j].x = (tileCount - 1) - i;
      boardParts[i][j].y = (tileCount - 1) - j;
    }
  }
  emptyLoc.x = boardParts[tileCount - 1][tileCount - 1].x;
  emptyLoc.y = boardParts[tileCount - 1][tileCount - 1].y;
  solved = false;
}

function drawTiles() {
  context.clearRect ( 0 , 0 , boardSize , boardSize );
  for (var i = 0; i < tileCount; ++i) {
    for (var j = 0; j < tileCount; ++j) {
      var x = boardParts[i][j].x;
      var y = boardParts[i][j].y;
      if(i != emptyLoc.x || j != emptyLoc.y || solved == true) {
        context.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize,
            i * tileSize, j * tileSize, tileSize, tileSize);
      }
    }
  }
}

function distance(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function slideTile(toLoc, fromLoc) {
  if (!solved) {
    boardParts[toLoc.x][toLoc.y].x = boardParts[fromLoc.x][fromLoc.y].x;
    boardParts[toLoc.x][toLoc.y].y = boardParts[fromLoc.x][fromLoc.y].y;
    boardParts[fromLoc.x][fromLoc.y].x = tileCount - 1;
    boardParts[fromLoc.x][fromLoc.y].y = tileCount - 1;
    toLoc.x = fromLoc.x;
    toLoc.y = fromLoc.y;
    checkSolved();
  }
}

function checkSolved() {
  var flag = true;
  for (var i = 0; i < tileCount; ++i) {
    for (var j = 0; j < tileCount; ++j) {
      if (boardParts[i][j].x != i || boardParts[i][j].y != j) {
        flag = false;
      }
    }
  }
  solved = flag;
}