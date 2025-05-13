// src/components/CallServiceChart.jsx
import React, { useEffect, useRef } from 'react';

const CallStatsCard = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && window.Chart) {
      const ctx = chartRef.current.getContext('2d');
      new window.Chart(ctx, {
        type: 'line',
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
          datasets: [{
            label: "Earnings",
            fill: true,
            data: ["0", "10000", "5000", "15000", "10000", "20000", "15000", "25000"],
            backgroundColor: "rgba(78, 115, 223, 0.05)",
            borderColor: "rgba(78, 115, 223, 1)"
          }]
        },
        options: {
          maintainAspectRatio: false,
          legend: {
            display: false,
            labels: {
              fontStyle: "normal"
            }
          },
          title: {
            fontStyle: "normal"
          },
          scales: {
            xAxes: [{
              gridLines: {
                color: "rgb(234, 236, 244)",
                zeroLineColor: "rgb(234, 236, 244)",
                drawBorder: false,
                drawTicks: false,
                borderDash: ["2"],
                zeroLineBorderDash: ["2"],
                drawOnChartArea: false
              },
              ticks: {
                fontColor: "#858796",
                fontStyle: "normal",
                padding: 20
              }
            }],
            yAxes: [{
              gridLines: {
                color: "rgb(234, 236, 244)",
                zeroLineColor: "rgb(234, 236, 244)",
                drawBorder: false,
                drawTicks: false,
                borderDash: ["2"],
                zeroLineBorderDash: ["2"]
              },
              ticks: {
                fontColor: "#858796",
                fontStyle: "normal",
                padding: 20
              }
            }]
          }
        }
      });
    }
  }, []);

  return (
    <div className="card shadow mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h6 className="text-primary fw-bold m-0">Call Service Overview</h6>
        <div className="dropdown no-arrow">
          <button className="btn btn-link btn-sm dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" type="button">
            <i className="fas fa-ellipsis-v text-gray-400"></i>
          </button>
          <div className="dropdown-menu shadow dropdown-menu-end animated--fade-in">
            <p className="text-center dropdown-header">dropdown header:</p>
            <a className="dropdown-item" href="#">&nbsp;Action</a>
            <a className="dropdown-item" href="#">&nbsp;Another action</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">&nbsp;Something else here</a>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="chart-area">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default CallStatsCard;