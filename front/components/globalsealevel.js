import { ResponsiveFunnel } from "@nivo/funnel";

const MyResponsiveFunnel = ({ data }) => (
  <ResponsiveFunnel
    data={data}
    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    direction="horizontal"
    valueFormat=">-.4s"
    colors={{ scheme: "blues" }}
    borderWidth={20}
    borderColor={{ theme: "background" }}
    labelColor={{
      from: "color",
      modifiers: [["darker", "3"]],
    }}
    beforeSeparatorLength={0}
    beforeSeparatorOffset={0}
    afterSeparatorLength={0}
    afterSeparatorOffset={0}
    currentPartSizeExtension={10}
    currentBorderWidth={40}
    motionConfig="wobbly"
  />
);

export default MyResponsiveFunnel;
