import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, Card, Image, Container} from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './Homepage.scss';
export default function HomePage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users");
        const { data } = response;
  
        console.log('Backend Response:', data);
  
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error('Invalid data format received from backend');
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <Row style={{marginTop: '5px'}}>
      <Col xs={5}>
        <Image 
          src='https://images.pexels.com/photos/2400843/pexels-photo-2400843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
          fluid
          rounded  
        />
      </Col>

      <Col>
        <Card className='user-list'>
        <Card.Header as="h3">Användare</Card.Header>
          <Card.Body>
            <ListGroup>
              {users.map((user) => (
                <ListGroup.Item key={user._id} className="user-item">
                  <div className="user-info">
                    {user.image ? (
                      <Image 
                        src={`http://localhost:8080/image/${user.image._id}`}
                        alt="User"
                        roundedCircle thumbnail
                      />
                    ) : (
                      <Image 
                        src={`https://ui-avatars.com/api/?background=random&color=fff&name=${user.fullname}`}
                        alt="User"
                        roundedCircle thumbnail
                      />
                    )}
                    <Card.Text className="username">@{user.username}</Card.Text>
                    <Card.Text className="last-time-seen">Senast online: {user.lastLogin} </Card.Text>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
