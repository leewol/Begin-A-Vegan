import { ResponsiveBump } from "@nivo/bump";

const MyResponsiveBump = ({ data }) => (
  <ResponsiveBump
    data={data}
    interpolation="linear"
    colors={{ scheme: "dark2" }}
    lineWidth={2}
    activeLineWidth={11}
    inactiveLineWidth={3}
    inactiveOpacity={0.15}
    startLabel={false}
    endLabel={true}
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
      tickSize: 0,
      tickPadding: 5,
      tickRotation: 0,
      legend: "",
      legendPosition: "middle",
      legendOffset: -36,
    }}
    axisBottom={{
      tickSize: 0,
      tickPadding: 5,
      tickRotation: 0,
      legend: "",
      legendPosition: "middle",
      legendOffset: 32,
    }}
    axisLeft={{
      tickSize: 0,
      tickPadding: 5,
      tickRotation: 0,
      legend: "",
      legendPosition: "middle",
      legendOffset: -40,
    }}
    axisRight={{
      tickSize: 0,
      tickPadding: 1,
      tickRotation: 0,
      legend: "",
      legendPosition: "middle",
      legendOffset: 60,
    }}
    margin={{ top: 0, right: 100, bottom: 40, left: 40 }}
  />
);

export default MyResponsiveBump;
