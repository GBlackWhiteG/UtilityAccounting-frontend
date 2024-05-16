import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import styles from "../modal.module.css";

import { addState } from '@/app/interfaces/IStage';

interface IModal {
    id: number,
    isOpen: boolean,
    setModalState: Dispatch<SetStateAction<boolean>>
}

export const Modal: FC<IModal> = ({ id, isOpen,  setModalState }): JSX.Element => {
    const [tariffsState, setTariffs] = useState("");
    const [paymentsState, setPayments] = useState("");

    const closeStagePopup = (): void => {
        setModalState(false);
    }

    async function postStages(buidlingId: number, tariffs: string, payments: string): Promise<void> {
        const data: addState = {
            buildingId: buidlingId,
            tariffs: tariffs.split(' ').map(Number),
            payments: payments.split(' ').map(Number)
        }

        const headers = new Headers();
        headers.set("Content-Type", "application/json");
        const options = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        };

        const response = await fetch(`https://localhost:7004/api/stage/add`, options);
    }

    return (
        <div className={`${styles.modalWrapper} ${isOpen ? '' : styles.modalClose}`}>
            <div className={styles.modal}>
                <h2 className={styles.formTitle}>Добавить этаж для здания</h2>
                <form className={styles.form}>
                    <div className={styles.formItem}>
                        <label htmlFor='buildingId'>Id здания: <span>{id}</span></label>
                    </div>
                    <div className={styles.formItem}>
                        <label htmlFor='tariffs'>Тарифы:</label>
                        <input
                            value={tariffsState}
                            onChange={e => setTariffs(e.target.value)}
                            id='tariffs'
                            type="text"
                            className={styles.formInput} />
                    </div>
                    <div className={styles.formItem}>
                        <label htmlFor='payments'>Платежи:</label>
                        <input
                            value={paymentsState}
                            onChange={e => setPayments(e.target.value)}
                            id='payments'
                            type="text"
                            className={styles.formInput} />
                    </div>
                    <input type="submit" value="Сохранить" onClick={(e) => {e.preventDefault(), postStages(id, tariffsState, paymentsState)}} className={styles.saveButton} />
                </form>
                <div className={styles.closeButtonWrapper} onClick={closeStagePopup}>
                    <span className={styles.closeButton}></span>
                </div>
            </div>
        </div>
    )
}
