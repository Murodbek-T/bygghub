import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import '../css/Login.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Logging in:', email, password);
        // Здесь будет логика авторизации (Firebase или твой backend)
    };

    return (
        <div className="LoginPage d-flex align-items-center justify-content-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md={5}>
                        <div className="LoginCard p-4 rounded">
                            <h2 className="mb-4 text-center text-white">Welcome back</h2>
                            <Form onSubmit={handleLogin}>
                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPassword" className="mb-4">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button type="submit" variant="primary" className="w-100">
                                    Login
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
