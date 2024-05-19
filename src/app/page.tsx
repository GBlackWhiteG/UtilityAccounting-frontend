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
  const [buildingId, setBuildingId] = useState(0);
  const [stageId, setStageId] = useState(0);
  const [page, setPage] = useState("general");
  const [isAddStagePopupOpen, setAddStageModalState] = useState(false);
  const [isUpdateRemoveStagePopupOpen, setUpdateRemoveStageModalState] = useState(false);

  const closeInfoWindow = (): void => {
    setWindowState(false);
  }

  const handleBuilding = (buildingInfo: buildingState | undefined): void => {
    getBuilding(buildingInfo);
  }

  const handlePageChange = (pageName: string): void => {
    setPage(pageName);
  }

  const openAddStagePopup = (): void => {
    setAddStageModalState(true);
  }

  let stages: number[]  = [];
  if (building !== undefined) {
    for (let i = 0; i < building?.stages.length; i++) {
        stages.push(building.stages[i].id);
    }
  }

  

  return (
    <main>
      <div className="container">
        <div className={`${styles.mapContainer} ${isWindowOpen ? styles.disableMap : ''}`}>
          <YandexMap setWindowState={setWindowState} getBuilding={handleBuilding} setBuildingId={setBuildingId} />
        </div>
        <div className={isWindowOpen ? styles.wrapper : `${styles.wrapperClose} ${styles.wrapper}`}>
          <div className={`${styles.leftBlock} ${styles.contentBlock}`}>
            <ul className={styles.buildingWrapper}>
              <li className={stages.length > 0 ? styles.roof : styles.hiddenEl}></li>
              {stages.reverse().map((index: number) => (
                <li key={index} className={styles.stage} onClick={() => {setUpdateRemoveStageModalState(true); setStageId(index)}}></li>
              ))}
              <li className={stages.length > 0 ? styles.base : styles.hiddenEl}></li>
              <div className={styles.addButtonWrapper} onClick={openAddStagePopup}>
                <span className={styles.addButton}></span>
              </div>
            </ul>
          </div>
          <div className={`${styles.rightBlock} ${styles.contentBlock}`}>
            <ul className={styles.contentNavigation}>
              <li className={page === "general" ? `${styles.item__contentNavigation} ${styles.activeItem__contentNavigation}` : styles.item__contentNavigation} onClick={() => handlePageChange("general")}>Общее</li>
              <li className={page === "tariffs" ? `${styles.item__contentNavigation} ${styles.activeItem__contentNavigation}` : styles.item__contentNavigation} onClick={() => handlePageChange("tariffs")}>Тарифы</li>
              <li className={page === "debts" ? `${styles.item__contentNavigation} ${styles.activeItem__contentNavigation}` : styles.item__contentNavigation} onClick={() => handlePageChange("debts")}>Задолженность</li>
            </ul>
            <div className={styles.informationBlock}>
              {page == "general" && <GeneralInfo buildingInfo={building} buildingId={buildingId} />}
              {page == "tariffs" && <TariffsInfo buildingInfo={building} />}
              {page == "debts" && <DebpsInfo buildingInfo={building} />}
            </div>
            <div className={styles.closeButtonWrapper} onClick={closeInfoWindow}>
              <span className={styles.closeButton}></span>
            </div>
          </div>
        </div>
        <Modal id={buildingId} isOpen={isAddStagePopupOpen} setModalState={setAddStageModalState} getBuilding={getBuilding} type="add" />
        <Modal id={buildingId} isOpen={isUpdateRemoveStagePopupOpen} setModalState={setUpdateRemoveStageModalState} getBuilding={getBuilding} type="update/remove" stageId={stageId} />
      </div>
    </main>
  );
}