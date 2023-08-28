const collectedSheetDB = [];
let sheetDB = [];

{
  const addSheetBtn = document.querySelector(".sheet-add-icon");
  addSheetBtn.click();
}

// for (let i = 0; i < rows; i++) {
//   let rowSheet = [];
//   for (let j = 0; j < col; j++) {
//     let cellProps = {
//       bold: false,
//       italic: false,
//       underline: false,
//       fontFamily: "monospace",
//       fontSize: "14",
//       fontColor: "#000000",
//       BGcolor: "#000000",
//       alignment:"left",
//       value:"",
//       formula:"",
//       children:[],
//       cellName:""
//     };

//     rowSheet.push(cellProps);
//   }

//   sheetDB.push(rowSheet);
// }

// ! Selectors for cell Properties

const bold = document.querySelector(".bold");
const italic = document.querySelector(".italic");
const underline = document.querySelector(".underline");

const fontSize = document.querySelector(".font-size-prop");
const fontFamily = document.querySelector(".font-family-prop");
const fontColor = document.querySelector(".font-color-prop");
const bgColor = document.querySelector(".BGcolor-prop");

const alignment = document.querySelectorAll(".alignment");
const leftAlign = alignment[0];
const centerAlign = alignment[1];
const rightAlign = alignment[2];

const textIcon = document.querySelector(".text-icon");
const bgIcon = document.querySelector(".bg-icon");

// const addressBar = document.querySelectorAll(".address-bar");

const activeColor = "#d1d8e0";
const inActiveColor = "#ecf0f1";

// ! Attach Property listeners

bold.addEventListener("click", () => {
  const addressValue = addressBar.value;
  const [cellUI, cellDB] = activeCell(addressValue);

  cellDB.bold = !cellDB.bold;
  cellUI.style.fontWeight = cellDB.bold ? "bold" : "normal";
  bold.style.backgroundColor = cellDB.bold ? activeColor : inActiveColor;
});

// ! Italic

italic.addEventListener("click", () => {
  const addressValue = addressBar.value;
  const [cellUI, cellDB] = activeCell(addressValue);

  cellDB.italic = !cellDB.italic;
  cellUI.style.fontStyle = cellDB.italic ? "italic" : "normal";
  italic.style.backgroundColor = cellDB.italic ? activeColor : inActiveColor;
});

// ! Underline
underline.addEventListener("click", () => {
  const addressValue = addressBar.value;
  const [cellUI, cellDB] = activeCell(addressValue);

  cellDB.underline = !cellDB.underline;
  cellUI.style.textDecoration = cellDB.underline ? "underline" : "none";
  underline.style.backgroundColor = cellDB.underline
    ? activeColor
    : inActiveColor;
});
// ! Font Size
fontSize.addEventListener("change", () => {
  const addressValue = addressBar.value;
  const [cellUI, cellDB] = activeCell(addressValue);

  cellDB.fontSize = fontSize.value;
  cellUI.style.fontSize = fontSize.value + "px";
});

// ! Font Family

fontFamily.addEventListener("change", () => {
  const addressValue = addressBar.value;
  const [cellUI, cellDB] = activeCell(addressValue);

  cellDB.fontFamily = fontFamily.value;
  cellUI.style.fontFamily = fontFamily.value;
});

// ! Font Color

fontColor.addEventListener("change", () => {
  const addressValue = addressBar.value;
  const [cellUI, cellDB] = activeCell(addressValue);

  cellDB.fontColor = fontColor.value;
  cellUI.style.color = fontColor.value;
  textIcon.style.backgroundColor = fontColor.value;
});

// ! BG Color
bgColor.addEventListener("change", () => {
  const addressValue = addressBar.value;
  const [cellUI, cellDB] = activeCell(addressValue);

  cellDB.BGcolor = bgColor.value;
  cellUI.style.backgroundColor = bgColor.value;
  bgIcon.style.backgroundColor = bgColor.value;
});

// ! Alignment Property

