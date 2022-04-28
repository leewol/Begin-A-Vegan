import Link from "next/Link";
import styled from "styled-components";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";

const ContentDiv = styled.div`
  width: 100%;
`;

const MiddleDiv = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Info() {
  return (
    <ContentDiv>
      <MiddleDiv>
        <Link href="#vegan-section">
          <a>VEGAN</a>
        </Link>
        <Link href="#lacto-ovo-section">
          <a>LACTO-OVO</a>
        </Link>
        <Link href="#lacto-section">
          <a>LACTO</a>
        </Link>
        <Link href="#ovo-section">
          <a>OVO</a>
        </Link>
        <Link href="#pesco-section">
          <a>PESCO</a>
        </Link>
        <Link href="#pollo-section">
          <a>POLLO</a>
        </Link>
        <Link href="#flexi-section">
          <a>FLEXI</a>
        </Link>
      </MiddleDiv>

      <MiddleDiv>
        <div id="vegan-section">VEGAN</div>
        <ArrowDropDownCircleIcon />
      </MiddleDiv>
      <MiddleDiv>
        <div id="lacto-ovo-section">LACTO-OVO</div>
      </MiddleDiv>
      <MiddleDiv>
        <div id="lacto-section">LACTO</div>
      </MiddleDiv>
      <MiddleDiv>
        <div id="ovo-section">OVO</div>
      </MiddleDiv>
      <MiddleDiv>
        <div id="pesco-section">PESCO</div>
      </MiddleDiv>
      <MiddleDiv>
        <div id="pollo-section">POLLO</div>
      </MiddleDiv>
      <MiddleDiv>
        <div id="flexi-section">FLEXI</div>
      </MiddleDiv>
    </ContentDiv>
  );
}
