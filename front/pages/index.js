import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Signup from "../components/Signup";
import { FullPage, Slide } from "react-full-page";

export default function Home() {
  return (
    <main>
      <FullPage>
        <Layout />
        <Slide>
          <section className={styles.first}>
            <video autoPlay muted loop className={styles.video}>
              <source src="/mainVideo.mp4" type="video/mp4" />
            </video>
          </section>
        </Slide>
        <Slide>
          <section className={styles.second} id="about">
            <div className={styles.datagraph1}></div>
          </section>
        </Slide>
        <Slide>
          <section className={styles.third}>
            <div className={styles.datagraph2}></div>
          </section>
        </Slide>
      </FullPage>
    </main>
  );
}
