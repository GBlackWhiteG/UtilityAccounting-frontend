'use client'
import { useState } from "react";
import styles from "./main.module.css";
import { GeneralInfo, TariffsInfo, DebpsInfo } from "./mainData";
import YandexMap from "./map";
import { Modal } from "./components/ui/modals/stage/stageModal";

import { buildingState } from "./interfaces/IBuilding";

export default function Home() {
  const [isWindowOpen, setWindowState] = useState(false);
  const [building, getBuilding] = useState<buildingState | undefined>();
  const [page, setPage] = useState("general");
  const [isStagePopupOpen, setStageModalState] = useState(false);

  const closeInfoWindow = (): void => {
    setWindowState(false);
  }

  const handleBuilding = (buildingInfo: buildingState | undefined): void => {
    getBuilding(buildingInfo);
  }

  const handlePageChange = (pageName: string): void => {
    setPage(pageName);
  }

  const openStagePopup = (): void => {
    setStageModalState(true);
  }

  let stages: number[] = [];
  if (building !== undefined) {
    for (let i = 0; i < building?.stages.length; i++) {
      stages.push(i);
    }
  }

  return (
    <main>
      <div className="container">
        <div className={`${styles.mapContainer} ${isWindowOpen ? styles.disableMap : ''}`}>
          <YandexMap setWindowState={setWindowState} getBuilding={handleBuilding} />
        </div>
        <div className={isWindowOpen ? styles.wrapper : `${styles.wrapperClose} ${styles.wrapper}`}>
          <ul className={`${styles.leftBlock} ${styles.contentBlock}`}>
            <li className={stages.length > 0 ? styles.roof : styles.hiddenEl}></li>
            {stages.map((index: number) => (
              <li key={index} className={styles.stage}></li>
            ))}
            <li className={stages.length > 0 ? styles.base : styles.hiddenEl}></li>
            <div className={styles.addButtonWrapper} onClick={openStagePopup}>
              <span className={styles.addButton}></span>
            </div>
          </ul>
          <div className={`${styles.rightBlock} ${styles.contentBlock}`}>
            <ul className={styles.contentNavigation}>
              <li className={page === "general" ? `${styles.item__contentNavigation} ${styles.activeItem__contentNavigation}` : styles.item__contentNavigation} onClick={() => handlePageChange("general")}>Общее</li>
              <li className={page === "tariffs" ? `${styles.item__contentNavigation} ${styles.activeItem__contentNavigation}` : styles.item__contentNavigation} onClick={() => handlePageChange("tariffs")}>Тарифы</li>
              <li className={page === "debts" ? `${styles.item__contentNavigation} ${styles.activeItem__contentNavigation}` : styles.item__contentNavigation} onClick={() => handlePageChange("debts")}>Задолженность</li>
            </ul>
            <div className="informationBlock">
              {page == "general" && <GeneralInfo buildingInfo={building} />}
              {page == "tariffs" && <TariffsInfo buildingInfo={building} />}
              {page == "debts" && <DebpsInfo buildingInfo={building} />}
            </div>
            <div className={styles.closeButtonWrapper} onClick={closeInfoWindow}>
              <span className={styles.closeButton}></span>
            </div>
          </div>
        </div>
        <Modal id={building && building.stages.length > 0 ? building.stages[0].buildingId : 0} isOpen={isStagePopupOpen} setModalState={setStageModalState} />
      </div>
    </main>
  );
}