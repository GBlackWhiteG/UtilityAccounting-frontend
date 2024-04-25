import React, { FC } from 'react'
import { Map, ObjectManager, Placemark, YMaps } from 'react-yandex-maps'

const YandexMap: FC = () => {
    const handleClick = (e: any) => {
        console.log("Клик по: ")
    }

    const buildings = [
        { coordinates: [55.745083, 52.436990], id: 1 }
    ];

    return (
        <YMaps>
            <div style={{ width: '100vw', height: '100vh' }}>
                <Map
                    defaultState={{ center: [55.745083, 52.436990], zoom: 17 }}
                    width="100vw"
                    height="100vw"
                />
            </div>
        </YMaps>
    );
};

export default YandexMap;