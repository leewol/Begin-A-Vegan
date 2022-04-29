import { useRef, useEffect } from "react";

import Link from "next/Link";
import styled from "styled-components";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { FullPage, Slide } from "react-full-page";

export default function Info(props) {
  const VegeTypes = ["INDEX", "VEGAN", "LACTO-OVO", "LACTO", "OVO", "PESCO", "POLLO", "FLEXI"];
  // 최상단 이동
  const fullPageRef = useRef();
  const dropUpPage = () => {
    fullPageRef.current.scrollToSlide(0);
  };
  // 선택한 슬라이드로 이동
  const handleSelecting = (event) => {
    const slideNumber = event.target.getAttribute("name");
    fullPageRef.current.scrollToSlide(slideNumber);
  };

  // 선택지 & 각 화면 슬라이드
  return (
    <FullPage ref={fullPageRef} duration={50}>
      <Slide key="selecting-section" className="section">
        {VegeTypes.map((el, idx) => (
          <div name={idx} onClick={handleSelecting}>
            {el}
          </div>
        ))}
      </Slide>

      {VegeTypes.map((el) => (
        <Slide key={el} className="section">
          <div>{el}</div>
          <ArrowDropUpIcon onClick={dropUpPage} fontSize="large" />
        </Slide>
      ))}
    </FullPage>
  );
}
