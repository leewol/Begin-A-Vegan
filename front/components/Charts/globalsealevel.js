import globalsealevel from "../../data/globalsealevel";
import dynamic from "next/dynamic";

const MyResponsiveFunnel = dynamic(() => import("../Nivo/globalsealevel"), {
  ssr: false,
});

const Chartglobalsealevel = () => {
  return (
    <div className="divchart">
      <MyResponsiveFunnel data={globalsealevel} />
      <style jsx>{`
        .divchart {
          height: 50vh;
          width: 50vw;
        }
      `}</style>
    </div>
  );
};

export default Chartglobalsealevel;
