import { useRef } from "react";

import styled from "styled-components";
import { FullPage, Slide } from "react-full-page";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { faCarrot } from "@fortawesome/free-solid-svg-icons";
import { faBacon } from "@fortawesome/free-solid-svg-icons";
import { faDrumstickBite } from "@fortawesome/free-solid-svg-icons";
import { faFish } from "@fortawesome/free-solid-svg-icons";
import { faEgg } from "@fortawesome/free-solid-svg-icons";
import { faGlassWater } from "@fortawesome/free-solid-svg-icons";

const InfoIndexText = styled.div`
  width: 25%;
  margin-left: 10%;
  h1 {
    color: #207868;
  }
  h1 > span {
    margin-left: 10px;
  }
  p {
    line-height: 2;
  }
`;

const InfoIndexSelecting = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const VegeTypesBox = styled.div`
  padding: 0 20%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
`;

const IconsBox = styled.div`
  cursor: auto;
  .food-icon {
    font-size: 28px;
    margin-left: 20px;
    color: rgba(0, 0, 0, 0.7);
  }
  .food-icon:first-child {
    color: #207868;
  }
  .food-icon:nth-child(2):not(.VEGAN):not(.OVO) {
    color: #24b1cd;
  }
  .food-icon:nth-child(3):not(.VEGAN):not(.LACTO) {
    color: #ffcaba;
  }
  .food-icon:nth-child(4):not(.VEGAN):not(.LACTO-OVO):not(.LACTO):not(.OVO) {
    color: #157ac3;
  }
  .food-icon:nth-child(5):not(.VEGAN):not(.LACTO-OVO):not(.LACTO):not(.OVO):not(.PESCO) {
    color: #7b4a00;
  }
  .food-icon:last-child:not(.VEGAN):not(.LACTO-OVO):not(.LACTO):not(.OVO):not(.PESCO):not(.POLLO) {
    color: #aa083a;
  }
`;

const ContentSlide = styled.div`
  width: 80%;
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
`;

// TODO : Nav 부분 완성 시 추가
export default function Info() {
  const VegeTypes = ["VEGAN", "LACTO-OVO", "LACTO", "OVO", "PESCO", "POLLO", "FLEXITARIAN"];
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
    <FullPage ref={fullPageRef} duration={50} className="index">
      <Slide key="selecting-section" className="section">
        <InfoIndexText>
          <h1>
            <FontAwesomeIcon icon={faLeaf} />
            <span>채식주의자 (Vegetarian)</span>
          </h1>
          <p>
            세계채식연맹(IVU)에서는 채식주의자를{" "}
            <b>육지동물은 물론 바다나 강에 사는 물고기도 먹지 않는 사람</b>이라고 정의한다. 단,
            우유나 계란은 취향대로 섭취할 수 있고 안 할 수도 있다.
          </p>
          <p>
            채식의 종류는 육류, 가금류, 생선(해산물), 달걀(알), 우유 및 유제품을 섭취하는지를
            기준으로 구분한다.
          </p>
        </InfoIndexText>
        <InfoIndexSelecting>
          {VegeTypes.map((el, idx) => (
            <VegeTypesBox name={idx + 1} onClick={handleSelecting}>
              {el}
              <IconsBox>
                <FontAwesomeIcon className={`food-icon ${el}`} icon={faCarrot} />
                <FontAwesomeIcon className={`food-icon ${el}`} icon={faGlassWater} />
                <FontAwesomeIcon className={`food-icon ${el}`} icon={faEgg} />
                <FontAwesomeIcon className={`food-icon ${el}`} icon={faFish} />
                <FontAwesomeIcon className={`food-icon ${el}`} icon={faDrumstickBite} />
                <FontAwesomeIcon className={`food-icon ${el}`} icon={faBacon} />
              </IconsBox>
            </VegeTypesBox>
          ))}
        </InfoIndexSelecting>
      </Slide>

      {VegeTypes.map((el) => (
        <Slide key={el} className="section">
          <ContentSlide>
            <div>{el}</div>
            <KeyboardDoubleArrowUpIcon onClick={dropUpPage} className="arrow-drop-up-icon" />
          </ContentSlide>
        </Slide>
      ))}
    </FullPage>
  );
}
