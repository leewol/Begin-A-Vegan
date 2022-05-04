import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Signup from "../components/Signup";
import Sidebar from "../components/Sidebar";
import { FullPage, Slide } from "react-full-page";
import Charts from "../components/charts";

export default function Home() {
  return (
    <main>
      <Layout />
      <Slide>
        <section className={styles.first}>
          <Sidebar width={450}>
            <Signup />
          </Sidebar>
          <video autoPlay muted loop className={styles.video}>
            <source src="/mainVideo.mp4" type="video/mp4" />
          </video>
        </section>
      </Slide>
      <Slide>
        <section>
          <Sidebar width={450}>
            <Signup />
          </Sidebar>
          <div>
            <Charts />
            <style jsx>{`
              .divchart {
                height: 60vh;
                margin: 4rem;
              }
            `}</style>
          </div>
        </section>
      </Slide>
    </main>
  );
}
