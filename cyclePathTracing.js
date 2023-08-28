const isGraphCyclicTracePath = async(graphComponentMatrix, cycleResponse) => {
  const [srcRow, srcCol] = cycleResponse;

  // * Dependency Array
  const visited = []; // * Node Visit Trace
  const DFSvisited = []; // * Stack Visit Trace

  for (let i = 0; i < rows; i++) {
    const visitedRow = [];
    const DFSvisitedRow = [];
    for (let j = 0; j < col; j++) {
      visitedRow.push(false);
      DFSvisitedRow.push(false);
    }
    visited.push(visitedRow);
    DFSvisited.push(DFSvisitedRow);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < col; j++) {
      if (!visited[i][j]) {
        const response = DFScycleDetection(
          graphComponentMatrix,
          i,
          j,
          visited,
          DFSvisited
        );

        if (response) {
          return true;
        }
      }
    }
  }

  const response = await DFScycleDetectionTracePath(
    graphComponentMatrix,
    srcRow,
    srcCol,
    visited,
    DFSvisited
  );

  if (response) {
    return Promise.resolve(true);
  }

  return Promise.resolve(false);
};



const colorPromise = ()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve();
        },1000)
    })
}

// * Start -> vis(TRUE) dfsVis(TRUE)
//* End -> dfsVis(FALSE)
//* If vis[i][j] -> already explored path, so go back no use to explore again
//* Cycle detection condition -> if (vis[i][j] == true && dfsVis[i][j] == true) -> cycle
//* Return -> True/False
//* True -> cyclic, False -> Not cyclic

const DFScycleDetectionTracePath = async(
  graphComponentMatrix,
  srcRow,
  srcCol,
  visited,
  DFSvisited
) => {
  visited[srcRow][srcCol] = true;
  DFSvisited[srcRow][srcCol] = true;


  const cellUI = document.querySelector(
    `.singleCell[rowid="${srcRow}"][columnid="${srcCol}"]`
  );

  cellUI.style.backgroundColor = "lightblue";
  await colorPromise();

  for (
    let children = 0;
    children < graphComponentMatrix[srcRow][srcCol].length;
    children++
  ) {
    const [childRID, childCID] = graphComponentMatrix[srcRow][srcCol][children];

    if (!visited[childRID][childCID]) {
      const response = await DFScycleDetectionTracePath(
        graphComponentMatrix,
        childRID,
        childCID,
        visited,
        DFSvisited
      );
      if (response) {
        cellUI.style.backgroundColor = "transparent";
        await colorPromise();
        return Promise.resolve(true);
      }
    } else if (visited[childRID][childCID] && DFSvisited[childRID][childCID]) {
        const cyclicCell = document.querySelector(
            `.singleCell[rowid="${childRID}"][columnid="${childCID}"]`
          );
          cyclicCell.style.backgroundColor = "lightsalmon";
          await colorPromise();
          cyclicCell.style.backgroundColor = "transparent";
          cellUI.style.backgroundColor = "transparent";
          await colorPromise();
      return true;
    }
  }

  DFSvisited[srcRow][srcCol] = false;

  return Promise.resolve(false);
};
