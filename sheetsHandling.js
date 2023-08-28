const addSheetBtn = document.querySelector(".sheet-add-icon");
const sheetFolderCont = document.querySelector(".sheets-folder-cont");

addSheetBtn.addEventListener("click", (e) => {
  const sheet = document.createElement("div");
  sheet.setAttribute("class", "sheet-folder");

  const allSheetFolder = document.querySelectorAll(".sheet-folder");

  sheet.setAttribute("id", allSheetFolder.length);

  sheet.innerHTML = `<div class="sheet-content">Sheet ${
    allSheetFolder.length + 1
  }</div>`;

  sheetFolderCont.appendChild(sheet);

  createSheetDB();
  createGraphComponentMatrix();
  handleSheetActiveness(sheet);
  handleSheetRemoval(sheet);
  sheet.click();
});


const handleSheetRemoval = (sheet) => {
  sheet.addEventListener("mousedown", (e) => {
    if(e.button !== 2){
        return;
    }

    const allSheetFolder = document.querySelectorAll(".sheet-folder");
    if(allSheetFolder.length === 1){
        alert("Youe need to have atleast 1 Sheet");
        return;
    }

    const response = confirm("Your sheet will remove ! Are you sure ?");
    if(!response) return;

    const sheetIdx = Number(sheet.getAttribute("id"));
    collectedSheetDB.splice(sheetIdx , 1);
    collectedGraphComponentMatrix.splice(sheetIdx,1);
    sheet.remove();
    
    
    sheetDB = collectedSheetDB[0];
    graphComponentMatrix = collectedGraphComponentMatrix[0];
    handleSheetCellProperties();
  });
};


// function handleSheetUIRemoval(sheet) {
//   sheet.remove();
//   let allSheetFolders = document.querySelectorAll(".sheet-folder");
//   for (let i = 0;i < allSheetFolders.length;i++) {
//       allSheetFolders[i].setAttribute("id", i);
//       let sheetContent = allSheetFolders[i].querySelector(".sheet-content");
//       sheetContent.innerText = `Sheet ${i+1}`;
//       allSheetFolders[i].style.backgroundColor = "transparent";
//   }

//   allSheetFolders[0].style.backgroundColor = activeSheetColor;
// }


const updatingParticularSheetDB = (sheetIdx) => {
  sheetDB = collectedSheetDB[sheetIdx];
  graphComponentMatrix = collectedGraphComponentMatrix[sheetIdx];
};

const handleSheetCellProperties = () => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < col; j++) {
      const cellUI = document.querySelector(
        `.singleCell[rowid="${i}"][columnid="${j}"]`
      );

      // console.log(cellUI);

      cellUI.click();
    }
  }

  // ! By default click on First cell
  const firstCell = document.querySelector(".singleCell");
  firstCell.click();
};

const handleActiveSheetUI = (sheet) => {
  const allSheetFolder = document.querySelectorAll(".sheet-folder");

  for (let i = 0; i < allSheetFolder.length; i++) {
    allSheetFolder[i].style.backgroundColor = "green";
  }
  sheet.style.backgroundColor = "red";
};


const handleSheetActiveness = (sheet) => {
  sheet.addEventListener("click", (e) => {
    const sheetIdx = Number(sheet.getAttribute("id"));
    updatingParticularSheetDB(sheetIdx);
    handleSheetCellProperties();
    handleActiveSheetUI(sheet);
  });
};




const createSheetDB = () => {
  const sheetDB = [];

  for (let i = 0; i < rows; i++) {
    let rowSheet = [];
    for (let j = 0; j < col; j++) {
      let cellProps = {
        bold: false,
        italic: false,
        underline: false,
        fontFamily: "monospace",
        fontSize: "14",
        fontColor: "#000000",
        BGcolor: "#000000",
        alignment: "left",
        value: "",
        formula: "",
        children: [],
        cellName: "",
      };

      rowSheet.push(cellProps);
    }

    sheetDB.push(rowSheet);
  }
  collectedSheetDB.push(sheetDB);
};

const createGraphComponentMatrix = () => {
  const graphComponentMatrix = [];

  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < col; j++) {
      row.push([]);
    }
    graphComponentMatrix.push(row);
  }
  collectedGraphComponentMatrix.push(graphComponentMatrix);

};







