import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Card from "react-bootstrap/Card";

export default function Register() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!fullname || !username || !email || !password) {
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/register", {
        fullname,
        username,
        email,
        password,
      });

      const data = res.data;

      if (res.status === 200) {
        setMessage(data.message);
        navigate("/login");
        return;
      }
      setMessage(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Card className="form-container">
        <Card.Header as="h2" className="mb-2">
          Registrera dig
        </Card.Header>
        <Card.Body>
          <Form>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formBasicFullname">
                  <FloatingLabel controlId="formBasicFullname" label="Namn">
                    <Form.Control
                      type="text"
                      name="fullname"
                      placeholder="För- & efternamn"
                      required={true}
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formBasicUsername">
                  <FloatingLabel
                    controlId="formBasicUsername"
                    label="Användarnamn"
                  >
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Användarnamn"
                      required={true}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <FloatingLabel controlId="formBasicEmail" label="Email">
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Email"
                      required={true}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formBasicPassword">
                  <FloatingLabel controlId="formBasicPassword" label="Lösenord">
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Lösenord"
                      required={true}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>

            <Button
              variant="primary"
              type="button"
              onClick={handleRegistration}
            >
              Registrera
            </Button>
          </Form>

          {message && <h4 className="mt-3">{message}</h4>}
          <Link to="/login" className="mt-3 d-block">
            Redan medlem? Logga in här.
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}
