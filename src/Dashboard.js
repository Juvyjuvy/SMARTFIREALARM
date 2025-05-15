import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [heat, setHeat] = useState(80);
  const [alarmOn, setAlarmOn] = useState(false);

  // Auto-increase heat every 2 seconds, stop at 100%
  useEffect(() => {
    const interval = setInterval(() => {
      setHeat((prevHeat) => {
        const next = prevHeat + 5;
        return next >= 100 ? 100 : next;
      });
    }, 2000);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  const getColor = () => {
    if (heat >= 100) return '#c70000'; // Red
    if (heat >= 80) return '#ff9900';  // Orange
    return '#28a745'; // Green
  };

  const toggleAlarm = () => {
    setAlarmOn(!alarmOn);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="sfa-logo">SFA</h1>
      </header>

      <div className="heat-indicator">
        <svg width="200" height="200">
          <circle
            cx="100"
            cy="100"
            r="80"
            stroke="#eee"
            strokeWidth="20"
            fill="none"
          />
          <circle
            cx="100"
            cy="100"
            r="80"
            stroke={getColor()}
            strokeWidth="20"
            fill="none"
            strokeDasharray={`${(heat / 100) * 502.65} 999`}
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
          />
        </svg>
        <div className="heat-label">
          <span>HEAT</span>
          <strong>{heat}%</strong>
        </div>
      </div>

      <button className="alarm-button" onClick={toggleAlarm}>
        <img src="/fireman-icon.png" alt="Helmet Icon" className="helmet-icon" />
      </button>
    </div>
  );
}

export default Dashboard;
