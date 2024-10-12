import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const BarChart = ({ labels, values, height }) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        data: values,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: "end",
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: labels,
      },
    },
  });

  useEffect(() => {
    setChartData({
      ...chartData,
      series: [
        {
          data: values,
        },
      ],
      options: {
        ...chartData.options,
        xaxis: {
          categories: labels,
        },
      },
    });
  }, [values, labels]);
  return (
    <div>
      <div id="chartBar">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={height}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

BarChart.defaultProps = {
  height: 300,
};

export default BarChart;