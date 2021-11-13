import React from 'react'
import Chart from 'react-apexcharts';

interface Props
{
    data: number[];
}

export const JokerAudienceChart: React.FC<Props> = ({data}) => {

    const series = [{name: "series-1", data: data}];

    const grid = {
        borderColor: '#1434A4',
        xaxis: {
            lines: {
                show: true
            }
        },   
        yaxis: {
            lines: {
                show: true
            }
        }
    }

    const chart = {
        id: "basic-bar",
        toolbar: {
          show: false
        },
        animations: {
          easing: "easeinout" as "easeinout" | "linear" | "easein" | "easeout" | undefined,
          speed: 500,
          animateGradually: {
            enabled: false
          }
        }
    }

    const plotOptions = {
        bar: {
            dataLabels: {
              position: 'top',
            },
        }
    }

    const dataLabels = {
        enabled: true,
        offsetY: -30,
        formatter: function (val: any) {
          return val + "%";
        },
        style: {
          colors: ["#C0C0C0"],
          fontSize: '20px',
        }
    }

    const xaxis = {
        categories: ["A","B","C","D"],
        axisBorder: {
          show: false
        },
        labels: {
          show: true,
          style: {
            fontSize: '20px',
            fontWeight: 600,
            colors: "#C0C0C0"
          }
        },
        axisTicks: {
            show: false
        }
    }

    const yaxis = {
        max: 100,
        labels: {
          show: false
        } 
    }

    const fill = {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          type: "vertical",
          opacityFrom: 1,
          opacityTo: 1,
          colorStops: [
            {
              offset: 0,
              color: "#ffff00",
              opacity: 1
            },
            {
              offset: 100,
              color: "#daa520",
              opacity: 1
            }
          ]
        }
    }

    const options = {
        chart: chart,
        grid: grid,
        plotOptions: plotOptions,
        dataLabels: dataLabels,
        xaxis: xaxis,
        yaxis: yaxis,
        fill: fill
      }
    
    return (
        <Chart type={"bar"} options={options} series={series} height="100%"></Chart>
    )
}
