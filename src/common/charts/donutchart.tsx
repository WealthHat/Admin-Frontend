import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { screenPixels } from "@/utils/screenpx";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Donutchart = ({ fleetCount }) => {
  const active = fleetCount?.getActiveVehicleCount;
  const maintenance = fleetCount?.getMaintenanceVehicleCount;
  const unavailable = fleetCount?.getUnavailableVehicleCount;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    screenPixels("1330px", setIsMobile);
  }, []);

  const [series] = useState(
    active === 0 && unavailable === 0 && maintenance === 0
      ? []
      : [active, maintenance, unavailable]
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

    labels: ["Available", "Maintenance", "Unavailable"],

    markers: {
      colors: ["#F44336", "#E91E63", "#9C27B0"],
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
    colors: ["#34C695", "#F7A830", "#D33A42"],
    fill: {
      colors: ["#34C695", "#F7A830", "#D33A42"],
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
export default Donutchart;
