const graphComponentMatrix = [];

for (let i = 0; i < rows; i++) {
  const row = [];
  for (let j = 0; j < col; j++) {
    row.push([]);
  }
  graphComponentMatrix.push(row);
}

const isGraphCyclic = (graphComponentMatrix) => {
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

  return false;
};

// * Start -> vis(TRUE) dfsVis(TRUE)
//* End -> dfsVis(FALSE)
//* If vis[i][j] -> already explored path, so go back no use to explore again
//* Cycle detection condition -> if (vis[i][j] == true && dfsVis[i][j] == true) -> cycle
//* Return -> True/False
//* True -> cyclic, False -> Not cyclic

const DFScycleDetection = (
  graphComponentMatrix,
  srcRow,
  srcCol,
  visited,
  DFSvisited
) => {
  visited[srcRow][srcCol] = true;
  DFSvisited[srcRow][srcCol] = true;

  for (
    let children = 0;
    children < graphComponentMatrix[srcRow][srcCol].length;
    children++
  ) {
    const [childRID, childCID] = graphComponentMatrix[srcRow][srcCol][children];

    if (!visited[childRID][childCID]) {
      const response = DFScycleDetection(
        graphComponentMatrix,
        childRID,
        childCID,
        visited,
        DFSvisited
      );
      if (response) {
        return true;
      }
    } else if (visited[childRID][childCID] && DFSvisited[childRID][childCID]) {
      return true;
    }
  }

  DFSvisited[srcRow][srcCol] = false;

  return false;
};
