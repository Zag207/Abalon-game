import React from "react"
import { CircleTypeEnum } from "../types/CircleTypes"
import classes from "../scss/WinNotification.module.scss"

interface WinNotificationProps{
    winnerTeam: CircleTypeEnum
}

const WinNotification:React.FC<WinNotificationProps> = ({winnerTeam}) => {
    let teamClass: string = ""

    switch (winnerTeam) {
        case CircleTypeEnum.Black:
            teamClass = classes.black
            break;
        case CircleTypeEnum.White:
            teamClass = classes.white
            break;
    }
    
    return (
        <div className={classes.winNotificationContainer}>
            <div className={classes.winNotificationContent}>
                Win <span className={teamClass}> {winnerTeam == CircleTypeEnum.Black ? "Black" : "White"}</span>
            </div>
        </div>
    )
};

export default WinNotification;
