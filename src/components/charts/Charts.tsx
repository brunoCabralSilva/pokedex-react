import ResizableBox from "./ResizableBox";
import useDemoConfig from "./useDemoConfig.tsx";
import React from "react";
import { AxisOptions, Chart } from "react-charts";

export default function Charts() {
  const { data, randomizeData } = useDemoConfig({
    series: 1,
    dataType: "ordinal"
  });

  const primaryAxis = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>
  >(
    () => ({
      position: "left",
      getValue: (datum) => datum.primary
    }),
    []
  );

  const secondaryAxes = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>[]
  >(
    () => [
      {
        position: "bottom",
        getValue: (datum) => datum.secondary
      }
    ],
    []
  );

  return (
    <>
      <button onClick={randomizeData}>Randomize Data</button>
      <ResizableBox>
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes
          }}
        />
      </ResizableBox>
    </>
  );
}
