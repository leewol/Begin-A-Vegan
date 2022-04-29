import { useRef } from "react";

import Link from "next/Link";
import styled from "styled-components";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { FullPage, Slide } from "react-full-page";

export default function Info(props) {
  // 최상단 이동 위함
  const fullPageRef = useRef();
  const dropUpPage = () => {
    fullPageRef.current.scrollToSlide(0);
  };
  const handleSelecting = (event) => {
    const slideNumber = event.target.getAttribute("name");
    fullPageRef.current.scrollToSlide(slideNumber);
  };
  console.log(props);
  return (
    <FullPage ref={fullPageRef} duration={50}>
      <Slide id="selecting-section" className="section">
        <div name="1" onClick={handleSelecting}>
          VEGAN
        </div>
        <div name="2" onClick={handleSelecting}>
          LACTO-OVO
        </div>
        <div name="3" onClick={handleSelecting}>
          LACTO
        </div>
        <div name="4" onClick={handleSelecting}>
          OVO
        </div>
        <div name="5" onClick={handleSelecting}>
          PESCO
        </div>
        <div name="6" onClick={handleSelecting}>
          POLLO
        </div>
        <div name="7" onClick={handleSelecting}>
          FLEXI
        </div>
      </Slide>

      {/* // TODO : 첫 메인 화면에 보일 것들 다 정리되면 컴포넌트화시켜서, 배열로 하나씩 */}
      <Slide id="vegan-section" className="section">
        <div>VEGAN</div>
        <ArrowDropUpIcon onClick={dropUpPage} fontSize="large" />
      </Slide>
      <Slide id="lacto-ovo-section" className="section">
        <div>LACTO-OVO</div>
        <ArrowDropUpIcon onClick={dropUpPage} fontSize="large" />
      </Slide>
      <Slide id="lacto-section" className="section">
        <div>LACTO</div>
        <ArrowDropUpIcon onClick={dropUpPage} fontSize="large" />
      </Slide>
      <Slide id="ovo-section" className="section">
        <div>OVO</div>
        <ArrowDropUpIcon onClick={dropUpPage} fontSize="large" />
      </Slide>
      <Slide id="pesco-section" className="section">
        <div>PESCO</div>
        <ArrowDropUpIcon onClick={dropUpPage} fontSize="large" />
      </Slide>
      <Slide id="pollo-section" className="section">
        <div>POLLO</div>
        <ArrowDropUpIcon onClick={dropUpPage} fontSize="large" />
      </Slide>
      <Slide id="flexi-section" className="section">
        <div>FLEXI</div>
        <ArrowDropUpIcon onClick={dropUpPage} fontSize="large" />
      </Slide>
    </FullPage>
  );
}
