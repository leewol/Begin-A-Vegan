import { ResponsiveBump } from "@nivo/bump";

const MyResponsiveBump = ({ data }) => (
  <ResponsiveBump
    data={data}
    interpolation="linear"
    colors={{ scheme: "pastel2" }}
    lineWidth={5}
    activeLineWidth={11}
    inactiveLineWidth={2}
    inactiveOpacity={0.15}
    startLabelPadding={30}
    startLabelTextColor={{ from: "color", modifiers: [] }}
    pointSize={8}
    activePointSize={16}
    inactivePointSize={3}
    pointColor={{ theme: "background" }}
    pointBorderWidth={3}
    activePointBorderWidth={3}
    pointBorderColor={{ from: "serie.color" }}
    enableGridX={false}
    enableGridY={false}
    axisTop={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "",
      legendPosition: "middle",
      legendOffset: -36,
    }}
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
      legend: "ranking",
      legendPosition: "middle",
      legendOffset: -40,
    }}
    margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
    axisRight={null}
  />
);

export default MyResponsiveBump;
