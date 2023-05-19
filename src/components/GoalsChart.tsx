import { Line } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Divider } from "antd";
import { GoalsChartProps } from "../@types/types";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const GoalsChart = ({ data, loading }: GoalsChartProps) => {
  const options = {
    responsive: true,
  };

  const labels = ["0-15", "16-30", "31-45", "46-60", "61-75", "76-90", "91-105", "106-120"];

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Gols feitos',
        data: [
          data?.goals?.for?.minute?.["0-15"]?.total,
          data?.goals?.for?.minute?.["16-30"]?.total,
          data?.goals?.for?.minute?.["31-45"]?.total,
          data?.goals?.for?.minute?.["46-60"]?.total,
          data?.goals?.for?.minute?.["61-75"]?.total,
          data?.goals?.for?.minute?.["76-90"]?.total,
          data?.goals?.for?.minute?.["91-105"]?.total,
          data?.goals?.for?.minute?.["106-120"]?.total,
        ],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Gols levados',
        data: [
          data?.goals?.against?.minute?.["0-15"]?.total,
          data?.goals?.against?.minute?.["16-30"]?.total,
          data?.goals?.against?.minute?.["31-45"]?.total,
          data?.goals?.against?.minute?.["46-60"]?.total,
          data?.goals?.against?.minute?.["61-75"]?.total,
          data?.goals?.against?.minute?.["76-90"]?.total,
          data?.goals?.against?.minute?.["91-105"]?.total,
          data?.goals?.against?.minute?.["106-120"]?.total,
        ],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <div>
    <Divider>Gols por minuto de jogo</Divider>
    <Line options={options} data={chartData} data-testid="goals-chart" />
  </div>
}