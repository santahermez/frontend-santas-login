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
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    try {
      const res = await axios.post("http://localhost:8080/register", {
        fullname,
        username,
        email,
        password,
      });

      if (!fullname || !username || !email || !password) {
        return;
      }

      const data = res.data;
      console.log("Server response:", data);

      if (res.status === 200) {
        setMessage('Registreringen lyckades!');
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        return;
      }
      setMessage(data.message);
    } catch (error) {
      console.error("error:", error);

      if (error.response && error.response.status === 409) {
        setMessage("Email eller användarnamn existerar redan");
      } else if (error.response && error.response.status === 400) {
        setMessage("Ange giltig email");
        
      } else {
        setMessage("Internt serverfel");
      }
    }
  };

  return (
    <Container>
      <Card className="form-container">
        <Card.Header as="h2" className="mb-2">
          Registrera dig
        </Card.Header>
        <Card.Body>
          <Form noValidate validated={validated}>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formBasicFullname">
                  <FloatingLabel
                    controlId="formBasicFullname"
                    label="För- och efternamn"
                  >
                    <Form.Control
                      type="text"
                      name="fullname"
                      placeholder="För- och efternamn"
                      required={true}
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      className={
                        validated && !fullname
                          ? "is-invalid"
                          : fullname
                          ? "is-valid"
                          : ""
                      }
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
                      className={
                        validated && !username
                          ? "is-invalid"
                          : username
                          ? "is-valid"
                          : ""
                      }
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
                      pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={
                        validated && !email
                          ? "is-invalid"
                          : email
                          ? "is-valid"
                          : ""
                      }
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
                      className={
                        validated && !password
                          ? "is-invalid"
                          : password
                          ? "is-valid"
                          : ""
                      }
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
          <Col className="mb-3">
            <Card.Text className="text-muted error">{message}</Card.Text>
          </Col>

          <Link to="/login" className="mt-3 d-block">
            Redan medlem? Logga in här.
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}
