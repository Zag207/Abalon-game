import HexagonLine from "./components/HexagonLine"
import { useGameStore } from "./store/store";
import MovingTypes from "./types/MovingTypes";

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

  const moveRight = () => {
    const circle = circles.find(c => c.isChecked == true)

    if (circle != undefined) {
      const coords = circle.coords
      coords.diagonal += 1

      changeMoving(MovingTypes.Right)
      changeIsMoving(circle.id, true)
      changeCircleCoords(circle.id, coords)
    }
  }

  const moveUpRight = () => {
    const circle = circles.find(c => c.isChecked == true)

    if (circle != undefined) {
      const coords = circle.coords
      coords.line -= 1
      coords.diagonal += 1

      changeMoving(MovingTypes.UpRight)
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
      <button onClick={moveRight}>Move right</button>
      <button onClick={moveUpRight}>Move upRight</button>
      <button onClick={deleteCircleHandler}>Удалить фишку</button>
    </>
  )
}

export default App
