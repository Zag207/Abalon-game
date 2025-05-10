import classes from "../scss/GameInfo.module.scss"
import { useGameStore } from "../store/store";
import { CircleTypeEnum } from "../types/CircleTypes";

const GameInfo = ({}) => {
    const scoreBlack = useGameStore(state => state.scoreBlack)
    const scoreWhite = useGameStore(state => state.scoreWhite)
    const team = useGameStore(state => state.team)

    return (
        <div className={classes.gameInfo}>
            <div className={`${classes.gameInfoItem} ${classes.black} ${team == CircleTypeEnum.Black ? classes.selected : ""}`}>
                Black score: {scoreBlack}
            </div>
            <div className={`${classes.gameInfoItem} ${classes.white} ${team == CircleTypeEnum.White ? classes.selected : ""}`}>
                White score: {scoreWhite}
            </div>
        </div>
    )
};

export default GameInfo;
