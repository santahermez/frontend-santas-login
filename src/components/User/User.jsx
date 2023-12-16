import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function User({ userID }) {
  const [user, setUser] = useState(null);
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/user/${userID}`);
        setUser(res.data);
        console.log(res.data)

        if (res.data.image) {
          const imageResponse = await axios.get(`http://localhost:8080/image/${res.data.image._id}`, { responseType: 'arraybuffer' });
          const base64Image = arrayBufferToBase64(imageResponse.data);
          setImageData(`data:image/jpeg;base64,${base64Image}`);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userID]);

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  return (
    <div>
      <h2>@{user.username}</h2>
      {imageData && (
        <div>
          <img src={imageData} alt="User" style={{ maxWidth: '300px' }} />
        </div>
      )}
      {user && (
        <div>
          <p>Namn: {user.fullname}</p>
          <p>Email: {user.email}</p>

        </div>
      )}
    </div>
  );
};
