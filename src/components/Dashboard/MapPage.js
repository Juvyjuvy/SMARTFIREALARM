import React from 'react';

function MapPage() {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d987.0245080293367!2d124.24489566945258!3d8.228216199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3255d8a733c4ed6f%3A0xa2ff5d357a3b8302!2sSt.%20Peter's%20College%20-%20Iligan!5e0!3m2!1sen!2sph!4v1683971074920!5m2!1sen!2sph"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      />
    </div>
  );
}

export default MapPage;
