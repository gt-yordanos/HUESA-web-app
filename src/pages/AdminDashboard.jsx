import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const AdminDashboard = () => {
  // Sample data for the pie chart, bar chart, and line chart
  const genderData = {
    labels: ['Male', 'Female'],
    datasets: [{
      data: [60, 40],
      backgroundColor: ['#ffa2a2', '#57cae3'],
      borderColor: ['#FF4500', '#FFA500'],
      borderWidth: 1,
    }]
  };
  
  

  const departmentData = {
    labels: ['Engineering', 'Science', 'Arts', 'Business', 'Law'],
    datasets: [{
      data: [300, 200, 150, 100, 50],
      backgroundColor: [
        '#3e204f',
        '#5a4565',
        '#cec9d6',
        '#e2dbe9',
        '#bcaecc',
      ],
      borderColor: [
        '#3e204f',
        '#5a4565',
        '#cec9d6',
        '#e2dbe9',
        '#bcaecc',
      ],
      borderWidth: 1,
    }]
  };
  

  const registrationData12Months = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Registrations (Last 12 Months)',
      data: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160],
      fill: true,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: '#4BC0C0',
      borderWidth: 2,
      tension: 0.4,
    }]
  };

  const registrationData5Years = {
    labels: ['2019', '2020', '2021', '2022', '2023'],
    datasets: [{
      label: 'Registrations (Last 5 Years)',
      data: [400, 450, 500, 600, 700],
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: '#FF6384',
      borderWidth: 2,
      tension: 0.4,
    }]
  };

  return (
    <div className="lg:p-8">
      <h3 className="sm:text-4xl text-2xl font-semibold mb-6">Admin Dashboard</h3>
      <p className="mb-6 text-sm">Welcome to the admin dashboard! Here you can find the latest member statistics and trends.</p>

      {/* Total Members Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card w-full bg-base-300 border-b-2 border-b-info shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Total Members</h2>
            <p className="text-2xl font-semibold">1,500</p>
          </div>
        </div>

        <div className="card w-full bg-base-300 border-b-2 border-b-info shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Graduated Members</h2>
            <p className="text-2xl font-semibold">800</p>
          </div>
        </div>

        <div className="card w-full bg-base-300 border-b-2 border-b-info shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Non-Graduated Members</h2>
            <p className="text-2xl font-semibold">700</p>
          </div>
        </div>
      </div>

      {/* Members by Year (1st, 2nd, 3rd, 4th Year) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card w-full bg-base-300 border-b-2 border-b-secondary shadow-xl">
          <div className="card-body">
            <h2 className="card-title">1st Year Members</h2>
            <p className="text-2xl font-semibold">400</p>
          </div>
        </div>

        <div className="card w-full bg-base-300 border-b-2 border-b-secondary shadow-xl">
          <div className="card-body">
            <h2 className="card-title">2nd Year Members</h2>
            <p className="text-2xl font-semibold">250</p>
          </div>
        </div>

        <div className="card w-full bg-base-300 border-b-2 border-b-secondary shadow-xl">
          <div className="card-body">
            <h2 className="card-title">3rd Year Members</h2>
            <p className="text-2xl font-semibold">200</p>
          </div>
        </div>

        <div className="card w-full bg-base-300 border-b-2 border-b-secondary shadow-xl">
          <div className="card-body">
            <h2 className="card-title">4th Year Members</h2>
            <p className="text-2xl font-semibold">150</p>
          </div>
        </div>
      </div>

      {/* Pie Charts: Gender Distribution and Department-wise Member Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Pie Chart: Gender Distribution */}
        <div className="card w-full bg-base-300 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Gender Distribution</h2>
            <Pie data={genderData} />
          </div>
        </div>

        {/* Pie Chart: Department-wise Member Distribution */}
        <div className="card w-full bg-base-300 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Members by Department</h2>
            <Pie data={departmentData} />
          </div>
        </div>
      </div>

      {/* Bar Chart: Monthly Registration (Last 12 Months) */}
      <div className="card w-full bg-base-300 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">Monthly Registrations (Last 12 Months)</h2>
          <Bar data={registrationData12Months} options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Monthly Registrations',
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  borderColor: '#ccc',
                },
              },
              x: {
                grid: {
                  borderColor: '#ccc',
                },
              },
            },
          }} />
        </div>
      </div>

      {/* Bar Chart: Registration (Last 5 Years) */}
      <div className="card w-full bg-base-300 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Registrations (Last 5 Years)</h2>
          <Bar data={registrationData5Years} options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Registrations (Last 5 Years)',
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  borderColor: '#ccc',
                },
              },
              x: {
                grid: {
                  borderColor: '#ccc',
                },
              },
            },
          }} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
