import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ImageUpload from '../../components/ImageUpload/ImageUpload';

export default function Settings() {
  return (
    <Container>
      <Row className="mt-4" >
        <Col>
          <Card border="light">
           <Card.Title as="h5">Ladda upp en profilbild</Card.Title>
            <Card.Body>
              <Row className='mt-5'>
                <ImageUpload />
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
