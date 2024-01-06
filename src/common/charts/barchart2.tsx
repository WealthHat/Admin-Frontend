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
    (item) => moment(item.month).format("MMMM") === "January"
  );
  const febuary = transactionCount?.find(
    (item) => moment(item.month).format("MMMM") === "Febuary"
  );
  const march = transactionCount?.find(
    (item) => moment(item.month).format("MMMM") === "March"
  );
  const april = transactionCount?.find(
    (item) => moment(item.month).format("MMMM") === "April"
  );
  const may = transactionCount?.find(
    (item) => moment(item.month).format("MMMM") === "May"
  );
  const june = transactionCount?.find(
    (item) => moment(item.month).format("MMMM") === "June"
  );
  const july = transactionCount?.find(
    (item) => moment(item.month).format("MMMM") === "July"
  );
  const august = transactionCount?.find(
    (item) => moment(item.month).format("MMMM") === "August"
  );
  const september = transactionCount?.find(
    (item) => moment(item.month).format("MMMM") === "September"
  );
  const october = transactionCount?.find(
    (item) => moment(item.month).format("MMMM") === "October"
  );
  const november = transactionCount?.find(
    (item) => moment(item.month).format("MMMM") === "November"
  );
  const december = transactionCount?.find(
    (item) => moment(item.month).format("MMMM") === "December"
  );

  const [series] = useState<any>([
    {
      name: "Transactions",
      data:
        transactionCount?.length === 0
          ? []
          : [
              !january?.totalAmount ? 0 : january?.totalAmount,
              !febuary?.totalAmount ? 0 : febuary?.totalAmount,
              !march?.totalAmount ? 0 : march?.totalAmount,
              !april?.totalAmount ? 0 : april?.totalAmount,
              !may?.totalAmount ? 0 : may?.totalAmount,
              !june?.totalAmount ? 0 : june?.totalAmount,
              !july?.totalAmount ? 0 : july?.totalAmount,
              !august?.totalAmount ? 0 : august?.totalAmount,
              !september?.totalAmount ? 0 : september?.totalAmount,
              !october?.totalAmount ? 0 : october?.totalAmount,
              !november?.totalAmount ? 0 : november?.totalAmount,
              !december?.totalAmount ? 0 : december?.totalAmount,
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
    colors: ["#FFCD33"],
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
