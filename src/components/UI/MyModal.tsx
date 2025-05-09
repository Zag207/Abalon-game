import React, { ReactNode } from "react"
import classes from "../../scss/MyModal.module.scss"

interface MyModalProps{
    children: ReactNode,
    isVisible: boolean
}

const MyModal = ({children, isVisible}: MyModalProps) => {
    const rootClasses = [classes.myModal]

    if(isVisible)
        rootClasses.push(classes.myModalActive)

    return (
        <div className={rootClasses.join(" ")}>
            <div className={classes.myModalContent}>
                {children}
            </div>
        </div>
    )
};

export default MyModal;
