var size = 50;
var htmlElements;
var cells;
var DEAD = 0;
var ALIVE = 1;

createfield = () =>{
    htmlElements = [];
    cells = [];
    var table = document.getElementById('gamefield');
    for (var y = 0; y < size; y++){
        var tr = document.createElement('tr')
        var tdElements = [];
        cells.push(new Array(size).fill(DEAD));
        htmlElements.push(tdElements);
        table.appendChild(tr);
        for (var x = 0; x < size; x++){
            var td = document.createElement('td')
            tdElements.push(td);
            tr.appendChild(td)
        }
    };
};
    var fielddraw = ()=>{
        for (var y = 0; y < size; y++){
            for (var x = 0; x < size; x++){
                htmlElements[y][x].setAttribute("class", "cell " + (cells[y][x] == 1 ? "alive" : "dead"));
            };
        };
    };

    var initialSeed = () =>{
        for (var i = 0; i < Math.floor(size * size * 0.2); i++) {
            var x, y;
            do {
              x = Math.floor(Math.random() * size), y = Math.floor(Math.random() * size);
              if (cells[y][x] == DEAD) {
                cells[y][x] = ALIVE;
                break;
              }
            } while (true);
        };
    }

    var countNeighbours = (x,y) =>{
        var count = 0;
        for (cy = -1; cy <= 1; cy++){
            for (cx = -1; cx <= 1; cx++){
                var nx = (x + cx + size) % size, ny = (y + cy + size) % size;
                count = count + cells[ny][nx];
            };
        };
        return count - cells[y][x];
    }

    function newGeneration() {
        var newCells = [];
        for (var i = 0; i < size; i++) {
          newCells.push(new Array(size).fill(DEAD));
        }
        for (var y = 0; y < size; y++) {
          for (var x = 0; x < size; x++) {
            var neibhours = countNeighbours(x, y);
            if (cells[y][x] == DEAD && neibhours == 3) {
              newCells[y][x] = ALIVE;
            }
            if (cells[y][x] == ALIVE && (neibhours == 2 || neibhours == 3)) {
              newCells[y][x] = ALIVE;
            }
          }
        }
        cells = newCells;
        fielddraw();
      }

    var init = () =>{
        createfield();
        initialSeed();
        fielddraw();
        setInterval(() => {
            newGeneration()
        }, 100);
    };
    init();
    console.log(cells)