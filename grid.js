

let rows = 100;
let col = 26;

let addressColCont = document.querySelector(".address-col-cont");
let addressRowCont = document.querySelector(".address-row-cont");
let allCellCont = document.querySelector(".cells-cont");
let addressBar = document.querySelector(".address-bar");



for(let i = 0; i < rows; i++){
    const addressRow = document.createElement("div");
    addressRow.setAttribute("class" , "addressRow")
    addressRow.innerText = i + 1;
    addressRowCont.appendChild(addressRow);
}

for(let i = 0; i < col; i++){
    const addressCol = document.createElement("div");
    addressCol.setAttribute("class" , "addressCol");
    addressCol.innerText = String.fromCharCode(65 + i);
    addressColCont.appendChild(addressCol);
}



// ! Creating Cells 
 let count = 1;
for(let i = 0; i < rows; i++){
    let rowCellCont = document.createElement("div");
    rowCellCont.setAttribute("class" ,"rowCellCont");

    for(let j = 0; j < col; j++){
        const singleCell = document.createElement("div");
        singleCell.setAttribute("class" ,"singleCell");
        // singleCell .innerText = count++;
        singleCell.setAttribute("contenteditable",true)
        singleCell.setAttribute("spellcheck" , false)
        // ! Attribue For cell storage identification
        singleCell.setAttribute("rowId",i);
        singleCell.setAttribute("columnId",j);
        rowCellCont.appendChild(singleCell)
        addListnerForAddressDisplay(singleCell,i ,j);
    }
  allCellCont.appendChild(rowCellCont)
}



function addListnerForAddressDisplay(cell , i , j){
  
    cell.addEventListener('click' , ()=>{
      const alphabet = String.fromCharCode(65 + j);
      const number = i+1;

      addressBar.value = `${alphabet}${number}`
    })
}

