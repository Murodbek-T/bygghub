import React from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import "../css/Faq.css";

export default function Faq() {
    return (
        <>
            {/* HERO */}
            <section className="FaqHero HemPageDark">
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col lg={8}>
                            <div className="SectionBadge">FAQ</div>
                            <h1 className="FaqTitle">Help center</h1>
                            <p className="FaqSubtitle">Questions frequently asked by our users</p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* LIST */}
            <section className="HemPageDark py-4">
                <Container>
                    <Accordion flush className="FaqAccordion">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Is there a desktop version?</Accordion.Header>
                            <Accordion.Body>
                                Of course! Use the web version from your office computer. Field teams use the mobile app.
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="1">
                            <Accordion.Header>What if my crew isn’t tech-savvy?</Accordion.Header>
                            <Accordion.Body>
                                The app is extremely intuitive. Most users understand it within minutes; we also provide short onboarding.
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Will our data be safe?</Accordion.Header>
                            <Accordion.Body>
                                All data is encrypted and stored on EU servers (GDPR compliant). You control access per project and role.
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Can we request features?</Accordion.Header>
                            <Accordion.Body>
                                Absolutely. We regularly ship customer-requested features. Send ideas to support@bygghub.com.
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="4">
                            <Accordion.Header>
                                Can I export all my data if I decide to stop using the app?
                            </Accordion.Header>
                            <Accordion.Body>
                                Yes. You can export time logs, tasks, files, and chats to common formats (CSV/ZIP) from the admin panel.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Container>
            </section>
        </>
    );
}
