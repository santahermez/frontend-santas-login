import React, { useState } from 'react';
import axios from 'axios';
import './ImageUpload.scss';

export default function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const uploadImage = async () => {
    try {
      if (!selectedImage) {
        console.error('No file selected');
        return;
      }
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('userID', localStorage.getItem('_id'))


      const response = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        console.log('Image uploaded successfully');
        
      } else {
        console.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error during image upload:', error);
    }
  };

  return (
    <div>
      <label htmlFor="avatar" className="custom-file-upload lable">
          {selectedImage && (
            <img 
              src={URL.createObjectURL(selectedImage)} 
              alt="Selected"
              className="uploaded-image"
              style={{ maxWidth: '200px' }} 
            />
          )}
        <input 
          type="file" 
          name='avatar' 
          id="avatar" 
          onChange={handleImageChange} 
          accept="image/*"
          className="custom-file-upload"
        />
      </label>
    <button onClick={uploadImage}>Spara</button>
  </div>
  );
};
