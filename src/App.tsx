import HexagonLine from "./components/HexagonLine"
import { useGameStore } from "./store/store"
import { ICircleCoordinates } from "./types/CircleTypes"
import MovingTypes from "./types/MovingTypes"

function App() {
  const circles = useGameStore(state => state.circles)
  const moving = useGameStore(state => state.moving)

  const deleteCircle = useGameStore(state => state.deleteCircleById)
  const changeMoving = useGameStore(state => state.setMoving)
  const changeIsMoving = useGameStore(state => state.setMovingCircleById)
  const changeCircleCoords = useGameStore(state => state.setCoordsById)

  const deleteCircleHandler = () => {
    const circle = circles.find(c => c.isChecked == true)

    if (circle != undefined) {
      deleteCircle(circle.id)
    }
  }

  const updateCoords = (coords: ICircleCoordinates, deltaLine: number, deltaDiagonal: number): ICircleCoordinates => {
    coords.line += deltaLine
    coords.diagonal += deltaDiagonal

    return coords
  }

  const getCircleDeltaCoords = (moveType: MovingTypes): ICircleCoordinates => {
    let deltaLine = 0
      let deltaDiagonal = 0

      switch (moveType) {
        case MovingTypes.UpRight:
          deltaLine = -1
          deltaDiagonal = 1
          break;
        case MovingTypes.Right:
          deltaDiagonal = 1
          break;
        case MovingTypes.DownRight:
          deltaLine = 1
          break;
        case MovingTypes.DownLeft:
          deltaLine = 1
          deltaDiagonal = -1
          break;
        case MovingTypes.Left:
          deltaDiagonal = -1
          break;
        case MovingTypes.UpLeft:
          deltaLine = -1
          break;
      }

      return {line: deltaLine, diagonal: deltaDiagonal}
  }

  const move = (moveType: MovingTypes) => {
    const circle = circles.find(c => c.isChecked == true)

    if (circle != undefined) {
      const {line, diagonal} = getCircleDeltaCoords(moveType)

      const coords = updateCoords(circle.coords, line, diagonal)
      changeMoving(moveType)
      changeIsMoving(circle.id, true)
      changeCircleCoords(circle.id, coords)
    }
  }

  return (
    <>
      <div className="container" >
        <HexagonLine startDiagonal={5} hexNumber={5} moving={moving} circles={circles.filter(circle => circle.coords.line == 1)} />
        <HexagonLine startDiagonal={4} hexNumber={6} moving={moving} circles={circles.filter(circle => circle.coords.line == 2)} />
        <HexagonLine startDiagonal={3} hexNumber={7} moving={moving} circles={circles.filter(circle => circle.coords.line == 3)} />
        <HexagonLine startDiagonal={2} hexNumber={8} moving={moving} circles={circles.filter(circle => circle.coords.line == 4)} />
        <HexagonLine startDiagonal={1} hexNumber={9} moving={moving} circles={circles.filter(circle => circle.coords.line == 5)} />
        <HexagonLine startDiagonal={1} hexNumber={8} moving={moving} circles={circles.filter(circle => circle.coords.line == 6)} />
        <HexagonLine startDiagonal={1} hexNumber={7} moving={moving} circles={circles.filter(circle => circle.coords.line == 7)} />
        <HexagonLine startDiagonal={1} hexNumber={6} moving={moving} circles={circles.filter(circle => circle.coords.line == 8)} />
        <HexagonLine startDiagonal={1} hexNumber={5} moving={moving} circles={circles.filter(circle => circle.coords.line == 9)} />
      </div>
      <button onClick={() => move(MovingTypes.Right)}>Move right</button>
      <button onClick={() => move(MovingTypes.UpRight)}>Move upRight</button>
      <button onClick={() => move(MovingTypes.Left)}>Move left</button>
      <button onClick={() => move(MovingTypes.UpLeft)}>Move upLeft</button>
      <button onClick={deleteCircleHandler}>Удалить фишку</button>
    </>
  )
}

export default App
