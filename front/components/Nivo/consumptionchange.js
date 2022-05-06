import { ResponsiveBar } from "@nivo/bar";

const MyResponsiveBar = ({ data }) => (
  <ResponsiveBar
    data={data}
    keys={["Rate of Change(%)"]}
    indexBy="country"
    margin={{ top: 0, right: 160, bottom: 60, left: 150 }}
    padding={0.3}
    groupMode="grouped"
    layout="horizontal"
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={{ scheme: "accent" }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "",
      legendPosition: "middle",
      legendOffset: 32,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "",
      legendPosition: "middle",
      legendOffset: -40,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
  />
);

export default MyResponsiveBar;
