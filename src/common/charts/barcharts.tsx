import React, { useEffect, useState } from "react";

// PACKAGES
// import ReactApexChart from 'react-apexcharts';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const BarCharts = ({ orderCount }) => {
  const months = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  const monday = orderCount?.find((item) => item.day_name === "Monday");
  const tuesday = orderCount?.find((item) => item.day_name === "Tuesday");
  const wednesday = orderCount?.find((item) => item.day_name === "Wednesday");
  const thursday = orderCount?.find((item) => item.day_name === "Thursday");
  const friday = orderCount?.find((item) => item.day_name === "Friday");
  const saturday = orderCount?.find((item) => item.day_name === "Saturday");
  const sunday = orderCount?.find((item) => item.day_name === "Sunday");

  const [series] = useState<any>([
    {
      name: "Orders",
      data:
        orderCount?.length === 0
          ? []
          : [
              !sunday?.orders_count ? 0 : sunday?.orders_count,
              !monday?.orders_count ? 0 : monday?.orders_count,
              !tuesday?.orders_count ? 0 : tuesday?.orders_count,
              wednesday?.orders_count === undefined
                ? 0
                : wednesday?.orders_count,
              !thursday?.orders_count ? 0 : thursday?.orders_count,
              !friday?.orders_count ? 0 : friday?.orders_count,
              !saturday?.orders_count ? 0 : saturday?.orders_count,
            ],
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
    // labels: series.name,
    xaxis: {
      tickPlacement: "on",
      categories: months,
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
export default BarCharts;
