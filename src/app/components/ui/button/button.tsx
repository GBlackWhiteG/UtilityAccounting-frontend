import React, { FC } from 'react'
import styles from "./button.module.css"

export const Button: FC<{ text: string }> = ({ text }):JSX.Element => {
    return (
        <button className={styles.button}>
            <span className={styles.buttonText}>{text}</span>
        </button>
    )
}