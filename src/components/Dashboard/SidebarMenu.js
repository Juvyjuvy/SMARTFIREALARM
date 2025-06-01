import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient'; // Adjust path if needed
import '../css/SidebarMenu.css';

function SidebarMenu({ userName, onLogout, onClose }) {
  const [profileUrl, setProfileUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileImage = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session?.user) return;

      const uid = session.user.id;
      const filePath = `user-${uid}/profile.jpg`;

      const { data, error: imageError } = await supabase
        .storage
        .from('profile-images')
        .createSignedUrl(filePath, 60);

      if (!imageError && data?.signedUrl) {
        setProfileUrl(`${data.signedUrl}&t=${Date.now()}`); // cache bust
      }
    };

    fetchProfileImage();
  }, []);

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate('/login');
  };

  return (
    <div className="sidebar-menu">
      <div className="user-info">
        <div className="user-icon">
          {profileUrl ? (
            <img src={profileUrl} alt="Profile" className="profile-img" />
          ) : (
            <svg width="50" height="50" fill="black" viewBox="0 0 24 24">
              <circle cx="12" cy="7" r="4" />
            </svg>
          )}
        </div>
        <p className="username">{userName}</p>
      </div>

      <nav className="menu-links">
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>HOME</NavLink>
        <NavLink to="/profilepage" className={({ isActive }) => (isActive ? 'active' : '')}>PROFILE</NavLink>
        <NavLink to="/monitoring" className={({ isActive }) => (isActive ? 'active' : '')}>MONITORING</NavLink>
      </nav>
              <button className="logout-button" onClick={handleLogout}>LOGOUT</button>

    </div>
  );
}

export default SidebarMenu;
