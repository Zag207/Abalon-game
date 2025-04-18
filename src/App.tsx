import { useState } from "react"
import { CircleTypeEnum, ICircleType } from "./types/CircleTypes"
import MovingTypes from "./types/MovingTypes"
import HexagonLine from "./components/HexagonLine"

function App() {
  const prepareCircles = () => {
      let line = 1
      let diagonal = 1


  };

  const [circles, setCircles] = useState<ICircleType[]>([
  {
    id: 1,
    type: CircleTypeEnum.Black,
    coords: {
      line: 1,
      diagonal: 5
    },
    isChecked: false,
    isMoving: false
  },
  {
    id: 2,
    type: CircleTypeEnum.White,
    coords: {
      line: 1,
      diagonal: 9
    },
    isChecked: false,
    isMoving: false
  }
  ])
  const [moving, setMoving] = useState<MovingTypes>(MovingTypes.NoMove)

  const updateChecked = (id: number, value: boolean): void => {
    const circle = circles.find(v => v.id == id)
    
    if(circle != undefined){
      circle.isChecked = value
      setCircles([...circles])
    }
  }

  const moveRight = (): void => {
    circles[0].coords.diagonal = circles[0].coords.diagonal + 1
    circles[0].isMoving = true;

    setMoving(MovingTypes.Right)
    setCircles(circles)
  }

  const moveLeft = (): void => {
    circles[0].coords.diagonal = circles[0].coords.diagonal - 1
    circles[0].isMoving = true;

    setMoving(MovingTypes.Left)
    setCircles(circles)
  }

  const clearMoving = (id: number): void => {
    const circle = circles.find(v => v.id == id)
    
    if(circle != undefined){
      circle.isMoving = false
      setCircles([...circles])
    }
    setMoving(MovingTypes.NoMove)
  }

  return (
    <>
      <div className="container" >
        <HexagonLine startDiagonal={5} hexNumber={5} moving={moving} circles={circles} updateCheckedCallback={updateChecked} />
      </div>
      <button onClick={moveRight}>Move right</button>
      <button onClick={moveLeft}>Move left</button>
    </>
  )
}

export default App
