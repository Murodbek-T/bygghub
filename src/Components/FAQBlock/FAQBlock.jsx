import React, {useState} from "react";
import {Container, Row, Col} from "react-bootstrap";
import "./FAQBlock.css";
import TitleAndSubtitle from "../TitleAndSubtitle/TitleAndSubtitle";

const faqData = [
    {
        question: "Is there a desktop version?",
        answer: "Of course! Use the web version from your office computer. Field teams use the mobile app."
    },
    {
        question: "What if my crew isn’t tech-savvy?",
        answer: "No worries — the app is designed to be extremely intuitive. Most users understand it within minutes."
    },
    {
        question: "Will our data be safe?",
        answer: "Yes, all data is encrypted and stored securely on European servers compliant with GDPR."
    },
    {
        question: "Can we request features?",
        answer: "Absolutely! We regularly add customer-requested features to improve usability and performance."
    }
];

export default function FAQBlock() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="FAQSection HemPageDark">
            <Container>
                <Row className="align-items-start">

                    <Col md={5}>

                        <TitleAndSubtitle
                            title="Frequently asked questions"
                            subtitle=""
                            variant="pricingPackage"
                        />

                    </Col>

                    <Col md={7}>
                        <div className="FAQList">
                            {faqData.map((item, index) => (
                                <div
                                    key={index}
                                    className={`FAQItem ${activeIndex === index ? "active" : ""}`}
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <div className="FAQQuestion">
                                        <span>{item.question}</span>
                                        <span className="FAQToggle">
                      {activeIndex === index ? "−" : "+"}
                    </span>
                                    </div>
                                    {activeIndex === index && (
                                        <div className="FAQAnswer">{item.answer}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Col>


                </Row>
            </Container>
        </section>
    );
}
