import Image from "next/image";
import styles from "../styles/Home.module.css";
import styled from "styled-components";
import Layout from "../components/Layout";
import { FullPage, Slide } from "react-full-page";
import Chartconsumptionchange from "../components/Charts/consumptionchange";
import Chartconsumptionranking from "../components/Charts/consumptionranking";
import Chartglobalsealevel from "../components/Charts/globalsealevel";
import Chartgreenhousegas from "../components/Charts/greenhousegas";
import Chartproduction from "../components/Charts/production";

const Chartarrange1 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin-top: 20%;
  margin-left: 35%;
`;

const Chartarrange2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
  margin-left: 35%;
`;

const Textarrange_col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    color: #f4eea9;
  }
  h1 > span {
    margin-left: 0px;
  }
  p {
    line-height: ;
    color: #519259;
    font-weight: bold;
    font-size: 20px;
  }
`;

const Textarrange_row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  h1 {
    color: #f4eea9;
  }
  h1 > span {
    margin-left: 10px;
  }
  p {
    line-height: 2;
  }
`;

const Textarrange_final = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    color: #f4eea9;
  }
  p {
    font-weight: bold;
    font-size: 60px;
    color: #519259;
  }
  h2 {
    color: #f0bb62;
  }
  margin-top: 10%;
  margin-left: 10%;
`;

const dropUpPage = () => {
  fullPageRef.current.scrollToSlide(0);
};

export default function Home() {
  return (
    <main>
      <FullPage>
        <Slide>
          <section className={styles.datagraph2} id="about">
            <div className="divchart">
              <Chartarrange1>
                <Chartglobalsealevel />
                <Textarrange_col>
                  <h1>
                    <span>1993년 기준, 2021년 지구 평균 해수면 약 90mm 상승</span>
                  </h1>
                  <p>
                    지구 온난화로 인한 빙하의 해빙으로 해수면 상승 속도는 점점 더 빨라지고 있습니다.
                  </p>
                </Textarrange_col>
              </Chartarrange1>
            </div>
          </section>
        </Slide>
        <Slide>
          <section className={styles.datagraph2}>
            <div className="divStream">
              <Chartarrange2>
                <Textarrange_col>
                  <p>Total Production(tonnes/year)</p>
                  <Chartproduction />
                  <h1>
                    <span>전 세계 육류 생산량 2배 가량 증가</span>
                  </h1>
                </Textarrange_col>
                <Textarrange_col>
                  <p>Total Greenhouse Gas(MtCo2e)</p>
                  <Chartgreenhousegas />
                  <h1>
                    <span>축산업, 세계 메탄가스 배출의 30% 차지</span>
                  </h1>
                </Textarrange_col>
              </Chartarrange2>
            </div>
          </section>
        </Slide>
        <Slide>
          <section className={styles.datagraph2}>
            <div className="divBump">
              <Chartarrange2>
                <Textarrange_col>
                  <p>World Meat Consumption</p>
                  <Chartconsumptionranking />
                  <h1>
                    <span>국내 육류 소비 순위는 꾸준히 상승!!</span>
                  </h1>
                </Textarrange_col>
                <Textarrange_col>
                  <p>Meat Consumption Growth(%)</p>
                  <Chartconsumptionchange />
                  <h1>
                    <span>1992년~2016년 육류 소비 증가율 세계 2위!!</span>
                  </h1>
                </Textarrange_col>
              </Chartarrange2>
            </div>
          </section>
        </Slide>
        <Slide>
          <section className={styles.datagraph2}>
            <Textarrange_final>
              <h1>
                <span>우리가 먹는 고기 한 점에 지구는 점점 뜨거워지고 있습니다.</span>
              </h1>
              <p>Let's Begin a Vegan!</p>
              <Image src="/vegan_save.png" alt="begin a vegan" width={1200} height={200} />
            </Textarrange_final>
          </section>
        </Slide>
      </FullPage>
    </main>
  );
}
