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

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createGrid() {
  for (var i = 0; i < dimension.value; i++) {
    grid[i] = [];
  }
  randomizeTable();
  createTable();
}

function randomizeTable() {
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
}

function createTable() {
  empty = [];
  var myTable = document.getElementById("board");
  var table = document.createElement("table");
  var tableBody = document.createElement("tbody");
  table.appendChild(tableBody);
  for (var i = 0; i < dimension.value; i++) {
    var tr = document.createElement("tr");
    tableBody.appendChild(tr);
    for (var j = 0; j < dimension.value; j++) {
      var td = document.createElement("td");
      if (grid[i][j] == "o") {
        empty.push(grid[i][j]);
      } else if (grid[i][j] == "y") {
        td.style.backgroundColor = popYcolor.value;
      } else {
        td.style.backgroundColor = popXcolor.value;
      }
      tr.appendChild(td);
    }
  }
  myTable.appendChild(table);
  console.log(myTable);
}

function Neighbors(a, b) {
  var n = [];
  n.push(grid[a - 1][b]); //top center
  n.push(grid[a](b + 1)); //right center
  n.push(grid[a + 1][b]); //bottom center
  n.push(grid[a][b - 1]); //left center
  n.push(grid[a - 1][b + 1]); //Upper right
  n.push(grid[a + 1][b + 1]); //bottom right
  n.push(grid[a + 1][b - 1]); //bottom left
  n.push(grid[a - 1][b - 1]); //upper left
  return n.filter((x) => x);
}

function getSatisfaction(a, b) {
  var neighbors = Neighbors(a, b);
  var numN = neighbors.length;
  var numS = neighbors.filter((a) => a == grid[a][b]).length;
  return numS / numN > threshold;
}

function jump(a, b) {
  var target = randomNum(0, empty.length);
  target = empty.splice(target, 1)[0];
  empty.push(grid[a][b]);
  var cell = grid[a][b];
  grid[a][b] = "o";
  grid[target] = cell;
}

async function sim() {
  if (!run) {
    return;
  }
  console.log("here?");
  let stop = true;
  for (var i = 0; i < dimension.value; i++) {
    for (var j = 0; j < dimension.value; i++) {
      if (grid[i][j] !== "o") {
        if (!getSatisfaction(i, j)) {
          stop = false;
          jump(i, j);
        }
      }
    }
  }
  console.log("are we getting here");
  generations.innerHTML = `Generations: ${++gen}`;
  if (!stop) {
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

createGrid();
