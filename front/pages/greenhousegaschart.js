import greenhousegasdata from "../data/greenhousegasdata";
import dynamic from "next/dynamic";

const MyResponsiveStream = dynamic(() => import("../components/greenhousegas"), {
  ssr: false,
});

const Stream = () => {
  return (
    <div className="divchart">
      <MyResponsiveStream data={greenhousegasdata} />
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
