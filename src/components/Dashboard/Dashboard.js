// src/components/Dashboard/Dashboard.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import MapPage from './MapPage';
import Contacts from './Contacts';
import SidebarMenu from './SidebarMenu';
import { Alarm } from '@mui/icons-material';
import { House, MapPinned,Contact } from 'lucide-react';
import '../css/Dashboard.css';

function Dashboard() {
  const [heat, setHeat] = useState(80);
  const [alarmOn, setAlarmOn] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const alarmAudio = useRef(null);
  const sidebarRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebarOpen(false);
    }
  };

  if (sidebarOpen) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [sidebarOpen]);

  useEffect(() => {
  const checkAuth = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session || !session.user || !session.user.email_confirmed_at) {
      alert("Access denied. Please log in and verify your email.");
      navigate('/login');
    }
  };
  checkAuth();
}, [navigate]);


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
        alarmAudio.current.play().catch(e => console.log('Alarm play error:', e));
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
        <button className="icon-button" aria-label="Menu" onClick={() => setSidebarOpen(!sidebarOpen)}>
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

      <div className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}>
  <div ref={sidebarRef} className={`sidebar-wrapper ${sidebarOpen ? 'open' : ''}`}>
    <SidebarMenu
      userName="John Doe"
      onLogout={async () => {
        await supabase.auth.signOut();
        navigate('/login');
      }}
      onClose={() => setSidebarOpen(false)}
    />
  </div>
</div>


      <main className="dashboard-main">
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
                <span role="img" aria-label="warning">⚠️</span> Heat level has reached 100%! Take action!
              </div>
            )}

            <button
              className="alarm-button"
              onClick={toggleAlarm}>
              <Alarm />
              {alarmOn ? 'Alarm ON' : 'Alarm OFF'}
            </button>
          </>
        )}

        {activeTab === 'map' && <MapPage />}
        {activeTab === 'contact' && <Contacts />}
      </main>

      <div className="bottom-nav">
      <button
  className={`nav-button ${activeTab === 'home' ? 'active' : ''}`}
      onClick={() => setActiveTab('home')}>
       <House color={activeTab === 'home' ? 'red' : 'white'} size={30} />
</button>

       <button
  className={`nav-button ${activeTab === 'map' ? 'active' : ''}`}
  onClick={() => setActiveTab('map')}
>
  <MapPinned color={activeTab === 'map' ? 'red' : 'white'} size={30} />
</button>

       <button
  className={`nav-button ${activeTab === 'contact' ? 'active' : ''}`}
  onClick={() => setActiveTab('contact')}
>
  <Contact color={activeTab === 'contact' ? 'red' : 'white'} size={30} />
</button>

      </div>
    </div>
  );
}

export default Dashboard;
