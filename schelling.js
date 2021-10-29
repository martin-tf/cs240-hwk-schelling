/**
 * Schelling's Model simulator
 * @author Martin Freeman
 */

var popYcolor = document.getElementById("popYcolor").value;

var popXcolor = document.getElementById("popXcolor").value;

var dimension = document.getElementById("dimension").value;

var threshold = document.getElementById("threshold").value;

var vacantRatio = document.getElementById("vacantRatio").value;

var popRatio = document.getElementById("popRatio").value;

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createTable() {
  var myTable = document.getElementById("board");
  var table = document.createElement("TABLE");
  var tableBody = document.createElement("TBODY");
  table.appendChild(tableBody);
  for (var i = 0; i < dimension; i++) {
    var tr = document.createElement("TR");
    tableBody.appendChild(tr);
    for (var j = 0; j < dimension; j++) {
      var td = document.createElement("TD");
      if (Math.random() < vacantRatio) {
        td.style.backgroundColor = "white";
      } else if (Math.random() < popRatio) {
        td.style.backgroundColor = popYcolor;
      } else {
        td.style.backgroundColor = popXcolor;
      }
      tr.appendChild(td);
    }
  }
  myTable.appendChild(table);
}

createTable();

function addGlobalEventSelector(type, selector, callback) {
  document.addEventListener(type, (e) => {
    if (e.target.matches(selector)) callback(e);
  });
}
