import React, { useState } from "react";

// PACKAGES
// import ReactApexChart from 'react-apexcharts';
import dynamic from "next/dynamic";
import moment from "moment";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const BarChart2 = ({ transactionCount }) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const january = transactionCount?.find(
    (item) => moment(item.date).format("MMMM") === "January"
  );
  const febuary = transactionCount?.find(
    (item) => moment(item.date).format("MMMM") === "Febuary"
  );
  const march = transactionCount?.find(
    (item) => moment(item.date).format("MMMM") === "March"
  );
  const april = transactionCount?.find(
    (item) => moment(item.date).format("MMMM") === "April"
  );
  const may = transactionCount?.find(
    (item) => moment(item.date).format("MMMM") === "May"
  );
  const june = transactionCount?.find(
    (item) => moment(item.date).format("MMMM") === "June"
  );
  const july = transactionCount?.find(
    (item) => moment(item.date).format("MMMM") === "July"
  );
  const august = transactionCount?.find(
    (item) => moment(item.date).format("MMMM") === "August"
  );
  const september = transactionCount?.find(
    (item) => moment(item.date).format("MMMM") === "September"
  );
  const october = transactionCount?.find(
    (item) => moment(item.date).format("MMMM") === "October"
  );
  const november = transactionCount?.find(
    (item) => moment(item.date).format("MMMM") === "November"
  );
  const december = transactionCount?.find(
    (item) => moment(item.date).format("MMMM") === "December"
  );

  const [series] = useState<any>([
    {
      name: "Transactions",
      data:
        transactionCount?.length === 0
          ? []
          : [
              !january?.amount ? 0 : january?.amount,
              !febuary?.amount ? 0 : febuary?.amount,
              !march?.amount ? 0 : march?.amount,
              !april?.amount ? 0 : april?.amount,
              !may?.amount ? 0 : may?.amount,
              !june?.amount ? 0 : june?.amount,
              !july?.amount ? 0 : july?.amount,
              !august?.amount ? 0 : august?.amount,
              !september?.amount ? 0 : september?.amount,
              !october?.amount ? 0 : october?.amount,
              !november?.amount ? 0 : november?.amount,
              !december?.amount ? 0 : december?.amount,
            ],
    },
  ]);

  const [options] = useState<any>({
    chart: {
      type: "bar",
      height: 1350,
      // stacked: true,

      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#8d4f26"],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        borderRadiusApplication: "end",
        columnWidth: "20%",
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
      categories: months,
    },
    yaxis: {
      opposite: false,
      labels: {
        formatter: (val: any) => {
          return "₦" + val;
        },
      },
    },
    legend: {
      horizontalAlign: "left",
      show: false,
    },
  });

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      width="100%"
      height={320}
    />
  );
};
export default BarChart2;
