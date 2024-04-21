"use client"
import { useState } from "react";
import styles from "./main.module.css";
import { Button } from "@/app/ui/button";

export default function Home() {
  const [page, setPage] = useState("main")

  const handlePageChange = (pageName: string) => {
    setPage(pageName);
  }

  return (
    <main>
      <iframe className={styles.map} src="https://yandex.ru/map-widget/v1/?ll=52.427214%2C55.765969&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1Njk0NDA5MhKFAdCg0L7RgdGB0LjRjywg0KDQtdGB0L_Rg9Cx0LvQuNC60LAg0KLQsNGC0LDRgNGB0YLQsNC9LCDQndCw0LHQtdGA0LXQttC90YvQtSDQp9C10LvQvdGLLCDRg9C70LjRhtCwINCo0LDQvNC40LvRjyDQo9GB0LzQsNC90L7QstCwLCAxMjIiCg3KtFFCFXgQX0I%2C&z=15.03"></iframe>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={`${styles.leftBlock} ${styles.contentBlock}`}>
            <p>Левый блок</p>
          </div>
          <div className={`${styles.rightBlock} ${styles.contentBlock}`}>
            <ul className={styles.contentNavigation}>
               <li className={page === "main" ? `${styles.item__contentNavigation} ${styles.activeItem__contentNavigation}` : styles.item__contentNavigation} onClick={() => handlePageChange("main")}>Общее</li>
               <li className={page === "tariffs" ? `${styles.item__contentNavigation} ${styles.activeItem__contentNavigation}` : styles.item__contentNavigation} onClick={() => handlePageChange("tariffs")}>Тарифы</li>
               <li className={page === "debts" ? `${styles.item__contentNavigation} ${styles.activeItem__contentNavigation}` : styles.item__contentNavigation} onClick={() => handlePageChange("debts")}>Задолженность</li>
            </ul>
            <div className="informationBlock">
              <h2>Общая информация о здании:</h2>
              <ul>
                <li>Количество этажей: <span></span></li>
                <li>Количество жителей: <span></span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
