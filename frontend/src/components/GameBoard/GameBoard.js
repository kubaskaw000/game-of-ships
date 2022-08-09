import "./GameBoard.css";

const GameBoard = ({ playerShipsPositions, visibility }) => {
  const board = [];

  const ships = [
    ["A1", "A2", "A3"],
    ["B1", "B2"],
  ];

  const coordsX = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const coordsY = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  for (let j = 0; j < coordsY.length; j++) {
    for (let i = 0; i < coordsX.length; i++) {
      let fieldNumber = coordsY[j] + coordsX[i];

      if (fieldNumber)
        board.push(
          <div className="board__field" id={fieldNumber}>
            {fieldNumber}
          </div>
        );
    }
  }

  console.log(board);

  return <div className="board">{board}</div>;
};

export default GameBoard;
