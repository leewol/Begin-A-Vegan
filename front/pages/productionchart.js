import productiondata from "../data/productiondata";
import dynamic from "next/dynamic";

const MyResponsiveStream = dynamic(() => import("../components/production"), {
  ssr: false,
});

const Stream = () => {
  return (
    <div className="divchart">
      <MyResponsiveStream data={productiondata} />
      <style jsx>{`
        .divchart {
          height: 100vh;
          margin: 4rem;
        }
      `}</style>
    </div>
  );
};

export default Stream;
