import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Hämta användar-ID från localStorage när komponenten mountar
    const userId = localStorage.getItem('_Id');
    if (userId) {
      fetchProfileImage(userId);
    }
  }, []);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const res = await axios.post('http://localhost:8080/user/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = res.data;

      if (res.status === 200) {
        setMessage(data.message);
        const userId = data.userId; // Använd rätt variabelnamn från responsen
        setProfileImage(data.path);
        console.log(data.path)
        localStorage.setItem('userId', userId);
      } else {
        setMessage(data.message || 'Bilduppladdningen misslyckades.');
      }
    } catch (error) {
      console.error('Error uploading image:', error.message);
      setMessage('Internt serverfel vid bilduppladdning.');
    }
  };

  const fetchProfileImage = async (userId) => {
    try {
      // Endast göra anropet om userId är definierad
      if (userId) {
        const res = await axios.get(`http://localhost:8080/user/getProfileImage/${userId}`);
        setProfileImage(res.data.path);
      }
    } catch (error) {
      console.error('Error fetching profile image:', error.message);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
      <p>{message}</p>
      {profileImage && (
        <div>
          <h2>Profilbild:</h2>
          <img src={`http://localhost:8080/${profileImage}`} alt="Profilbild" style={{ maxWidth: '300px' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
