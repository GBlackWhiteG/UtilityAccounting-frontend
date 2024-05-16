import React, { FC, useState, Dispatch, SetStateAction } from "react"
import { addBuidling } from "@/app/interfaces/IBuilding"
import styles from '../modal.module.css'

interface IModal {
    isOpen: boolean,
    setModalState: Dispatch<SetStateAction<boolean>> // переместить в интерфейсы
}

export const Modal: FC<IModal> = ({ isOpen, setModalState }):JSX.Element => {
    const [firstCoordinateState, setFirstCoordinate] = useState('');
    const [secondCoordinateState, setSecondCoordinate] = useState('');
    const [buildingAddress, setBuildingAddres] = useState('');

    const closeBuildindPopup = (): void => {
        setModalState(false);
    }

    async function postStages(firstCoordinate: string, secondCoordinate: string, address: string): Promise<void> {
        const data: addBuidling = {
            coordinates: [parseFloat(firstCoordinate), parseFloat(secondCoordinate)],
            address: address
        }

        const headers = new Headers();
        headers.set("Content-Type", "application/json");
        const options = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        };

        const response = await fetch(`https://localhost:7004/api/building/add`, options);
    }

    return (
        <div className={`${styles.modalWrapper} ${styles.modalBuilding} ${isOpen ? '' : styles.modalClose}`}>
            <div className={styles.modal}>
                <h2 className={styles.formTitle}>Добавить новое здание</h2>
                <form className={styles.form}>
                    <div className={styles.coordinatesInputs}>
                        <div className={styles.formItem}>
                            <label htmlFor='firstCoordinate'>Первая координата:</label>
                            <input
                                placeholder="00.000000"
                                value={firstCoordinateState}
                                onChange={e => setFirstCoordinate(e.target.value)}
                                id='firstCoordinate'
                                type='text'
                                className={styles.formInput} />
                        </div>
                        <div className={styles.formItem}>
                            <label htmlFor='secondCoordinate'>Вторая координата:</label>
                            <input
                                placeholder="00.000000"
                                value={secondCoordinateState}
                                onChange={e => setSecondCoordinate(e.target.value)}
                                id='secondCoordinate'
                                type='text'
                                className={styles.formInput} />
                        </div>
                    </div>
                    <div className={styles.formItem}>
                            <label htmlFor='buildingAddress'>Адрес здания:</label>
                            <input
                                value={buildingAddress}
                                onChange={e => setBuildingAddres(e.target.value)}
                                id='buildingAddress'
                                type='text'
                                className={styles.formInput} />
                        </div>
                    <input 
                        type="submit"
                        value="Сохранить"
                        onClick={(e) => {e.preventDefault(), postStages(firstCoordinateState, secondCoordinateState, buildingAddress)}}
                        className={styles.saveButton}
                    />
                </form>
                <div className={styles.closeButtonWrapper} onClick={closeBuildindPopup}>
                    <span className={styles.closeButton}></span>
                </div>
            </div>
        </div>
    )
}