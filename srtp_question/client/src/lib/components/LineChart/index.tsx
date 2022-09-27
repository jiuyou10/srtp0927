import React, { useEffect, useRef } from "react";
import Chart, { ChartDataSets } from "chart.js";
import "chartjs-plugin-datalabels";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

interface Props {
  labelList: string[];
  dataList?: number[];
  multipleDataList?: ChartDataSets[];
  showLabel: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    canvasContainer: {
      width: 550,
      height: 400,
    },
  })
);

export const LineChart = ({
  labelList,
  dataList,
  multipleDataList,
  showLabel,
}: Props) => {
  const classes = useStyles();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const init = () => {
    if (chartRef.current) {
      const lineChart = chartRef.current.getContext("2d");
      if (lineChart)
        new Chart(lineChart, {
          type: "line",
          data: {
            //Bring in data
            labels: labelList,
            datasets: multipleDataList
              ? multipleDataList
              : [
                  {
                    label: "得分",
                    data: dataList,
                    borderColor: "#0d47a1",
                    backgroundColor: "#bbdefb",
                    fill: false,
                    lineTension: 0,
                  },
                ],
          },
          options: {
            tooltips: {
              mode: "index",
              intersect: false,
            },
            hover: {
              mode: "nearest",
              intersect: true,
            },
            maintainAspectRatio: false,
            responsive: true,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            plugins: {
              datalabels: {
                anchor: "start",
                align: "top",
                formatter: Math.round,
                display: showLabel ? true : false,
              },
            },
          },
        });
    }
  };
  const initRef = useRef(init);
  useEffect(() => {
    initRef.current();
  }, []);
  return (
    <div className={classes.canvasContainer}>
      <canvas id="line-chart" ref={chartRef} />
    </div>
  );
};
