import { ResponsiveStream } from "@nivo/stream";

const MyResponsiveStream = ({ data }) => (
  <ResponsiveStream
    data={data}
    keys={[
      "UK",
      "Mexico",
      "Australia",
      "Germany",
      "Japan",
      "Brazil",
      "Russia",
      "India",
      "Others",
      "USA",
      "China",
    ]}
    valueFormat=" >-f"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    axisTop={null}
    axisRight={{
      orient: "right",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Greenhouse Gas",
      legendOffset: 60,
    }}
    axisBottom={{
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Year",
      legendOffset: 36,
      tickValues: 5,
      format: (v) => v + 1993 + v * 5,
    }}
    axisLeft={{
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "",
      legendOffset: -40,
    }}
    enableGridY={false}
    curve="cardinal"
    offsetType="diverging"
    order="ascending"
    colors={{ scheme: "pink_yellowGreen" }}
    fillOpacity={0.85}
    borderColor={{ theme: "background" }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "#2c998f",
        size: 4,
        padding: 2,
        stagger: true,
      },
      {
        id: "squares",
        type: "patternSquares",
        background: "inherit",
        color: "#e4c912",
        size: 6,
        padding: 2,
        stagger: true,
      },
    ]}
    fill={[
      {
        match: {
          id: "India2",
        },
        id: "squares",
      },
      {
        match: {
          id: "China2",
        },
        id: "squares",
      },
    ]}
    dotSize={8}
    dotColor={{ from: "color" }}
    dotBorderWidth={2}
    dotBorderColor={{
      from: "color",
      modifiers: [["darker", 0.7]],
    }}
    motionConfig="molasses"
    legends={[
      {
        anchor: "bottom-right",
        direction: "column",
        translateX: 140,
        itemWidth: 80,
        itemHeight: 20,
        itemTextColor: "#999999",
        symbolSize: 12,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000000",
            },
          },
        ],
      },
    ]}
  />
);

export default MyResponsiveStream;
