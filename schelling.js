/**
 * Schelling's Model simulator
 * @author Martin Freeman
 */

var popYcolor = document.getElementById("popYcolor");
var popXcolor = document.getElementById("popXcolor");
var dimension = document.getElementById("dimension");
var threshold = document.getElementById("threshold");
var vacantRatio = document.getElementById("vacantRatio");
var popRatio = document.getElementById("popRatio");
var generations = document.querySelector("p");
var randomize = document.getElementById("randomize");
var runstop = document.getElementById("runstop");
var grid = [];
var h = 0;
var run = false;
var gen = 0;
var empty = [];

// function randomNum(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

var popYcolorVal = popYcolor.value;
popYcolor.addEventListener("inpt", () => {
  popYcolor = popYcolorVal;
  createTable();
});

var popXcolorVal = popXcolor.value;
popXcolor.addEventListener("input", () => {
  popXcolor = popXcolorVal;
  createTable();
});

function createGrid() {
  for (var i = 0; i < dimension.value; i++) {
    grid[i] = [];
  }
  randomizeTable();
  createTable();
}

function randomizeTable() {
  empty = [];
  for (var i = 0; i < dimension.value; i++) {
    for (var j = 0; j < dimension.value; j++) {
      if (Math.random() < vacantRatio.value) {
        grid[i][j] = "o";
      } else if (Math.random() < popRatio.value) {
        grid[i][j] = "y";
      } else {
        grid[i][j] = "x";
      }
    }
  }
  console.log(grid);
  console.log(`Empty right after board creation: ${empty}`);
  console.log(empty);
}

function createTable() {
  var board = document.getElementById("board");
  var table = document.createElement("table");
  for (var i = 0; i < dimension.value; i++) {
    var tr = document.createElement("tr");
    table.appendChild(tr);
    for (var j = 0; j < dimension.value; j++) {
      var td = document.createElement("td");
      if (grid[i][j] == "o") {
        empty.push(grid[i][j]);
      } else if (grid[i][j] == "y") {
        td.style.backgroundColor = popYcolorVal;
      } else {
        td.style.backgroundColor = popXcolorVal;
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  if (board.childNodes[1]) {
    board.removeChild(board.lastChild);
  }
  board.appendChild(table);
}

function Neighbors(a, b) {
  var n = [];
  if (a > 0) {
    n.push(grid[a - 1][b]); //top center
    if (b > 0) {
      n.push(grid[a - 1][b - 1]); //upper left
    }
    if (b < dimension - 1) {
      n.push(grid[a - 1][b + 1]); //Upper right
    }
  }
  if (a < dimension - 1) {
    n.push(grid[a + 1][b]); //bottom center
    if (b > 0) {
      n.push(grid[a + 1][b - 1]); //bottom left
    }
    if (b < dimension - 1) {
      n.push(grid[a + 1][b + 1]); //bottom right
    }
  }
  if (b < dimension - 1) {
    n.push(grid[a](b + 1)); //right center
  }
  if (b > 0) {
    n.push(grid[a][b - 1]); //left center
  }
  return n.filter((x) => x);
}

function getSatisfaction(a, b) {
  var neighbors = Neighbors(a, b);
  var numN = neighbors.length;
  var numS = neighbors.filter((x) => x == grid[a][b]).length;
  return numS / numN > threshold;
}

function jump(a, b) {
  var target = Math.floor(Math.random() * empty.length);
  console.log(target);
  target = empty.splice(target, 1)[0];
  console.log(target);
  console.log(grid.indexOf(target));
  let t = empty.findIndex(target);
  console.log(t);
  var cell = grid[a][b];
  grid[a][b] = "o";
  empty.push(grid[a][b]);
  let destx = parseFloat(target % dimension.value);
  let desty = parseFloat(Math.floor(target / dimension.value));
  console.log(destx);
  console.log(desty);
  console.log(target);
  console.log(cell);
  grid[destx][desty] = cell;
}

async function sim() {
  if (!run) {
    return;
  }
  let stop = true;
  for (var i = 0; i < dimension.value; i++) {
    for (var j = 0; j < dimension.value; j++) {
      if (grid[i][j] != "o") {
        if (!getSatisfaction(i, j)) {
          //if the node is not satified jump to a new spot.
          console.log("are we getting here");
          stop = false;
          jump(i, j);
          console.log(grid);
        }
      }
    }
  }
  generations.innerHTML = `Generations: ${++gen}`;
  if (stop == false) {
    createTable();
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve(); // do nothing after waiting 100 ms, just alert the calling thread
      }, 100)
    );
    sim();
  } else {
    runstop.innerHTML = "Run";
    run = false;
  }
}

createGrid();

//TODO: Add event listeners
runstop.addEventListener("click", () => {
  run = !run;
  if (run) {
    gen = 0;
    runstop.innerHTML = "Stop!";
    sim();
  } else {
    runstop.innerHTML = "Run";
  }
});

randomize.addEventListener("click", () => {
  randomizeTable();
  createTable();
});
