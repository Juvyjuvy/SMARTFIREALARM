import React, { useState, useEffect, useRef } from 'react';
import MapPage from './MapPage';
import Contacts from './Contacts'; // Make sure Contacts.js exists
import { Alarm } from '@mui/icons-material';
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
    }
    return () => clearInterval(interval);
  }, [heat]);

  useEffect(() => {
    if (heat === 100) {
      setAlarmOn(true);
    }
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

      {/* === Tabs === */}
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
              <span role="img" aria-label="warning">⚠️</span> Warning: Heat level has reached 100%! Please take immediate action!
            </div>
          )}

          <button
            className="alarm-button"
            onClick={toggleAlarm}
            style={{
              backgroundColor: alarmOn ? '#c70000' : '#555',
              color: 'white',
              borderRadius: 8,
              padding: '10px 20px',
              fontSize: 18,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <Alarm />
            {alarmOn ? 'Alarm ON' : 'Alarm OFF'}
          </button>
        </>
      )}

      {activeTab === 'map' && <MapPage />}
      {activeTab === 'contact' && <Contacts />}

      {/* === Bottom Navigation === */}
      <div className="bottom-nav">
        <button
          className={`nav-button ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill={activeTab === 'home' ? 'white' : 'gray'} viewBox="0 0 24 24">
            <path d="M3 9.75L12 3l9 6.75V21a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 21V9.75z" />
          </svg>
        </button>

        <button
          className={`nav-button ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill={activeTab === 'map' ? 'white' : 'gray'} viewBox="0 0 24 24">
            <path d="M3 6l7-3 7 3 4-1v15l-4 1-7-3-7 3V6z" />
          </svg>
        </button>

        <button
          className={`nav-button ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill={activeTab === 'contact' ? 'white' : 'gray'} viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
