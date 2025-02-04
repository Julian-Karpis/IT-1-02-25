





let board;
let score = 0
let rows = 4
let columns = 4

window.onload = function() { //når siden laster inn "starter" spillet
    setGame()
}

function setGame() { // funksjon for å starte spillet
    board = [
        [0, 0, 0, 0], //Standard brettet for 4x4 i array form
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]

    ]
    for (let r = 0; r < rows; r++) { //Looper gjennom arrayet og lager div elementer for hver av de 16 plassene
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div")
            tile.id = r.toString() + "-" + c.toString()
            let num = board[r][c]
            updateTile(tile, num)
            document.getElementById("board").append(tile)
        }
    }

    document.addEventListener("keyup", (e) => { //setter event listener på keyup for å kunne bruke piltaster
        if (e.code == "ArrowLeft") {
            slideLeft();
            setTwo();
        } else if (e.code == "ArrowRight") {
            slideRight();
            setTwo();
        } else if (e.code == "ArrowUp") {
            slideUp();
            setTwo();
        } else if (e.code == "ArrowDown") {
            slideDown();
            setTwo();
        }
        document.getElementById("score").innerText = score; //Oppdaterer scoren

    })
    setTwo(); //setter 2 diven i starten i en tilfeldig plass
    setTwo();
}

function hasEmptyTile() { //sjekker om det er tomme plasser på brettet
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {

            if (board[r][c] == 0) {
                return true;
            } 

        }
    }
    return false; //returnerer false hvis det ikke er tomme plasser
}

function setTwo() { // setter 2diven i en tilfeldig plass
if(!hasEmptyTile()) { 
    return; 
} 

    let found = false
    while (!found) { //while løkke som fortsetter til den har funnet en tom plass
        let r = Math.floor(Math.random() * rows)
        let c = Math.floor(Math.random() * columns)

        if (board[r][c] == 0) { // hvis plassen er tom
            board[r][c] = 2  //setter 2 på plassen
            let title = document.getElementById(r.toString() + "-" + c.toString()) // referer til riktig div
            title.innerText = 2 // bytter om teksten til 2 
            title.classList.add("x2") // legger til riktig klasse
            found = true 
        } 
        
    }
}

function updateTile(tile, num) { // oppdaterer en div
    tile.innerText = ""
    tile.classList.value = ""; //clearer classlisten verdien
    tile.classList.add("tile")

    if (num > 0) { //dersom tallet er mindre enn null
        tile.innerText = num
        if (num <= 4096) { // dersom tallet er mindre enn 4096
            tile.classList.add("x" + num.toString()) // legger til riktig klasse
        } else { // dersom tallet er større enn 4096
            tile.classList.add("x8192")
        }  
    }
}

function filterZero(row) { // filterer ut null verdier
    return row.filter(num => num != 0) // lager ny array
}


    function slide(row) {   //filterer ut null verdier
        row = filterZero(row)       // setter row til den nye arrayen
    
        for (let i = 0; i < row.length - 1; i++) { // sjekker om divene det er like
            if (row[i] == row[i + 1]) { // dersom de er like
                row[i] *= 2             // ganger dem med 2
                row[i + 1] = 0          // setter neste til 0
                score += row[i]         // legger til poeng
            }
        }
        row = filterZero(row);          //filterer ut null verdier igjen
        while (row.length < columns) { // dersom arrayen er mindre enn antall kolonner
            row.push(0)                 //legger til 0 i arrayen
        }
        return row                         // returnerer arrayen i funksjonen
    }
    
    
    
    function slideLeft() { // funkjson for å slide til venstre
        for (let r = 0; r < rows; r++) { //så lenge r er mindre enn antall rader
            let row = board[r];          // lager en variabel row og setter den til board[r]
    
    
            row = slide(row); // Slide the row to the left and merge
            board[r] = row;     //opptaderer board[r] til row
    
            for (let c = 0; c < columns; c++) { // så lenge c er mindre enn antall kolonner
                let tile = document.getElementById(r.toString() + "-" + c.toString()); // lager en variabel tile og setter den til r og c
                let num = board[r][c];
                updateTile(tile, num); //opptaderer tile til board[r][c]
            }

        }  
            
        
    }
    function slideRight() {  // samme funksjon som slideLeft, bare at den er reversert slik at den går motsatt vei til høyre
        for (let r = 0; r < rows; r++) {
            let row = board[r];
            row.reverse();
            row = slide(row);
            row.reverse();
            board[r] = row;
            for (let c = 0; c < columns; c++) {
                let tile = document.getElementById(r.toString() + "-" + c.toString());
                let num = board[r][c];
                updateTile(tile, num);
            }
        }
    }
    
    function slideUp() {        //funksjon for å slide opp
      for (let c = 0; c < columns; c++) { // så lenge c er mindre enn antall kolonner
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]]; //la row til å være en array med de fire første kolonnene
        row = slide(row); //kaller på funksjonen slide og setter row til å være det samme som returnen til funksjonen
        board[0][c] = row[0]; //setter board[0][c] til å være lik row[0] osv.
        board[1][c] = row[1];
        board[2][c] = row[2];
        board[3][c] = row[3];
    
        for (let r = 0; r < rows; r++) { // så lenge r er mindre enn antall rader
            board [r][c] = row[r]; // setter board[r][c] til å være lik row[r]
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c]; //
            updateTile(tile, num);
        }
      }
      }
    
      function slideDown() {
        for (let c = 0; c < columns; c++) {
          let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
          row.reverse();
          row = slide(row);
          row.reverse();
          board[0][c] = row[0];
          board[1][c] = row[1];
          board[2][c] = row[2];
          board[3][c] = row[3];
      
          for (let r = 0; r < rows; r++) {
              board [r][c] = row[r];
              let tile = document.getElementById(r.toString() + "-" + c.toString());
              let num = board[r][c];
              updateTile(tile, num);
          }
        }
        }

