import React, { Dispatch, FC, SetStateAction, useState, ChangeEvent } from 'react';
import styles from "../modal.module.css";

import { AddModalData } from './stageModalData';
import { buildingState } from '@/app/interfaces/IBuilding';

interface IModal {
    id: number,
    isOpen: boolean,
    setModalState: Dispatch<SetStateAction<boolean>>,
    getBuilding: Dispatch<SetStateAction<buildingState | undefined>>
    type: string,
    stageId?: number
}

export const Modal: FC<IModal> = ({ id, isOpen,  setModalState, getBuilding, type, stageId = 0 }): JSX.Element => {
    const [responseStatus, setResponseStatus] = useState("none");

    const closeStagePopup = (): void => {
        setModalState(false);
    }

    return (
        <div className={`${styles.modalWrapper} ${isOpen ? '' : styles.modalClose}`}>
            <div className={styles.modal}>
                {type == 'add' && <AddModalData id={id} setResponseStatus={setResponseStatus} getBuilding={getBuilding} type={type} />}
                {type == 'update/remove' && <AddModalData id={id} setResponseStatus={setResponseStatus} getBuilding={getBuilding} type={type} stageId={stageId} setModalState={setModalState} />}
                <div className={styles.closeButtonWrapper} onClick={closeStagePopup}>
                    <span className={styles.closeButton}></span>
                </div>
                <div className={`${styles.responseWrapper} ${responseStatus == 'none' ? styles.responseWrapperHidden : ''}`}>
                    {responseStatus == 'ok' && <span>Успешно</span>}
                    {responseStatus == 'bad' && <span>Ошибка</span>}
                    {responseStatus == 'wait' && <span>Загрузка...</span>}
                </div>
            </div>
        </div>
    )
}
