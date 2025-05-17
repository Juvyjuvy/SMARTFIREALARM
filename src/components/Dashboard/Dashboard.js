import React, { useState, useEffect, useRef } from 'react';
import MapPage from './MapPage';
import './Dashboard.css';

function Dashboard() {
  const [heat, setHeat] = useState(80);
  const [alarmOn, setAlarmOn] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const alarmAudio = useRef(null);

  useEffect(() => {
    alarmAudio.current = new Audio(process.env.PUBLIC_URL + '/sounds/fire-alarm.mp3');
    alarmAudio.current.loop = true;
  }, []);

  useEffect(() => {
    let interval;
    if (heat < 100) {
      interval = setInterval(() => {
        setHeat(prevHeat => {
          const next = prevHeat + 1;
          return next >= 100 ? 100 : next;
        });
      }, 1000);
    } else {
      const timeout = setTimeout(() => {
        setHeat(80);
      }, 5000);
      return () => clearTimeout(timeout);
    }
    return () => clearInterval(interval);
  }, [heat]);

  useEffect(() => {
    if (alarmOn && heat === 100) {
      if (alarmAudio.current.paused) {
        alarmAudio.current.play().catch(e => {
          console.log('Alarm play error:', e);
        });
      }
    } else {
      alarmAudio.current.pause();
      alarmAudio.current.currentTime = 0;
    }
  }, [alarmOn, heat]);

  const toggleAlarm = () => {
    setAlarmOn(prev => !prev);
  };

  const getColor = () => {
    if (heat >= 100) return '#c70000';
    if (heat >= 80) return '#ff9900';
    return '#28a745';
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <button className="icon-button" aria-label="Menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 24 24">
            <path stroke="white" strokeWidth="2" strokeLinecap="round" d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
        <h1 className="sfa-logo">SFA</h1>
        <button className="icon-button" aria-label="Notifications">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 24 24">
            <path d="M12 24c1.1046 0 2-.8954 2-2h-4c0 1.1046.8954 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V6a1.5 1.5 0 00-3 0v.68C7.63 7.36 6 9.92 6 13v5l-1.99 2v1h16v-1l-2-2z" />
          </svg>
        </button>
      </header>

      {activeTab === 'home' && (
        <>
          <div className={`heat-indicator ${heat === 100 ? 'pulse' : ''}`}>
            <svg width="200" height="200">
              <circle cx="100" cy="100" r="80" stroke="#eee" strokeWidth="20" fill="none" />
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

          {heat === 100 && (
            <div className="warning-message">
              ⚠️ Warning: Heat level has reached 100%! Please take immediate action!
            </div>
          )}

          <button className="alarm-button" onClick={toggleAlarm}>
            <img src="/fire-icon.png" alt="Fire Icon" className="helmet-icon" />
            <span style={{ color: 'white', marginLeft: 8 }}>
              {alarmOn ? 'Alarm ON' : 'Alarm OFF'}
            </span>
          </button>
        </>
      )}

      {activeTab === 'map' && <MapPage />}

      <div className="bottom-nav">
        <button
          className={`nav-button ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <img src="/icons/home.png" alt="Home" />
        </button>
        <button
          className={`nav-button ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          <img src="/icons/map.png" alt="Map" />
        </button>
        <button
          className={`nav-button ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => alert('Contact page coming soon!')}
        >
          <img src="/icons/contact.png" alt="Contact" />
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
