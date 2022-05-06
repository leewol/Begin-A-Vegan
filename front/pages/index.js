import Head from "next/head";
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

const InfoIndexText = styled.div`
  width: ;
  margin-left: 25%;
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

const Chartarrange1 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin-left: 50%;
  margin-top: 10%;
`;

const Chartarrange2 = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 20%;
  justify-content: center;
  align-items: center;
`;

const Textarrange_col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const Textarrange_final = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    color: #207868;
  }
  h1 > span {
    margin-left: 10px;
  }
  p {
    line-height: 2;
  }
  h2 {
    color: #f0bb62;
  }
`;

export default function Home() {
  return (
    <main>
      <Layout />
      <Slide>
        <section className={styles.first}>
          <video autoPlay muted loop className={styles.video}>
            <source src="/mainVideo.mp4" type="video/mp4" />
          </video>
        </section>
      </Slide>
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
                <p>육류 소비량 세계 랭킹</p>
                <Chartconsumptionranking />
                <h1>
                  <span>국내 육류 소비량 매년 증가!!</span>
                </h1>
              </Textarrange_col>
              <Textarrange_col>
                <p>육류 소비 상승률</p>
                <Chartconsumptionchange />
                <h1>
                  <span>1992년~2016년 육류 소비 상승률 세계 2위!!</span>
                </h1>
              </Textarrange_col>
            </Chartarrange2>
          </div>
        </section>
      </Slide>
      <Slide>
        <Textarrange_final>
          <h1>
            <span>우리가 먹는 고기 한 점에 지구는 점점 뜨거워지고 있습니다.</span>
          </h1>
          <h2>
            <span>Let's Begin a Vegun!</span>
          </h2>
        </Textarrange_final>
      </Slide>
      <Slide>
        <section className={styles.datagraph3}>
          <Image src="/letsbeginavegun.jpg" alt="begin a vegun" width={2000} height={150} />
        </section>
      </Slide>
    </main>
  );
}
