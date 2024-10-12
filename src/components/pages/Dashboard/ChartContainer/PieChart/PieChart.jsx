import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = ({ labels, data }) => {
  const [chartData, setChartData] = useState({
    series: data,
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    setChartData({
      ...chartData,
      series: data,
      options: { ...chartData.options, labels: labels },
    });
  }, [labels, data]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          width={380}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default PieChart;