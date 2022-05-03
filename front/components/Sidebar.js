import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Sidebar.module.css";

export default function Sidebar({ width = 280, children }) {
  const [isOpen, setIsopen] = useState(false);
  const [xPosition, setXPosition] = useState(-width);
  const side = useRef();

  // button 클릭 시 토글
  const toggleMenu = () => {
    if (xPosition < 0) {
      setXPosition(0);
      setIsopen(true);
    } else {
      setXPosition(-width);
      setIsopen(false);
    }
  };

  // 사이드바 외부 클릭시 닫히는 함수
  const handleClose = async (event) => {
    const sideArea = side.current;
    const sideCildren = side.current.contains(event.target);
    if (isOpen && (!sideArea || !sideCildren)) {
      await setXPosition(-width);
      await setIsopen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  });

  return (
    <div className={styles.container}>
      <div
        ref={side}
        className={styles.sidebar}
        style={{ width: `${width}px`, height: "100%", transform: `translatex(${-xPosition}px)` }}
      >
        {/* <button onClick={() => toggleMenu()} className={styles.button}>
          {isOpen ? (
            <span>X</span>
          ) : (
            <img src="images/avatar.png" alr="contact open button" className={styles.openBtn} />
          )}
        </button> */}
        <button onClick={toggleMenu} />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
