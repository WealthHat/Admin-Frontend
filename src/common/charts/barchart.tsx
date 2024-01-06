import React, { useEffect, useState } from "react";
// PACKAGES
// import ReactApexChart from 'react-apexcharts';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const BarChart = ({ orderCount }) => {
  const [series] = useState<any>([
    {
      name: "Orders",
      data: orderCount?.map((item) => item.orders_count),
    },
  ]);

  const [options] = useState<any>({
    chart: {
      type: "bar",
      height: 1350,
      id: 1,

      // stacked: true,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: "top", // top, center, bottom
        },
        columnWidth: "60%",
      },
    },
    noData: {
      text: "No data available",
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: "rgba(51, 51, 51, 0.5)",
        fontSize: "14px",
        fontFamily: "Lora",
      },
    },
    colors: ["#FFCD33"],
    dataLabels: {
      enabled: true,
      formatter: function (val: any) {
        return val;
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },

    stroke: {
      curve: "straight",
    },
    fill: {
      colors: undefined,
      type: "solid",
    },
    labels: series.name,
    xaxis: {
      tickPlacement: "on",
      categories: orderCount?.map((item) => item.day_name),
      // categories: months,
    },
    yaxis: {
      opposite: false,
      categories: series,
      labels: {
        formatter: (val: any) => {
          return val;
        },
      },
    },
    legend: {
      horizontalAlign: "left",
    },
  });

  // ApexCharts.exec("mychart", "updateSeries", series, true);

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      width="100%"
      height={320}
      className="barcharts"
    />
  );
};
export default BarChart;
