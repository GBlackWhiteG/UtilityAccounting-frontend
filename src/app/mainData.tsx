import React, { FC } from 'react'

export const GeneralInfo: FC = (): JSX.Element => {
    return (
        <>
            <h2>Общая информация о здании:</h2>
            <ul>
                <li>Количество этажей: <span></span></li>
                <li>Количество жителей: <span></span></li>
            </ul>
        </>
    )
}

export const TariffsInfo: FC = (): JSX.Element => {
    return (
        <>
            <h2>Тарифы жителей дома:</h2>
        </> 
    )
}

export const DebpsInfo: FC = (): JSX.Element => {
    return (
        <>
            <h2>Задолженности жителей дома:</h2>
        </> 
    )
}