import globalsealeveldata from "../data/globalsealeveldata";
import productiondata from "../data/productiondata";
import greenhousegasdata from "../data/greenhousegasdata";
import rankingdata from "../data/rankingdata";
import dynamic from "next/dynamic";

const MyResponsiveFunnel = dynamic(() => import("./globalsealevel"), {
  ssr: false,
});

const MyResponsiveBump = dynamic(() => import("./ranking"), {
  ssr: false,
});

const MyResponsiveStream = dynamic(() => import("./greenhousegas"), {
  ssr: false,
});

const MyResponsiveproductionStream = dynamic(() => import("./production"), {
  ssr: false,
});

const Charts = () => {
  return (
    <div className="divchart">
      <MyResponsiveFunnel data={globalsealeveldata} />
      <MyResponsiveproductionStream data={productiondata} />
      <MyResponsiveStream data={greenhousegasdata} />
      <MyResponsiveBump data={rankingdata} />
      <style jsx>{`
        .divchart {
          height: 80vh;
          margin: 4rem;
        }
      `}</style>
    </div>
  );
};

export default Charts;
