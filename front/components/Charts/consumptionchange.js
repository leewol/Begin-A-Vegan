import consumptionchange from "../../data/consumptionchange";
import dynamic from "next/dynamic";

const MyResponsiveBar = dynamic(() => import("../Nivo/consumptionchange"), {
  ssr: false,
});

const Chartconsumptionchange = () => {
  return (
    <div className="divStream">
      <MyResponsiveBar data={consumptionchange} />
      <style jsx>{`
        .divStream {
          height: 60vh;
          width: 40vw;
        }
      `}</style>
    </div>
  );
};

export default Chartconsumptionchange;
