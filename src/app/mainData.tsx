import React, { FC, useEffect, useState } from 'react';

import { getExcel } from './fetches/getExcel';
import { removeBuilding } from './fetches/removeBuilding';

import { buildingState } from './interfaces/IBuilding';

import styles from "./main.module.css";

interface IGeneralInfo {
    buildingInfo: buildingState | undefined
    buildingId?: number
}

export const GeneralInfo: FC<IGeneralInfo> = ({ buildingInfo, buildingId }): JSX.Element => {
    const countResidents = (): number => {
        let res: number = 0;
        if (buildingInfo !== undefined) {
            buildingInfo.stages.forEach(stage => {
                res += stage.payments.length;
            });
        }

        return res;
    }

    async function downloadFile() {
        if (buildingId) {
            const response = await getExcel(buildingId);

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'BuildingsStagesInfo.xlsx');

                document.body.appendChild(link);
                link.click();

                document.body.removeChild(link);
            }
        }
    }

    async function deleteBuilding() {
        if (buildingId) {
            const response = await removeBuilding(buildingId);

            if (response.ok) {
                window.location.reload();
            }
        }    
    }

    return (
        <div className={styles.generalInfoWrapper}>
            <div>
                <h2>Общая информация о здании:</h2>
                <ul>
                    <li>Количество этажей: <span>{buildingInfo !== undefined ? buildingInfo.stages.length : '...'}</span></li>
                    <li>Количество квартир: <span>{buildingInfo !== undefined ? countResidents() : '...'}</span></li>
                </ul>
            </div>
            <div className={styles.buttons}>
                <button className={styles.downloadButton} onClick={downloadFile}>Выгрузить данные</button>
                <button className={styles.downloadButton} onClick={deleteBuilding}>Удалить здание</button>
            </div>
        </div>
    )
}

export const TariffsInfo: FC<IGeneralInfo> = ({ buildingInfo }): JSX.Element => {
    let tariffs: number[][] = [];

    const getTarrifs = () => {
        let res: number[][] = [];
        if (buildingInfo !== undefined) {
            for (let i = 0; i < buildingInfo.stages.length; i++) {
                res.push(buildingInfo.stages[i].tariffs);
            }
        }

        tariffs = res;
    }

    getTarrifs();

    return (
        <>
            <h2>Тарифы жителей дома:</h2>
            <table className={styles.tariffsTable}>
                <tbody>
                    {tariffs.reverse().map((stageTariffs: number[], index: number) => (
                        <tr key={index}>
                            <th className={styles.tableCell}>{tariffs.length - index} эт.</th>
                            {stageTariffs.map((tariff: number, index: number) => (
                                <td className={styles.tableCell} key={index}>{tariff}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export const DebpsInfo: FC<IGeneralInfo> = ({ buildingInfo }): JSX.Element => {
    let payments: number[][] = [];

    const getPayments = () => {
        let res: number[][] = [];
        if (buildingInfo !== undefined) {
            for (let i = 0; i < buildingInfo.stages.length; i++) {
                let row: number[] = [];
                for (let j = 0; j < buildingInfo.stages[i].tariffs.length; j++) {
                    row.push(buildingInfo.stages[i].tariffs[j] - buildingInfo.stages[i].payments[j]);
                }
                res.push(row);
            }
        }

        payments = res;
    }

    getPayments();

    return (
        <>
            <h2>Задолженности жителей дома:</h2>
            <table className={styles.tariffsTable}>
                <tbody>
                    {payments.reverse().map((stagePayments: number[], index: number) => (
                        <tr key={index}>
                            <th className={styles.tableCell}>{payments.length - index} эт.</th>
                            {stagePayments.map((payment: number, index: number) => (
                                <td className={`${styles.tableCell} ${payment > 0 ? styles.debtCell : ''}`} key={index}>{payment}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}