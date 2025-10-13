import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "../css/Contacts.css";

export default function Contacts() {
    const [form, setForm] = useState({ email: "", phone: "", message: "", agree: false });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: отправка в твой бекенд / почту
        console.log("Contact form:", form);
        alert("Thanks! We’ll get back to you shortly.");
        setForm({ email: "", phone: "", message: "", agree: false });
    };

    return (
        <>
            {/* HERO */}
            <section className="ContactsHero HemPageDark">
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col lg={8}>
                            <div className="SectionBadge">Let’s connect</div>
                            <h1 className="ContactsTitle">Contact us</h1>
                            <p className="ContactsSubtitle">Get rid of chaos in reports and boring paperwork</p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* TWO CARDS */}
            <section className="ContactsBody HemPageLight">
                <Container>
                    <Row className="g-4">
                        {/* left card */}
                        <Col md={6}>
                            <Card className="ContactCard ContactCard--blue p-4">
                                <div className="SectionBadge small mb-3">Get in touch</div>
                                <h4 className="mb-2 text-white">Contact us via the details below</h4>
                                <p className="text-card-muted mb-4">Our managers are answering 24/7</p>

                                <ul className="ContactList">
                                    <li>hello@bygghub.com</li>
                                    <li>+46 (0) 723 456 888</li>
                                    <li>Sundbyberg, Stockholm, Sweden</li>
                                </ul>
                            </Card>
                        </Col>

                        {/* right card (form) */}
                        <Col md={6}>
                            <Card className="ContactCard p-4">
                                <h5 className="mb-3">Or fill out the form and we’ll contact you immediately</h5>

                                <Form onSubmit={handleSubmit}>
                                    <Row className="g-3">
                                        <Col sm={6}>
                                            <Form.Control
                                                type="email"
                                                placeholder="Email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Col>
                                        <Col sm={6}>
                                            <Form.Control
                                                type="tel"
                                                placeholder="Phone"
                                                name="phone"
                                                value={form.phone}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                        <Col xs={12}>
                                            <Form.Control
                                                as="textarea"
                                                rows={4}
                                                placeholder="Message"
                                                name="message"
                                                value={form.message}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Col>
                                        <Col xs={12}>
                                            <Form.Check
                                                type="checkbox"
                                                id="agree"
                                                name="agree"
                                                label={<>I accept the <a href="/legal/privacy">Privacy Policy</a></>}
                                                checked={form.agree}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Col>
                                        <Col xs={12}>
                                            <Button type="submit" variant="primary">Send message</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* MAP */}
            <section className="HemPageLight pb-5">
                <Container>
                    <div className="MapWrapper">
                        {/* Заменишь src на свой embed с адресом */}
                        <iframe
                            title="ByggHub office map"
                            src="https://www.google.com/maps?q=Sundbyberg,Sweden&output=embed"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </Container>
            </section>
        </>
    );
}
