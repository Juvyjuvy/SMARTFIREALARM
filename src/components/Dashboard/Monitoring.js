import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import MapPage from './MapPage';
import Contacts from './Contacts';
import SidebarMenu from './SidebarMenu';
import { House, MapPinned, Contact } from 'lucide-react';
import '../css/Dashboard.css';

function Monitoring() {
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [profileUrl, setProfileUrl] = useState(null);
  const [userId, setUserId] = useState(null);
  const alarmAudio = useRef(null);
  const sidebarRef = useRef();
  const navigate = useNavigate();

  // ✅ Fetch profile image from Supabase
  const fetchProfileImage = async (uid) => {
    if (!uid) return;

    const filePath = `user-${uid}/profile.jpg`;

    const { data, error } = await supabase
      .storage
      .from('profile-images')
      .createSignedUrl(filePath, 60); // 60 seconds

    if (error) {
      if (error.statusCode === 404) {
        console.log('No profile image found.');
      } else {
        console.error('Error fetching image:', error.message);
      }
      setProfileUrl(null);
    } else {
      // ✅ Use cache-busting to ensure fresh image
      setProfileUrl(`${data.signedUrl}&t=${Date.now()}`);
    }
  };

  // ✅ Upload profile image
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !userId) return;

    const filePath = `user-${userId}/profile.jpg`;

    const { error: uploadError } = await supabase
      .storage
      .from('profile-images')
      .upload(filePath, file, {
        upsert: true,
        cacheControl: '3600',
        contentType: file.type,
      });

    if (uploadError) {
      alert('Upload failed: ' + uploadError.message);
    } else {
      console.log('Profile image uploaded.');
      await fetchProfileImage(userId); // ✅ Refresh the image
    }

    e.target.value = ''; // reset file input
  };

  // ✅ On mount: verify session and get user
  useEffect(() => {
    const fetchUser = async () => {
      const { data: sessionData, error } = await supabase.auth.getSession();

      if (
        error ||
        !sessionData?.session ||
        !sessionData.session.user ||
        !sessionData.session.user.email_confirmed_at
      ) {
        alert('Access denied. Please log in and verify your email.');
        navigate('/login');
        return;
      }

      const user = sessionData.session.user;
      const userMetadata = user.user_metadata;

      setFullName(userMetadata?.full_name || 'Unknown User');
      setUserId(user.id);
      await fetchProfileImage(user.id); // ✅ Load profile image
    };

    fetchUser();
  }, [navigate]);

  // ✅ Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  // ✅ Setup alarm audio once
  useEffect(() => {
    alarmAudio.current = new Audio(process.env.PUBLIC_URL + '/sounds/fire-alarm.mp3');
    alarmAudio.current.loop = true;
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <button className="icon-button" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 24 24">
            <path stroke="white" strokeWidth="2" strokeLinecap="round" d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
        <h1 className="sfa-logo">SFA</h1>
        <button className="icon-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 24 24">
            <path d="M12 24c1.1046 0 2-.8954 2-2h-4c0 1.1046.8954 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V6a1.5 1.5 0 00-3 0v.68C7.63 7.36 6 9.92 6 13v5l-1.99 2v1h16v-1l-2-2z" />
          </svg>
        </button>
      </header>

      <div className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}>
        <div ref={sidebarRef} className={`sidebar-wrapper ${sidebarOpen ? 'open' : ''}`}>
          <SidebarMenu
            userName={fullName}
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
          <div className="container">
            <div className="user-info">
              <div className="user-icon">
                {profileUrl ? (
                  <img src={profileUrl} alt="Profile" className="profile-img" />
                ) : (
                  <svg width="40" height="40" fill="black" viewBox="0 0 24 24">
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                )}
              </div>
              <p>{fullName}</p>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
          </div>
        )}
        {activeTab === 'map' && <MapPage />}
        {activeTab === 'contact' && <Contacts />}
      </main>

      <div className="bottom-nav">
        <button className={`nav-button ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
          <House color={activeTab === 'home' ? 'red' : 'white'} size={30} />
        </button>
        <button className={`nav-button ${activeTab === 'map' ? 'active' : ''}`} onClick={() => setActiveTab('map')}>
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

export default Monitoring;
