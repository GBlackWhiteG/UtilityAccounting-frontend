import React, { FC, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Map, Placemark, ObjectManager, YMaps } from 'react-yandex-maps'
import { Modal } from './components/ui/modals/buidling/buildingModal';
import styles from "./main.module.css";
import { buildingState, building } from './interfaces/IBuilding';
import { getStages } from '@/app/fetches/getBuildingStates';

interface IYandexMap {
    setWindowState: Dispatch<SetStateAction<boolean>>
    getBuilding: Dispatch<SetStateAction<buildingState | undefined>>
    setBuildingId: Dispatch<SetStateAction<number>>
}

const YandexMap: FC<IYandexMap> = ({ setWindowState, getBuilding, setBuildingId }) => {
    const [buildings, setBuildings] = useState<building[] | undefined>(undefined);
    const [isBuidlingPopupOpen, setBuildlingState] = useState(false);

    const openInfoWindow = (): void  => {
        setWindowState(true);
    };

    const openBuildingPopup = (): void => {
        setBuildlingState(true);
    }

    async function getBuildings(): Promise<building[] | undefined> {
        const headers = new Headers();
        headers.set("Content-Type", "application/json");
        const options = {
            method: "GET",
            headers: headers
        };

        const response = await fetch(`https://localhost:44383/api/building/list`, options);
        if (response.ok) {
            return await response.json();
        }
        return undefined;
    }

    const markClick = (e: any) => {
        const objId = e.get('objectId');
        
        getStages(objId).then((data) => {
            if (data) {
                getBuilding({stages: data});
            }
        });
        setBuildingId(objId);
        openInfoWindow();
    };

    useEffect(() => {
        getBuildings().then((data) => {
            if (data) {
                setBuildings(data);
            }
        })
    }, [])

    return (
        <div>
            <YMaps>
                <Map
                    defaultState={{ center: [55.745083, 52.436990], zoom: 17 }}
                    className={styles.map}
                >
                    <ObjectManager
                        options={{
                            clusterize: true
                        }}
                        objects={{
                            openBalloonOnClick: true,
                        }}
                        onClick={markClick}
                        features={(buildings || []).map((building) => ({
                            type: 'Feature',
                            id: building.id,
                            geometry: {
                                type: 'Point',
                                coordinates: [building.firstCoordinate, building.secondCoordinate ]
                            },
                            properties: {
                                objectId: building.id,
                            },
                        }))}
                    />
                </Map>
            </YMaps>
            <div className={`${styles.addButtonWrapper} ${styles.addBuildingWrapper}`} onClick={openBuildingPopup}>
                <span className={styles.addButton}></span>
            </div>
            <Modal isOpen={isBuidlingPopupOpen} setModalState={setBuildlingState} />
        </div>
    );
};

export default YandexMap;
