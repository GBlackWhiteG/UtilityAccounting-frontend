import React, { FC, useState, Dispatch, SetStateAction, ChangeEvent } from "react"
import { addBuilding } from "@/app/interfaces/IBuilding"
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>, setCoordinate: Dispatch<SetStateAction<string>>): void => {
        const value = e.target.value;
        const regex = /^[0-9]{0,2}(\.[0-9]{0,6})?$/;

        if (regex.test(value)) {
            setCoordinate(value);
        }
    };

    async function postStages(firstCoordinate: string, secondCoordinate: string, address: string): Promise<void> {
        const data: addBuilding = {
            firstCoordinates: parseFloat(firstCoordinate),
            secondCoordinates: parseFloat(secondCoordinate),
            address: address
        }

        const headers = new Headers();
        headers.set("Content-Type", "application/json");
        const options = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        };

        const response = await fetch(`https://a26974-8b7b.k.d-f.pw/api/building/add`, options);
        
        if (response.ok) {
            window.location.reload();
        }
    }

    return (
        <div className={`${styles.modalWrapper} ${styles.modalBuilding} ${isOpen ? '' : styles.modalClose}`}>
            <div className={styles.modal}>
                <h2 className={styles.formTitle}>Добавить новое здание</h2>
                <form className={styles.form} onSubmit={(e) => {
                    e.preventDefault();
                    postStages(firstCoordinateState, secondCoordinateState, buildingAddress)
                    setFirstCoordinate("");
                    setSecondCoordinate("");
                    setBuildingAddres("");
                }}>
                    <div className={styles.coordinatesInputs}>
                        <div className={styles.formItem}>
                            <label htmlFor='firstCoordinate'>Первая координата:</label>
                            <input
                                placeholder="00.000000"
                                value={firstCoordinateState}
                                onChange={(e) => handleChange(e, setFirstCoordinate)}
                                id='firstCoordinate'
                                type='text'
                                pattern="[0-9]{2}\.[0-9]{6}"
                                className={styles.formInput}
                                required
                            />
                        </div>
                        <div className={styles.formItem}>
                            <label htmlFor='secondCoordinate'>Вторая координата:</label>
                            <input
                                placeholder="00.000000"
                                value={secondCoordinateState}
                                onChange={(e) => handleChange(e, setSecondCoordinate)}
                                id='secondCoordinate'
                                type='text'
                                pattern="[0-9]{2}\.[0-9]{6}"
                                className={styles.formInput}
                                required    
                            />
                        </div>
                    </div>
                    <div className={styles.formItem}>
                            <label htmlFor='buildingAddress'>Адрес здания:</label>
                            <input
                                value={buildingAddress}
                                onChange={e => setBuildingAddres(e.target.value)}
                                id='buildingAddress'
                                type='text'
                                className={styles.formInput}
                                required
                            />
                        </div>
                    <input 
                        type="submit"
                        value="Сохранить"
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