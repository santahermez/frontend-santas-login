import React, { useState, useEffect } from "react";
import axios from "axios";
import "./User.scss";
import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Image } from "react-bootstrap";

export default function User({ userID }) {
  const [user, setUser] = useState(null);
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/user/${userID}`);
        setUser(res.data);
        console.log(res.data);

        if (res.data.image) {
          const imageResponse = await axios.get(
            `http://localhost:8080/image/${res.data.image._id}`,
            { responseType: "arraybuffer" }
          );
          const base64Image = arrayBufferToBase64(imageResponse.data);
          setImageData(`data:image/jpeg;base64,${base64Image}`);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userID]);

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  return (
    <Container>
      <Card className="mt-4" border="light">
        <Card.Body>
          <Row className="mt-3">
          <Col className="md-3">
          {imageData && (
            <Image src={imageData} alt="User" className="profile-image" roundedCircle thumbnail/>
            )}
          </Col>
          <Col className="mt-3" xs={12}>
            {user && (
              <Card.Text>Välkommen till din profil {user.fullname}!</Card.Text>
              )}
          </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
