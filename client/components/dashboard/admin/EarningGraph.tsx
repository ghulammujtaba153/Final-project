import React from 'react';
import ReactApexChart from 'react-apexcharts';

const EarningGraph = ({ data }) => {
  const options = {
    chart: {
      type: 'area',
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: 'Earnings Over Time',
      align: 'left',
    },
    subtitle: {
      text: 'Earnings Movements',
      align: 'left',
    },
    labels: data.dates,
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      opposite: true,
    },
    legend: {
      horizontalAlign: 'left',
    },
  };

  const series = [
    {
      name: 'Earnings',
      data: data.prices,
    },
  ];

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export default EarningGraph;
