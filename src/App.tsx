import { useGameStore } from "./store/store"
import { CircleTypeEnum, CircleCoordinates, CircleType } from "./types/CircleTypes"
import { MovingTypes, MovingTypes1 } from "./types/MovingTypes"
import classes from "./scss/App.module.scss"
import Board from "./components/Board"
import Controls from "./components/Controls"
import GameInfo from "./components/GameInfo"
import { useEffect } from "react"
import MyModal from "./components/UI/MyModal"
import WinNotification from "./components/WinNotification"

function App() {
  const circles = useGameStore(state => state.circles)
  const team = useGameStore(state => state.team)
  const movingMap: Map<number, MovingTypes> = new Map([
    [1, MovingTypes.UpRight],
    [2, MovingTypes.Right],
    [3, MovingTypes.DownRight],
    [4, MovingTypes.DownLeft],
    [5, MovingTypes.Left],
    [6, MovingTypes.UpLeft]
  ])
  
  const getWinnerTeam = useGameStore(state => state.getWinnerTeam)
  const getIsWin = useGameStore(state => state.isWin)
  const changeMoving = useGameStore(state => state.setMoving)
  const setCircles = useGameStore(state => state.setCircles)
  const changeTeam = useGameStore(state => state.changeTeam)
  const setIsErrorMove = useGameStore(state => state.setIsErrorMove)
  const increaseScore = useGameStore(state => state.increaseScore)

  const updateCoords = (coords: CircleCoordinates, deltaCoords: CircleCoordinates): CircleCoordinates => { return {
    line: coords.line + deltaCoords.line,
    diagonal: coords.diagonal + deltaCoords.diagonal,
  }}
  const getCircleDeltaCoords = (moveDirection: MovingTypes): CircleCoordinates => {
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
  const isInBoard = (coords: CircleCoordinates): boolean => {
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
  interface DiagonalLimits{
    diagonalStart: number,
    diagonalEnd: number
  }

  const isHexEmpty = (coords: CircleCoordinates): boolean => circles.find(
    circle => circle.coords.line == coords.line && circle.coords.diagonal == coords.diagonal
  ) == undefined
  const getDistance = (coords1: CircleCoordinates, coords2: CircleCoordinates): number => Math.max(
    Math.abs(coords1.diagonal - coords2.diagonal), 
    Math.abs(coords1.line - coords2.line)
  )
  const checkForParall = (circlesChecked: CircleType[], moving: MovingTypes): boolean => {
    const line = circlesChecked[0].coords.line
    const diagonal = circlesChecked[0].coords.diagonal

    const isOneLine = circlesChecked.reduce((acc, el) => acc && el.coords.line == line, true)
    const isOneDiagonal = circlesChecked.reduce((acc, el) => acc && el.coords.diagonal == diagonal, true)
    
    let sortedCircledChecked = circlesChecked.sort((a, b) => a.coords.diagonal - b.coords.diagonal)
    
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
    
    // Проверка, свободна ли лунка по-направлению движения
    res = res && circlesChecked.reduce((acc, circle) => {
      const nextHexCoords = updateCoords(circle.coords, getCircleDeltaCoords(moving))

      return acc && isInBoard(nextHexCoords) && isHexEmpty(nextHexCoords)
    }, true)

    // Проверка, находятся ли фишки рядом
    sortedCircledChecked = circlesChecked.sort((a, b) => getDistance(a.coords, b.coords))
    res = res && sortedCircledChecked.reduce((acc, item) => {
      const status = getDistance(acc.prevCoords, item.coords) <= 1

      return {
        res: acc.res && status,
        prevCoords: item.coords
      }
    }, initRes).res

    return res
  }
  const getEmemyTeam = (team: CircleTypeEnum): CircleTypeEnum => team == CircleTypeEnum.Black ? CircleTypeEnum.White : CircleTypeEnum.Black
  const getCircleLine = (circleChecked: CircleType, moving: MovingTypes): CircleType[] => {
    const deltaCoords = getCircleDeltaCoords(moving)
    const circleLine = [circleChecked]

    let nextCoords = updateCoords(circleLine[circleLine.length - 1].coords, deltaCoords)

    while (isInBoard(nextCoords) && !isHexEmpty(nextCoords)) {
      circleLine.push(circles.find(circle => circle.coords.line == nextCoords.line && circle.coords.diagonal == nextCoords.diagonal)!)
      nextCoords = updateCoords(circleLine[circleLine.length - 1].coords, deltaCoords)
    }

    return circleLine
  }
  const checkForLinear = (circleLine: CircleType[], moving: MovingTypes): boolean => {
    let res = true
    const deltaCoords = getCircleDeltaCoords(moving)
    const enemyTeam = getEmemyTeam(team)

    const myTeamCircleCount = circleLine.filter(circle => circle.type == team).length
    const enemyCircleCount = circleLine.filter(circle => circle.type == enemyTeam).length
    const isEndBoard = !isInBoard(updateCoords(circleLine[circleLine.length - 1].coords, deltaCoords))
    const firstEnemyCoords = circleLine.find(circle => circle.type == enemyTeam)?.coords
    const lastMyCoords = [...circleLine].reverse().find(circle => circle.type == team)!.coords

    if(myTeamCircleCount > 3)
      res &&= false
    else if(enemyCircleCount > 0)
    {
      if(enemyCircleCount >= myTeamCircleCount)
        res &&= false

      const expectedEnemyCoords = updateCoords(lastMyCoords, deltaCoords)

      if(firstEnemyCoords!.line != expectedEnemyCoords.line || firstEnemyCoords!.diagonal != expectedEnemyCoords.diagonal)
        res &&= false
    }
    else if(enemyCircleCount == 0 && isEndBoard)
      res &&= false
    else
      res &&= true

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
    else if(movingType == MovingTypes1.Linear)
    {
      const circleLine = getCircleLine(circleChecked[0], moveDirection)
      const isGoodMove = checkForLinear(circleLine, moveDirection)

      if(isGoodMove)
      {
        const circlesNew = circles.map(circle => {
          if (circleLine.find(el => el.id == circle.id) == undefined) return circle;
          
          const newCoords = updateCoords(circle.coords, getCircleDeltaCoords(moveDirection))

          if(!isInBoard(newCoords))
            increaseScore(getEmemyTeam(circle.type))

          return {
            ...circle,
            isMoving: true,
            coords: newCoords,
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

  useEffect(() => {
    const filteredCircles = circles.filter(circle => isInBoard(circle.coords))

    if(filteredCircles.length < circles.length)
      setCircles(filteredCircles)
  })

  return (
    <div className={classes.game}>
      <MyModal isVisible={getIsWin()}>
        <WinNotification winnerTeam={getWinnerTeam()} />
      </MyModal>
      <div className={classes.board} >
        <Board />
      </div>
      <div className={classes.controls}>
        <Controls createMovingFunctionCallback={createMove} />
      </div>
      <div className={classes["game-info"]}>
        <GameInfo />
      </div>
    </div>
  )
}

export default App
