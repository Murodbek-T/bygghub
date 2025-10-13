import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../css/About.css";

// заменишь на свои картинки
import team1 from "../assets/team1.jpg";
import team2 from "../assets/team2.jpg";
import heroImg from "../assets/bg1.jpg"
import valuesImg from "../assets/values.jpg";

export default function About() {
    return (
        <>
            {/* HERO */}
            <section className="AboutHero HemPageDark">
                <Container>
                    <Row className="align-items-end">
                        <Col md={12}>
                            <div className="SectionBadge">About us</div>
                            <h1 className="AboutTitle">About ByggHub</h1>
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col>
                            <div className="HeroImageWrapper">
                                <img src={heroImg} alt="ByggHub background" className="HeroImage" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* EXPERIENCE */}
            <section className="HemPageLight py-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} className="text-center">
                            <div className="SectionBadge small">Our background</div>
                            <h2 className="mb-3">Over 22 years in construction and project management</h2>
                            <p className="lead text-muted">
                                We know the industry from the inside. ByggHub is not just another IT product — it’s a working tool built on
                                real-life experience, designed to make everyday life on the construction site easier.
                            </p>
                        </Col>
                    </Row>

                    {/* TEAM */}
                    <Row className="g-4 mt-4">
                        <Col md={6}>
                            <Card className="TeamCard">
                                <img src={team1} className="TeamPhoto" alt="Alex Gerhard" />
                                <Card.Body>
                                    <h5 className="mb-1">Alex Gerhard</h5>
                                    <div className="text-muted small">Cofounder — 10+ years experience in construction</div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className="TeamCard">
                                <img src={team2} className="TeamPhoto" alt="Jurgen Klinçman" />
                                <Card.Body>
                                    <h5 className="mb-1">Jurgen Klinçman</h5>
                                    <div className="text-muted small">Cofounder — 22+ years experience in construction</div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* WHAT BYGGHUB DOES (1-2-3) */}
            <section className="WhatWeDo HemPageDark py-5">
                <Container>
                    <h3 className="text-center mb-5">What ByggHub Does</h3>
                    <Row className="g-4">
                        <Col md={4}>
                            <div className="NumCard">
                                <div className="Num">1</div>
                                <h5>Saves time and money</h5>
                                <p className="text-muted">on timesheets and paperwork</p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="NumCard">
                                <div className="Num">2</div>
                                <h5>Simplifies communication</h5>
                                <p className="text-muted">between office staff, site managers, and crews</p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="NumCard">
                                <div className="Num">3</div>
                                <h5>Brings clarity and transparency</h5>
                                <p className="text-muted">while you juggle WhatsApp, email, and paper</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* PRINCIPLES */}
            <section className="HemPageLight py-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={10}>
                            <div className="SectionBadge small">Our values</div>
                            <h3 className="mb-4">The Principles We Build On</h3>
                        </Col>
                    </Row>

                    <Row className="align-items-center g-4">
                        <Col md={6}>
                            <div className="RoundedImage">
                                <img src={valuesImg} alt="Team meeting" />
                            </div>
                        </Col>
                        <Col md={6}>
                            <ul className="CheckList">
                                <li>
                                    <h6>Our Approach</h6>
                                    <p className="text-muted mb-3">
                                        We remain active in construction while developing digital solutions that truly matter. Our principles are
                                        simplicity, honesty, and focus on real challenges faced by construction companies.
                                    </p>
                                </li>
                                <li>
                                    <h6>Collaboration</h6>
                                    <p className="text-muted mb-3">
                                        We are always open to dialogue and new ideas, and ready to adapt ByggHub to the specific needs of your
                                        company.
                                    </p>
                                </li>
                                <li>
                                    <h6>Our Mission</h6>
                                    <p className="text-muted mb-0">
                                        To ensure that digital technologies genuinely help builders work faster, simpler, and with greater
                                        comfort.
                                    </p>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* TESTIMONIALS */}
            <section className="HemPageLight pb-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={10}>
                            <div className="SectionBadge small">Our clients</div>
                            <h3 className="mb-4">We have Large Global Customer Feedback</h3>
                        </Col>
                    </Row>

                    <Row className="g-4">
                        {[1, 2].map((i) => (
                            <Col md={6} key={i}>
                                <Card className="TestimonialCard">
                                    <Card.Body>
                                        <div className="d-flex align-items-center gap-3 mb-3">
                                            <div className="Avatar">{/* можно вставить фото */}</div>
                                            <div>
                                                <div className="fw-semibold">Dennis J. Lester</div>
                                                <div className="text-muted small">Agry AB CEO</div>
                                            </div>
                                        </div>
                                        <p className="mb-2">
                                            The software has made scheduling and reporting much easier for our team. We save hours each week on
                                            paperwork, and communication with site crews is finally smooth and transparent.
                                        </p>
                                        <div className="text-muted small">4.75★ on Trustp</div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </>
    );
}
