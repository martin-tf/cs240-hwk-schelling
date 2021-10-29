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

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createGrid() {
  for (var i = 0; i < dimension.value; i++) {
    grid[i] = [];
  }
}
createGrid();

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
randomizeTable();

function createTable() {
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
        td.style.backgroundColor = "white";
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
createTable();

function updateTable() {
  for (var i = 0; i < dimension.value; i++) {
    for (var j = 0; j < dimension.value; j++) {
      if (grid[i][j] == "o") {
        td.style.backgroundColor = "white";
      } else if (grid[i][j] == "y") {
        td.style.backgroundColor = popYcolor.value;
      } else {
        td.style.backgroundColor = popXcolor.value;
      }
    }
  }
}

function runSim() {}

async function round() {
  var rand_x;
  var rand_y;
  for (var i = 0; i < dimension.value; i++) {
    for (var j = 0; j < dimension.value; j++) {
      if (grid[i][j] !== "o") {
        var cur = grid[i][j];
        var move = getSatisfaction(i, j);
        if (move) {
          grid[i][j].td.style.backgroundColor = "white";
          do {
            rand_x = randomNum(0, dimension.value - 1);
            rand_y = randomNum(0, dimension.value - 1);
          } while (grid[i][j] !== "o");
        }
        grid[i][j] = cur;
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve(); // do nothing after waiting 100 ms, just alert the calling thread
          }, 100)
        );
      }
    }
  }
}

function getSatisfaction(a, b) {
  var cur = grid[a][b];
  var type_x = 0;
  var type_y = 0;

  for (var i = a - 1; i <= a + 1; a++) {
    for (var j = b - 1; j <= b + 1; j++) {
      if (grid[getBoundedIndex(i)][getBoundedIndex(j)] === popYcolor.value) {
        type_y++;
      } else if (
        grid[getBoundedIndex(i)][getBoundedIndex(j)] === popXcolor.value
      ) {
        type_x++;
      }
    }
  }
  var frac_x = type_x / (type_x + type_y);
  var frac_y = type_y / (type_x + type_y);
  if (
    (cur === popYcolor.value && frac_y < threshold.value) ||
    (cur === popXcolor.value && frac_x < threshold.value)
  ) {
    return true;
  } else {
    return false;
  }
}

function jump() {}

async function simulate() {
  if (!run) {
    return;
  }

  for (var i = 0; i < dimension; i++) {
    for (var j = 0; j < dimension; i++) {
      if (grid[i][j] !== "o") {
        if (!getSatisfaction(i, j)) {
          jump();
        }
      }
    }
  }
}

//TODO: Add event listeners
runstop.addEventListener("click", () => {
  console.log("button works");
});
