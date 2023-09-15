let ctrlKey;

document.addEventListener("keydown", (e) => {
  ctrlKey = e.ctrlKey;
});
document.addEventListener("keyup", (e) => {
  ctrlKey = e.ctrlKey;
});

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < col; j++) {
    const cellUI = document.querySelector(
      `.singleCell[rowid="${i}"][columnid="${j}"]`
    );

    handleSelectCells(cellUI);
  }
}

const copyBtn = document.querySelector(".copy");
const cutBtn = document.querySelector(".cut");
const pasteBtn = document.querySelector(".paste");

let rangeStorage = [];

function handleSelectCells(cell) {
  cell.addEventListener("click", (e) => {
    if (!ctrlKey) {
      return;
    }

    if (rangeStorage.length >= 2) {
      defaultSelectedCellUI();
      rangeStorage = [];
      return;
    }

    cell.style.border = "3px solid #218c74";

    const rid = Number(cell.getAttribute("rowid"));
    const cid = Number(cell.getAttribute("columnid"));
    rangeStorage.push([rid, cid]);

    console.log(rangeStorage);
  });
}

function defaultSelectedCellUI() {
  for (let i = 0; i < rangeStorage.length; i++) {
    const cellUI = document.querySelector(
      `.singleCell[rowid="${rangeStorage[i][0]}"][columnid="${rangeStorage[i][1]}"]`
    );

    console.log(cellUI);

    cellUI.style.border = "1px solid lightgrey";
  }
}

const copyData = [];

copyBtn.addEventListener("click", () => {
  // if (rangeStorage.length < 2) return;

  const stRow = rangeStorage[0][0];
  const stCol = rangeStorage[0][1];
  const endRow = rangeStorage[1][0];
  const endCol = rangeStorage[1][1];

  for (let i = stRow; i <= endRow; i++) {
    let copyRow = [];

    for (let j = stCol; j <= endCol; j++) {
      let cellProp = sheetDB[i][j];
      copyRow.push(cellProp);
    }
    copyData.push(copyRow);
  }

  defaultSelectedCellUI();
});



cutBtn.addEventListener("click", (e) => {
  if (rangeStorage.length < 2) return;

  let [strow, stcol, endrow, endcol] = [ rangeStorage[0][0], rangeStorage[0][1], rangeStorage[1][0], rangeStorage[1][1] ];

  for (let i = strow;i <= endrow;i++) {
      for (let j = stcol;j <= endcol;j++) {
          let cell = document.querySelector(
            `.singleCell[rowid="${i}"][columnid="${j}"]`
          );

          // DB
          let cellProp = sheetDB[i][j];
          cellProp.value = "";
          cellProp.bold = false;
          cellProp.italic = false;
          cellProp.underline = false;
          cellProp.fontSize = 14;
          cellProp.fontFamily = "monospace";
          cellProp.fontColor = "#000000";
          cellProp.BGcolor = "#000000";
          cellProp.alignment = "left";

          // UI
          cell.click();
      }
  }

  defaultSelectedCellUI();
})


pasteBtn.addEventListener('click',(e)=>{

  if (rangeStorage.length < 2) return;

  let rowDiff = Math.abs(rangeStorage[0][0] - rangeStorage[1][0]);
  let colDiff = Math.abs(rangeStorage[0][1] - rangeStorage[1][1]);

  const address = addressBar.value;

  const [stRow , stCol] = deocodeRowIdAndColumnId(address);



  for (let i = stRow,r = 0;i <= stRow+rowDiff;i++,r++) {
    for (let j = stCol,c = 0;j <= stCol+colDiff;j++,c++) {
      const cell = document.querySelector(
        `.singleCell[rowid="${i}"][columnid="${j}"]`
      );
        console.log(cell);
        if (!cell) continue;

        // DB
        let data = copyData[r][c];
        let cellProp = sheetDB[i][j];

        console.log(cellProp);

        cellProp.value = data.value;
        cellProp.bold = data.bold;
        cellProp.italic = data.italic;
        cellProp.underline = data.underline;
        cellProp.fontSize = data.fontSize;
        cellProp.fontFamily = data.fontFamily;
        cellProp.fontColor = data.fontColor;
        cellProp.BGcolor = data.BGcolor;
        cellProp.alignment = data.alignment;

        // UI
        cell.click();
        cell.click();
    }
}
  
} )
