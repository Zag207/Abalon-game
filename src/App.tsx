import { useGameStore } from "./store/store"
import { CircleTypeEnum, ICircleCoordinates, ICircleType } from "./types/CircleTypes"
import {MovingTypes, MovingTypes1} from "./types/MovingTypes"
import classes from "./scss/Game.module.scss"
import Board from "./components/Board"
import Controls from "./components/Controls"

function App() {
  const circles = useGameStore(state => state.circles)
  const team = useGameStore(state => state.team)
  const moving = useGameStore(state => state.moving)
  const isErrorMove = useGameStore(state => state.isErrorMove)
  const movingMap: Map<number, MovingTypes> = new Map([
    [1, MovingTypes.UpRight],
    [2, MovingTypes.Right],
    [3, MovingTypes.DownRight],
    [4, MovingTypes.DownLeft],
    [5, MovingTypes.Left],
    [6, MovingTypes.UpLeft]
  ])

  console.log(`team ${useGameStore(state => state.team)}`);
  

  const deleteCircle = useGameStore(state => state.deleteCircleById)
  const changeMoving = useGameStore(state => state.setMoving)
  const setCircles = useGameStore(state => state.setCircles)
  const setMovingCircleById = useGameStore(state => state.setMovingCircleById)
  const setCoordsById = useGameStore(state => state.setCoordsById)
  const changeTeam = useGameStore(state => state.changeTeam)
  const setIsErrorMove = useGameStore(state => state.setIsErrorMove)

  const deleteCircleHandler = () => {
    const circle = circles.find(c => c.isChecked == true)

    if (circle != undefined) {
      deleteCircle(circle.id)
    }
  }

  const updateCoords = (coords: ICircleCoordinates, deltaCoords: ICircleCoordinates): ICircleCoordinates => { return {
    line: coords.line + deltaCoords.line,
    diagonal: coords.diagonal + deltaCoords.diagonal,
  }}
  const getCircleDeltaCoords = (moveDirection: MovingTypes): ICircleCoordinates => {
    let deltaLine = 0
      let deltaDiagonal = 0

      switch (moveDirection) {
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

  interface DiagonalLimits{
    diagonalStart: number,
    diagonalEnd: number
  }

  const getDiagonalLimitsForLine = (line: number): DiagonalLimits => {
    const res: DiagonalLimits = {
      diagonalStart: -1,
      diagonalEnd: -1
    }

    if (line > 0 && line <= 5) {
      line--
      res.diagonalEnd = 9
      res.diagonalStart = 5 - line
    }
    else if(line > 5 && line <= 9){
      line = 9 - line
      res.diagonalStart = 1
      res.diagonalEnd = 5 + line
    }
    
    return res
  }
  const isInBoard = (coords: ICircleCoordinates): boolean => {
    let res = false
    const {line, diagonal} = coords

    if(line >= 1 && line <= 9)
    {
      const limits = getDiagonalLimitsForLine(line)

      if(diagonal >= limits.diagonalStart && diagonal <= limits.diagonalEnd)
      {
        res = true
      }
    }
    
    return res
  }
  const isHexEmpty = (coords: ICircleCoordinates): boolean => circles.find(
    circle => circle.coords.line == coords.line && circle.coords.diagonal == coords.diagonal
  ) == undefined
  const getDistance = (coords1: ICircleCoordinates, coords2: ICircleCoordinates): number => Math.max(
    Math.abs(coords1.diagonal - coords2.diagonal), 
    Math.abs(coords1.line - coords2.line)
  )
  const checkForParall = (circlesChecked: ICircleType[], moving: MovingTypes): boolean => {
    const line = circlesChecked[0].coords.line
    const diagonal = circlesChecked[0].coords.diagonal

    const isOneLine = circlesChecked.reduce((acc, el) => acc && el.coords.line == line, true)
    const isOneDiagonal = circlesChecked.reduce((acc, el) => acc && el.coords.diagonal == diagonal, true)
    
    const sortedCircledChecked = circlesChecked.sort((a, b) => getDistance(a.coords, b.coords))

    const initRes = {
      res: true,
      prevCoords: {
        line: sortedCircledChecked[0].coords.line,
        diagonal: sortedCircledChecked[0].coords.diagonal
      }
    }
    const isOneOtherDiagonal = sortedCircledChecked.reduce((acc, item) => {
      const lineDist = item.coords.line - acc.prevCoords.line
      const diagonalDist = item.coords.diagonal - acc.prevCoords.diagonal
      const status = (lineDist == -1 || lineDist == 0) && (diagonalDist == 1 || diagonalDist == 0)

      return {
        res: acc.res && status,
        prevCoords: item.coords
      }
    }, initRes).res
    
    let res = isOneLine || isOneDiagonal || isOneOtherDiagonal
    console.log(`${isOneLine} + ${isOneDiagonal} + ${isOneOtherDiagonal} = ${res}`)
    
    // Проверка, свободна ли лунка по-направлению движения
    res = res && circlesChecked.reduce((acc, circle) => {
      const nextHexCoords = updateCoords(circle.coords, getCircleDeltaCoords(moving))

      return acc && isInBoard(nextHexCoords) && isHexEmpty(nextHexCoords)
    }, true)

    // Проверка, находятся ли фишки рядом
    res = res && sortedCircledChecked.reduce((acc, item) => {
      const status = getDistance(acc.prevCoords, item.coords) <= 1

      return {
        res: acc.res && status,
        prevCoords: item.coords
      }
    }, initRes).res

    return res
  }

  const getMovingType = (checkedCount: number): MovingTypes1 => {
    let res: MovingTypes1

    if(checkedCount == 1){
      res = MovingTypes1.Linear
    }
    else if(checkedCount > 1){
      res = MovingTypes1.Parallel
    }
    else{
      res = MovingTypes1.None
    }

    return res
  }

  const move = (moveDirection: MovingTypes) => {
    const circleChecked = circles.filter(c => c.isChecked == true)
    const movingType = getMovingType(circleChecked.length)

    if(movingType == MovingTypes1.Parallel)
    {
      const isGoodMove = checkForParall(circleChecked, moveDirection)
      console.log(isGoodMove);
      
      if(isGoodMove)
      {
        const circlesNew = circles.map(circle => {
          if (!circle.isChecked) return circle;
          
          return {
            ...circle,
            isMoving: true,
            coords: updateCoords(circle.coords, getCircleDeltaCoords(moveDirection)),
          }
        })
        changeTeam()
        setCircles(circlesNew)
      }

      setIsErrorMove(!isGoodMove)
    }
  }

  const createMove = (movingPosition: number) => {
    const movingCurrent = movingMap.get(movingPosition)

    return () => {
      if(movingCurrent != undefined && movingCurrent != MovingTypes.NoMove)
      {
        changeMoving(movingCurrent)
        move(movingCurrent)
      }
    }
  }

  return (
    <div className={classes.game}>
      <div className={classes.board} >
        <Board />
      </div>
      <div className={classes.controls}>
        <Controls createMovingFunctionCallback={createMove} />
      </div>
      <div className={classes["game-info"]}>
        {team == CircleTypeEnum.Black ? "Black" : "White"}
      </div>
    </div>
  )
}

export default App
