import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ImageUpload.scss";
import { Container, Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Image } from "react-bootstrap";

export default function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate()

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const uploadImage = async () => {
    try {
      if (!selectedImage) {
        console.error("No file selected");
        return;
      }
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("userID", localStorage.getItem("_id"));

      const response = await axios.post(
        "http://localhost:8080/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Image uploaded successfully");
        navigate('/account/profile')

      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error during image upload:", error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={6} md={4}>
        <label htmlFor="avatar" className="custom-file-upload lable">
          {selectedImage && (
            <Image
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="uploaded-image"
              roundedCircle
            />
          )}
          <input
            type="file"
            name="avatar"
            id="avatar"
            onChange={handleImageChange}
            accept="image/*"
            className="custom-file-upload"
          />
        </label>
        </Col>
      </Row>
      <Row>
        <Col className="mt-3">
          <Button
            variant="primary"
            type="button"
            onClick={uploadImage}
            size="lg"
          >
            Spara
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
