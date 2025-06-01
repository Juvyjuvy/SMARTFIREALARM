import React, { useState, useRef } from 'react';
import '../css/Contacts.css';
import { Search, Filter, User, X, Phone } from 'lucide-react';

const initialContacts = [
  {
    name: 'Fire Fighter',
    number: '000-0000',
    station: 'Iligan City Fire Station',
    chief: 'Capt. Ernesto Reyes'
  },
  {
    name: 'Ambulance',
    number: '000-0000',
    station: 'Iligan Medical Center',
    chief: 'Dr. Amanda Cruz'
  },
  {
    name: 'Hospital',
    number: '000-0000',
    station: 'City General Hospital',
    chief: 'Dr. Martin Lopez'
  },
  {
    name: 'Police',
    number: '000-0000',
    station: 'Iligan City Police Station',
    chief: 'P/Capt. Ramil Santos'
  },
];

function Contacts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [isRinging, setIsRinging] = useState(false);
  const ringtoneRef = useRef(null);

  const filteredContacts = initialContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCallClick = () => {
    setIsRinging(true);
    if (ringtoneRef.current) {
      ringtoneRef.current.currentTime = 0;
      ringtoneRef.current.play();
    }
  };

  const stopRinging = () => {
    setIsRinging(false);
    if (ringtoneRef.current) {
      ringtoneRef.current.pause();
      ringtoneRef.current.currentTime = 0;
    }
  };

  const handleHangUp = () => {
    stopRinging();
    setSelectedContact(null);
  };

  const handleCloseModal = () => {
    stopRinging();
    setSelectedContact(null);
  };

  return (
    <div className="contacts-container">
      <div className="search-section">
        <div className="search-box">
          <Search className="lucide-icon" size={20} />
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="filter-button">
          <Filter size={24} color="white" />
        </button>
      </div>

      <div className="contacts-list">
        {filteredContacts.map((contact, index) => (
          <div
            key={index}
            className="contact-card"
            onClick={() => {
              setSelectedContact(contact);
              stopRinging();
            }}
          >
            <div className="user-icon-wrapper">
              <User size={40} color="red" />
            </div>
            <div className="contact-info">
              <span className="contact-name">{contact.name}</span>
              <span className="contact-number">Contact Number ({contact.number})</span>
            </div>
          </div>
        ))}
      </div>

      <audio ref={ringtoneRef} src="/sounds/ringtone.mp3" preload="auto" loop />

      {selectedContact && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseModal}>
              <X size={20} color="red" />
            </button>
            <div className="modal-content">
              <div className="user-icon-wrapper">
                <User size={60} color="red" />
              </div>
              <h2>{selectedContact.name}</h2>
              <p><strong>Contact Number:</strong> ({selectedContact.number})</p>
              <p><strong>Station:</strong> {selectedContact.station}</p>
              <p><strong>Chief on Duty:</strong> {selectedContact.chief}</p>

              {!isRinging && (
                <button className="call-button" onClick={handleCallClick}>
                  <span className="icon-centered"><Phone size={24} /></span> Call
                </button>
              )}

              {isRinging && (
                <button className="hangup-button" onClick={handleHangUp}>
                  <span className="icon-centered shaking-icon"><Phone size={24} /></span> Hang Up
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contacts;
