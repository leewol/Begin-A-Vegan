import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as Api from "../lib/api";
import { Routes, Route } from "react-router-dom";
// import PrivateRoute from "./hook/PrivateRoute";
// import './style/css/index.css';
import sample from "../public/sample_profile.jpg";
import edit from "../public/edit_icon.png";
import arrowRight from "../public/arrow_right.png";
import Header from "../components/Header";
import styles from "../styles/mypage.module.css";

export default function MyPage() {
  const [state, setState] = useState(true);
  const text = state ? "" : "수정하기";
  const [me, setMe] = useState();
  const [newDescription, setNewDescription] = useState("당신을 소개해주세요.");
  const [file, setFile] = useState();
  const [isViewingPostings, setIsViewingPostings] = useState(true);
  const [articles, setArticles] = useState([]);
  const articleIsLoading = useRef(false);
  const lastId = useRef(undefined);

  const updateUser = useCallback(() => {
    Api.get("/me").then((res) => setMe(res.data));
  }, []);

  const editHandler = () => {
    if (state === false) {
      Promise.all([
        ...(file
          ? [
              (() => {
                const fd = new FormData();
                fd.append("image", file);
                setFile(undefined);
                return Api.post("/profile", fd);
              })(),
            ]
          : []),
        ...(newDescription !== me?.description
          ? [Api.put("/description", { description: newDescription })]
          : []),
      ]).then(updateUser);
    }
    setState(!state);
  };

  const loadArticles = useCallback(() => {
    if (lastId.current === null) return;
    if (articleIsLoading.current) return;
    articleIsLoading.current = true;
    Api.get(`/postings/me${lastId.current ? `?lastId=${lastId.current}` : ""}`).then((res) => {
      console.log(res.data.length);
      setArticles((prev) => [...prev, ...res.data]);
      lastId.current = res.data.length < 10 ? null : res.data.reverse()[0].id;
      articleIsLoading.current = false;
    });
  }, []);

  const [open, setOpen] = useState(true);
  const seedingHandler = () => {
    setOpen(!open);
  };

  useEffect(() => {
    updateUser();
    loadArticles();
  }, []);

  useEffect(() => {
    if (!me) return;
    setNewDescription(me.description);
  }, [me]);

  useEffect(() => {
    // 무한스크롤
    const onScrollHandler = () => {
      if (window.scrollY >= document.body.scrollHeight - window.innerHeight) loadArticles();
    };
    window.addEventListener("scroll", onScrollHandler);
    return () => {
      window.removeEventListener("scroll", onScrollHandler);
    };
  }, [loadArticles]);

  return (
    <div>
      <Header></Header>
      <div className={styles.layout}>
        <div className={styles.mypage_layout}>
          <h3 className={styles.titleA}>My Page</h3>
          <div className={state ? `${styles.profile}` : `${styles.profile} ${styles.edit}`}>
            <p className={styles.titleB}>{/*Profile*/}</p>
            <div className={styles.profile_img}>
              <Image
                src={me?.profile_url ? `${Api.SERVER_URL}/${me.profile_url}` : sample}
                alt=""
                layout="fill"
              />
              <div className={styles.img_add}>
                <input className={styles.upload_name} />
                <label htmlFor="file">이미지수정</label>
                <input type="file" id="file" onChange={(event) => setFile(event.target.files[0])} />
              </div>
            </div>
            <div className={styles.profile_info}>
              <div className={styles.top}>
                <p className={styles.nickname}>{me?.nickname ?? "I am Vegan"}</p>

                {/*vegan 일경우 vegan 클래스, nonvegan 일경우 nonvegan 클래스*/}
                <p className={`${styles.grade} ${me?.is_vegan ? styles.vegan : styles.nonvegan}`}>
                  {me?.is_vegan ? "" : "non"}vegan
                </p>
                {/* <p className={`${styles.grade} ${styles.nonvegan}`}>nonvegan</p> */}

                <span className={styles.edit_icon} onClick={editHandler}>
                  <Image src={edit} alt="" />
                  {text}
                </span>
              </div>
              <div className={styles.text}>
                <p>{me?.description ?? "안녕하세요. 당신을 소개해주세요."}</p>
                <textarea
                  value={newDescription}
                  onChange={(event) => setNewDescription(event.target.value)}
                ></textarea>
              </div>
            </div>
          </div>

          <div className={styles.posting_bar}>
            <p className={styles.titleB}>{/*Posting Bar*/}</p>
            <div className={styles.bar_wrap}>
              <button
                onClick={() => setIsViewingPostings(true)}
                className={isViewingPostings ? styles.active : undefined}
              >
                내 게시물
              </button>
              <button
                onClick={() => setIsViewingPostings(false)}
                className={isViewingPostings ? undefined : styles.active}
              >
                좋아요
              </button>
            </div>
          </div>

          {isViewingPostings ? (
            <div className={styles.postings}>
              <p className={styles.titleB}>{/*postings*/}</p>
              <ul>
                {articles.map((article) => (
                  <li className={styles.box} key={article.id}>
                    <div>
                      <Image src={`${Api.SERVER_URL}/${article.file_url}`} layout="fill" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        <div className={open ? `${styles.seeding}` : `${styles.seeding} ${styles.show}`}>
          <p className={styles.titleB}>My Vegan Calendar</p>
          <div className={styles.calendar}>
            {/*깃헙잔디잔디*/}
            <div className={styles.calendar_inner}>
              <div className={styles.week}>
                <p>Mon</p>
                <p>Wed</p>
                <p>Fri</p>
              </div>

              <div className={styles.month}>
                <div className={styles.month_box}>
                  {/*5월일정*/}
                  <p>May</p>
                  <div className={styles.check}>
                    <div>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                    </div>
                    <div>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                    </div>
                    <div>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                    </div>
                    <div>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                    </div>
                    <div>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                    </div>
                  </div>
                </div>

                <div className={styles.month_box}>
                  {/*6월일정*/}
                  <p>Jun</p>
                  <div className={styles.check}>
                    <div>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                    </div>
                    <div>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                    </div>
                    <div>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                    </div>
                    <div>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                    </div>
                    <div>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                    </div>
                  </div>
                </div>

                <div className={styles.month_box}>
                  {/*7월일정*/}
                  <p>Jul</p>
                  <div className={styles.check}>
                    <div>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                    </div>
                    <div>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                    </div>
                    <div>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                    </div>
                    <div>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                    </div>
                    <div>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                    </div>
                  </div>
                </div>

                <div className={styles.month_box}>
                  {/*8월일정*/}
                  <p>Aug</p>
                  <div className={styles.check}>
                    <div>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                    </div>
                    <div>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                    </div>
                    <div>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                    </div>
                    <div>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                    </div>
                    <div>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                    </div>
                  </div>
                </div>

                <div className={styles.month_box}>
                  {/*9월일정*/}
                  <p>Sep</p>
                  <div className={styles.check}>
                    <div>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                    </div>
                    <div>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                    </div>
                    <div>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                    </div>
                    <div>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                    </div>
                    <div>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                      <span className={styles.step}></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.annotation}>
              {/*일정단계안내 className으로 구분 총 5단계*/}
              <p>Less</p>
              <span className={`${styles.step} ${styles.step01}`}></span>
              <span className={`${styles.step} ${styles.step02}`}></span>
              <span className={`${styles.step} ${styles.step03}`}></span>
              <span className={`${styles.step} ${styles.step04}`}></span>
              <span className={`${styles.step} ${styles.step05}`}></span>
              <p>More</p>
            </div>
          </div>
          <p className={styles.now}>
            이번 달은 <em>00일</em>동안 Vegan!
          </p>
          <span className={styles.btn} onClick={seedingHandler}>
            <Image src={arrowRight} alt="" />
            CALENDAR
          </span>
        </div>
      </div>
    </div>
  );
}
