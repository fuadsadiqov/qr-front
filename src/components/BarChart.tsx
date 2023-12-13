import ReactApexChart from "react-apexcharts";

export interface BarChartInterface {
  data: number[]
  labels: string[]
}

export default function BarChart({ data, labels }: BarChartInterface) {
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
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '28'
        }
      },
      xaxis: {
        categories: labels
      },
    },
  };
  return (
    <div id="chart">
      <ReactApexChart options={barChartData.options} series={barChartData.series} type="bar" height={350} />
    </div>
  );
};