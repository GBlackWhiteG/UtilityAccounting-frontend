'use client'
import { useState } from "react";
import Script from 'next/script';
import styles from "./main.module.css";
import { GeneralInfo, TariffsInfo, DebpsInfo } from "./mainData";
import { Button } from "@/app/components/ui/button";
import YandexMap from "./map";

export default function Home() {
  const [page, setPage] = useState("general")

  const handlePageChange = (pageName: string) => {
    setPage(pageName);
  }

  return (
    <main>
      <div className="container">
        <div className={styles.map}>
          <YandexMap />
        </div>
        <div className={styles.wrapper}>
          <div className={`${styles.leftBlock} ${styles.contentBlock}`}>
            <p>Левый блок</p>
          </div>
          <div className={`${styles.rightBlock} ${styles.contentBlock}`}>
            <ul className={styles.contentNavigation}>
               <li className={page === "general" ? `${styles.item__contentNavigation} ${styles.activeItem__contentNavigation}` : styles.item__contentNavigation} onClick={() => handlePageChange("general")}>Общее</li>
               <li className={page === "tariffs" ? `${styles.item__contentNavigation} ${styles.activeItem__contentNavigation}` : styles.item__contentNavigation} onClick={() => handlePageChange("tariffs")}>Тарифы</li>
               <li className={page === "debts" ? `${styles.item__contentNavigation} ${styles.activeItem__contentNavigation}` : styles.item__contentNavigation} onClick={() => handlePageChange("debts")}>Задолженность</li>
            </ul>
            <div className="informationBlock">
              {page == "general" && <GeneralInfo />}
              {page == "tariffs" && <TariffsInfo />}
              {page == "debts" && <DebpsInfo />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
