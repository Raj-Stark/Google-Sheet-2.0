for (let i = 0; i < rows; i++) {
  for (let j = 0; j < col; j++) {
    const cellUI = document.querySelector(
      `.singleCell[rowid="${i}"][columnid="${j}"]`
    );
    cellUI.addEventListener("blur", () => {
      const addressValue = addressBar.value;

      const [cellUI, cellDB] = activeCell(addressValue);
      const enteredData = cellUI.innerText;

      // ! If User tries to modify cell data manually
      if (Number(enteredData) !== Number(cellDB.value)) {
        console.log("This runs", enteredData, cellDB.value);
        cellDB.value = enteredData;
        removeChild(cellDB.formula);
        cellDB.formula = "";
        updateChildrenCells(addressValue);
      }
    });
  }
}

// ! Formula Bar
const formulaBar = document.querySelector(".formula-bar");

formulaBar.addEventListener("keydown", async (e) => {
  console.log(sheetDB);

  if (e.key === "Enter" && formulaBar.value) {
    // ! Remove child If formula gets updated
    const addressValue = addressBar.value;
    const [cellUI, cellDB] = activeCell(addressValue);

    if (formulaBar.value !== cellDB.formula) {
      removeChild(cellDB.formula);
    }
 
    // ! Cycle Detection Check ----------------------------
    addChildToGraphComponent(formulaBar.value , addressValue);

    const isCyclic =  isGraphCyclic(graphComponentMatrix);

    if(isCyclic){
      alert("Your Formula is Cyclic");
      removeChildFromGraphComponent(formulaBar.value , addressValue);
      return;
    }

    const valueAfterEvaluation = evaluatedValue(formulaBar.value);
    // ! Update in UI
    setCellUIAndCellDB(valueAfterEvaluation, formulaBar.value, addressValue);

    //
    associateChildren(formulaBar.value);
    updateChildrenCells(addressValue);
  }
});

// ! Update children cells
const updateChildrenCells = (parentAddress) => {
  const [cellUI, cellDB] = activeCell(parentAddress);

  const children = cellDB.children;

  for (let i = 0; i < children.length; i++) {
    const childAddress = children[i];

    const [childCellUI, childCellDB] = activeCell(childAddress);
    const childFormula = childCellDB.formula;
    const valueAterEvaluation = evaluatedValue(childFormula);

    setCellUIAndCellDB(valueAterEvaluation, childFormula, childAddress);
    updateChildrenCells(childAddress);
  }
};

// ! Children Association

const associateChildren = (formula) => {
  const childAddress = addressBar.value;

  const encodedFormula = formula.split(" ");

  for (let i = 0; i < encodedFormula.length; i++) {
    const ASCIvalue = encodedFormula[i].charCodeAt(0);

    if (ASCIvalue >= 65 && ASCIvalue <= 90) {
      const [cellUI, cellDB] = activeCell(encodedFormula[i]);
      cellDB.children.push(childAddress);
    }
  }
};

// ! Remove Child From Parent When Formula changes

const removeChild = (formula) => {
  const childAddress = addressBar.value;

  const encodedFormula = formula.split(" ");

  for (let i = 0; i < encodedFormula.length; i++) {
    const ASCIvalue = encodedFormula[i].charCodeAt(0);

    if (ASCIvalue >= 65 && ASCIvalue <= 90) {
      const [cellUI, cellDB] = activeCell(encodedFormula[i]);

      const idx = cellDB.children.indexOf(childAddress);
      cellDB.children.splice(idx, 1);
    }
  }
};

// ! Evaluation of formula
const evaluatedValue = (formula) => {
  const encodedFormula = formula.split(" ");

  for (let i = 0; i < encodedFormula.length; i++) {
    const ASCIvalue = encodedFormula[i].charCodeAt(0);

    if (ASCIvalue >= 65 && ASCIvalue <= 90) {
      const [cellUI, cellDB] = activeCell(encodedFormula[i]);
      encodedFormula[i] = cellDB.value;
    }
  }
  const decodedFormula = encodedFormula.join(" ");

  return eval(decodedFormula);
};

const setCellUIAndCellDB = (evaluatedValue, formula, addressValue) => {
  // const addressValue = addressBar.value;
  const [cellUI, cellDB] = activeCell(addressValue);
  cellUI.innerText = evaluatedValue;
  cellDB.value = evaluatedValue;
  cellDB.formula = formula;
};

// ! Cycle Detection Alog Parts :

const addChildToGraphComponent = (formula, childAddress) => {
  const [cRID, cCID] = deocodeRowIdAndColumnId(childAddress);

  const encodedFormula = formula.split(" ");

  for (let i = 0; i < encodedFormula.length; i++) {
    const ASCIvalue = encodedFormula[i].charCodeAt(0);

    if (ASCIvalue >= 65 && ASCIvalue <= 90) {
     
    // ! Parent ROW-ID COL-ID
      const [pRID, pCID] =   deocodeRowIdAndColumnId(encodedFormula[i]);
      graphComponentMatrix[pRID][pCID].push([cRID,cCID]); 

    }
  }
};



const removeChildFromGraphComponent = (formula , childAddress)=>{
  const [cRID, cCID] = deocodeRowIdAndColumnId(childAddress);
  const encodedFormula = formula.split(" ");

  for (let i = 0; i < encodedFormula.length; i++) {
    const ASCIvalue = encodedFormula[i].charCodeAt(0);

    if (ASCIvalue >= 65 && ASCIvalue <= 90) {
     
    // ! Parent ROW-ID COL-ID
      const [pRID, pCID] =   deocodeRowIdAndColumnId(encodedFormula[i]);
      graphComponentMatrix[pRID][pCID].pop(); 

    }
  }
}