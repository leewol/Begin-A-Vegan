import globalsealeveldata from "../data/globalsealeveldata";
import dynamic from "next/dynamic";

const MyResponsiveFunnel = dynamic(() => import("../components/globalsealevel"), {
  ssr: false,
});

const Funnel = () => {
  return (
    <div className="divchart">
      <MyResponsiveFunnel data={globalsealeveldata} />
      <style jsx>{`
        .divchart {
          height: 50vh;
          margin: 4rem;
        }
      `}</style>
    </div>
  );
};

export default Funnel;