alignment.forEach((item) => {
  item.addEventListener("click", (e) => {
    const addressValue = addressBar.value;
    const [cellUI, cellDB] = activeCell(addressValue);

    if (e.target.classList.contains("left")) {
      cellDB.alignment = "left";
      cellUI.style.textAlign = cellDB.alignment;

      leftAlign.style.backgroundColor = e.target.classList.contains("left")
        ? activeColor
        : inActiveColor;

      centerAlign.style.backgroundColor = inActiveColor;
      rightAlign.style.backgroundColor = inActiveColor;
    }
    if (e.target.classList.contains("center")) {
      cellDB.alignment = "center";
      cellUI.style.textAlign = cellDB.alignment;

      centerAlign.style.backgroundColor = e.target.classList.contains("center")
        ? activeColor
        : inActiveColor;

      leftAlign.style.backgroundColor = inActiveColor;
      rightAlign.style.backgroundColor = inActiveColor;
    }
    if (e.target.classList.contains("right")) {
      cellDB.alignment = "right";
      cellUI.style.textAlign = cellDB.alignment;

      rightAlign.style.backgroundColor = e.target.classList.contains("right")
        ? activeColor
        : inActiveColor;

      leftAlign.style.backgroundColor = inActiveColor;
      centerAlign.style.backgroundColor = inActiveColor;
    }
  });
});

// ! Chnaging UI of elements of Action Bar on the basis of Cell Properties



const addListenerToAttachCellProperties = (cell) => {
  cell.addEventListener("click", (e) => {
    const addressValue = addressBar.value;

    const [rowId, columnId] = deocodeRowIdAndColumnId(addressValue);

    const cellDB = sheetDB[rowId][columnId];

    console.log(cellDB);
    cellDB.cellName = addressValue;

    bold.style.backgroundColor = cellDB.bold ? activeColor : inActiveColor;
    italic.style.backgroundColor = cellDB.italic ? activeColor : inActiveColor;
    underline.style.backgroundColor = cellDB.underline
      ? activeColor
      : inActiveColor;

    fontSize.value = cellDB.fontSize;

    fontFamily.value = cellDB.fontFamily;

    textIcon.style.backgroundColor =
      cellDB.fontColor === "#000000" ? "transparent" : cellDB.fontColor;
    bgIcon.style.backgroundColor =
      cellDB.BGcolor === "#000000" ? "transparent" : cellDB.BGcolor;

    if (cellDB.alignment === "left") {
      leftAlign.style.backgroundColor = activeColor;
      centerAlign.style.backgroundColor = inActiveColor;

      rightAlign.style.backgroundColor = inActiveColor;
    }
    if (cellDB.alignment === "right") {
      leftAlign.style.backgroundColor = inActiveColor;
      centerAlign.style.backgroundColor = inActiveColor;

      rightAlign.style.backgroundColor = activeColor;
    }
    if (cellDB.alignment === "center") {
      leftAlign.style.backgroundColor = inActiveColor;
      centerAlign.style.backgroundColor = activeColor;

      rightAlign.style.backgroundColor = inActiveColor;
    }

    const formulaBar = document.querySelector(".formula-bar");
    formulaBar.value = cellDB.formula;
    cell.innerText = cellDB.value;
  });
};

const allCell = document.querySelectorAll(".singleCell");

for (let i = 0; i < allCell.length; i++) {
  addListenerToAttachCellProperties(allCell[i]);
}

const activeCell = (address) => {
  const [rowId, columnId] = deocodeRowIdAndColumnId(address);
  const cellUI = document.querySelector(
    `.singleCell[rowid="${rowId}"][columnid="${columnId}"]`
  );
  const cellDB = sheetDB[rowId][columnId];

  return [cellUI, cellDB];
};

const deocodeRowIdAndColumnId = (address) => {
  const rowId = Number(address.slice(1)) - 1;
  const columnId = address.charCodeAt(0) - 65;

  return [rowId, columnId];
};
