import { ResponsiveFunnel } from "@nivo/funnel";

const MyResponsiveFunnel = ({ data }) => (
  <ResponsiveFunnel
    data={data}
    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
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
