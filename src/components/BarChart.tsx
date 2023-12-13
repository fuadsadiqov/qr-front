import { Button } from "@mui/material";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

export interface BarChartInterface {
  data: number[]
  labels: string[]
}

export default function BarChart({ data, labels }: BarChartInterface) {
  const [horizontal, setHorizontal] = useState(false);
  const barChartData: any = {
    series: [{
      data: data,
    }],
    options: {
      chart: {
        type: 'bar',
        height: 200,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: horizontal,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '28'
        }
      },
      xaxis: {
        categories: labels,
        labels: {
          style: {
            fontSize: "15"
          }
        }
      },
    },
  };
  return (
    <div id="chart">
      <Button variant="outlined" onClick={() => setHorizontal(!horizontal)}>{horizontal ? "Horizontal" : "Vertical"}</Button>
      <ReactApexChart options={barChartData.options} series={barChartData.series} type="bar" height={350} />
    </div>
  );
};