import rankingdata from "../data/rankingdata";

import dynamic from "next/dynamic";

const MyResponsiveBump = dynamic(() => import("../components/ranking"), {
  ssr: false,
});

const Bump = () => {
  return (
    <div className="divchart">
      <MyResponsiveBump data={rankingdata} />
      <style jsx>{`
        .divchart {
          height: 100vh;
          margin: 4rem;
        }
      `}</style>
    </div>
  );
};

export default Bump;
