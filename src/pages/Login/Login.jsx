import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

export default function Login({ setToken }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      const res = await axios.post("http://localhost:8080/login", {
        identifier,
        password,
      });
      
      setValidated(true);
      if (!identifier || !password) {
        setMessage("Fyll i både e-post och lösenord.");
        return;
      }

      const data = await res.data;
 
      if (res.status === 200) {
        setMessage(data.message);
        localStorage.setItem("accessToken", data.token);
        localStorage.setItem("fullname", data.fullname);
        localStorage.setItem("_id", data._id);
        localStorage.setItem("username", data.username);

        setToken(data.token);

        navigate("/account/profile");
      } else {
        setMessage(data.message || "Inloggningen misslyckades.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("Felaktiga inloggningsuppgifter");
    }
  };

  return (
    <Container>
      <Card className="form-container">
        <Card.Header as="h3">Logga in</Card.Header>
        <Card.Body>
          <Form noValidate validated={validated}>
            <Col className="mb-3">
              <Form.Group controlId="formBasicIdentifier">
                <FloatingLabel controlId="formBasicIdentifier" label="Email eller användarnamn">
                  <Form.Control
                    required={true}
                    placeholder="Email eller användarnamn"
                    type="identifier"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className={validated && !identifier ? "is-invalid" : identifier ? "is-valid" : ''}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col className="mb-3">
              <Form.Group controlId="formBasicPassword">
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                    required={true}
                    type="password"
                    placeholder="Lösenord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={validated && !password ? "is-invalid" : password ? "is-valid" : ''}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>

            <Col className="mb-3">
              <Card.Text className="text-muted error" >
                {message}
              </Card.Text>
            </Col>

            <Col className="mb-3">
              <Button variant="primary" type="button" onClick={handleLogin}>
                Logga in
              </Button>
            </Col>
          </Form>
        </Card.Body>

        <Card.Text className="mb-3">
          Har du inget konto? Registrera dig <Link to="/register">här.</Link>
        </Card.Text>
      </Card>
    </Container>
  );
}
