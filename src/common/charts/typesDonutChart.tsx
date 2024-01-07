import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { screenPixels } from "@/utils/screenpx";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const TypesDonutchart = ({ data }) => {
  // get the length of real, liquid and alternative assets
  const fixedincome = data?.filter((item) => item.type === "fixed income");
  const realestate = data?.filter((item) => item.type === "real estate");
  const equities = data?.filter((item) => item.type === "equities");
  const cash = data?.filter((item) => item.type === "cash");
  const business = data?.filter((item) => item.type === "business");
  const crypto = data?.filter((item) => item.type === "crypto");

  const [series] = useState(
    !data || data?.length === 0
      ? [0, 0, 0, 0, 0, 0]
      : [
          fixedincome?.length,
          realestate?.length,
          equities?.length,
          cash?.length,
          business?.length,
          crypto?.length,
        ]
  );

  const [options] = useState<any>({
    chart: {
      type: "donut",
    },
    legend: {
      show: series?.length !== 0 ? true : false,
      position: "bottom",
      fontWeight: 500,
      formatter: function (seriesName: any, opts: any) {
        return [opts.w.globals.series[opts.seriesIndex], " \n ", seriesName];
      },
    },

    labels: [
      "Fixed Income",
      "Real Estate",
      "Equities",
      "Cash",
      "Business Interest",
      "Crypto",
    ],

    markers: {
      colors: ["#F44336", "#E91E63", "#9C27B0", "green", "violet", "purple"],
    },

    Labels: {
      enabled: true,
      formatter: function (val: any) {
        return val + "%";
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter: (val: any) => {
          return val;
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "50%",
          expandOnClick: true,
          labels: {
            show: true,
            name: {
              show: true,
            },
            value: {
              show: true,
            },

            total: {
              show: true,
              formatter: function (w) {
                let result = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                // console.log("this is result", w);
                return Math.round(result * 100) / 100; // * 100 for 2 decimal numbers
              },
            },
          },
        },
      },
    },

    colors: ["#F44336", "#E91E63", "#9C27B0", "green", "violet", "purple"],
    fill: {
      colors: ["#F44336", "#E91E63", "#9C27B0", "green", "violet", "purple"],
    },
    // responsive: [
    //   {
    //     breakpoint: 2000,
    //     options: {
    //       chart: {
    //         width: 500,
    //         height: 350,
    //       },
    //     },
    //   },
    // ],
  });

  return (
    // <div className="donut-chart bg-danger">
    <Chart
      options={options}
      series={series}
      type="donut"
      width="100%"
      height="300px"
    />
    // </div>
  );
};
export default TypesDonutchart;
