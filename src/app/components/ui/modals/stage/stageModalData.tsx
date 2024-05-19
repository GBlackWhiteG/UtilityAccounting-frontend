import React, { Dispatch, FC, SetStateAction, useState, ChangeEvent } from 'react';
import styles from "../modal.module.css";

import { getStages } from '@/app/fetches/getBuildingStates';
import { addStage } from '@/app/fetches/addStage';
import { updateStage } from '@/app/fetches/updateStage';
import { removeStage } from '@/app/fetches/removeStage';

import { buildingState } from '@/app/interfaces/IBuilding';

interface IAddModalData {
    id: number,
    setResponseStatus: Dispatch<SetStateAction<string>>,
    getBuilding: Dispatch<SetStateAction<buildingState | undefined>>
    type: string
    stageId?: number
    setModalState?: Dispatch<SetStateAction<boolean>>
}

export const AddModalData: FC<IAddModalData> = ({ id, setResponseStatus, getBuilding, type, stageId, setModalState }): JSX.Element => {
    const [tariffsState, setTariffs] = useState("");
    const [paymentsState, setPayments] = useState("");

    const handleAddressChange = (e: ChangeEvent<HTMLInputElement>, setNumbers: Dispatch<SetStateAction<string>>): void => {
        const value = e.target.value;
        const regex = /^[0-9\s]*$/;

        if (regex.test(value)) {
            setNumbers(value);
        }
    };

    const getBuildingData = () => {
        getStages(id).then((data) => {
            if (data) {
                getBuilding({ stages: data });
            }
        })
    }

    const responseAnimation = (response: Response): void => {
        setResponseStatus('wait');

        if (response.ok) {
            setResponseStatus('ok');
            getBuildingData();
        }
        else {
            setResponseStatus('bad');
        }

        setTimeout(() => {
            setResponseStatus('none');
        }, 2000)
    }

    async function postStage(buidlingId: number, tariffs: string, payments: string): Promise<void> {
        const response = await addStage(buidlingId, tariffs, payments);
        responseAnimation(response);
    }

    async function putStage(id: number, buildingId: number, tariffs: string, payments: string): Promise<void> {
        const response = await updateStage(id, buildingId, tariffs, payments);
        responseAnimation(response);
    }

    async function deleteStage(id: number | undefined) {
        const response = await removeStage(id);
        responseAnimation(response);
        if (setModalState) {
            setTimeout(() => {
                setModalState(false);
            }, 1000)
        }
    }

    return (
        <>
            <h2 className={styles.formTitle}>
                {type == 'add' && 'Добавить этаж для здания'}
                {type == 'update/remove' && 'Изменить/удалить этаж'}
            </h2>
            <form className={styles.form} onSubmit={(e) => {
                e.preventDefault();
                {type == 'add' && postStage(id, tariffsState, paymentsState);}
                {type == 'update/remove' && stageId && putStage(stageId, id, tariffsState, paymentsState);}
                setTariffs("");
                setPayments("");
            }}>
                <div className={`${styles.formItem} ${styles.splitFormItem}`}>
                    <label htmlFor='buildingId'>Id здания: <span>{id}</span></label>
                    {type == 'update/remove' && <label htmlFor='stageId'>Id этажа: <span>{stageId}</span></label>}
                </div>
                <div className={styles.formItem}>
                    <label htmlFor='tariffs'>Тарифы:</label>
                    <input
                        value={tariffsState}
                        onChange={(e) => {
                            handleAddressChange(e, setTariffs);
                        }}
                        id='tariffs'
                        type="text"
                        className={styles.formInput}
                        required />
                </div>
                <div className={styles.formItem}>
                    <label htmlFor='payments'>Платежи:</label>
                    <input
                        value={paymentsState}
                        onChange={(e) => handleAddressChange(e, setPayments)}
                        id='payments'
                        type="text"
                        className={styles.formInput}
                        required />
                </div>
                <div className={styles.submitButtons}>
                    {type == 'add' && <input type="submit" value="Сохранить" className={styles.saveButton} />}
                    {type == 'update/remove' && <input type="submit" value="Изменить" className={styles.saveButton} />}
                    {type == 'update/remove' && <input
                                                    type="submit"
                                                    value="Удалить"
                                                    className={styles.saveButton}
                                                    onClick={(e) => {e.preventDefault(); deleteStage(stageId)}}
                                                />}
                </div>
            </form>
        </>
    );
}
