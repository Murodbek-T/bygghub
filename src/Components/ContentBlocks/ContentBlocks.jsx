import React, {Component} from 'react';
import {Card, Col, Row} from "react-bootstrap";
import TitleAndSubtitle from "../TitleAndSubtitle/TitleAndSubtitle";
import BlueButton from "../BlueButton/BlueButton";
import './ContentBlocks.css';
import Badge from "../Badge/Badge";
import checkMark from "../../assets/checkmark.svg";

export default class ContentBlocks extends Component {
    render() {
        return (

            <div className="d-flex justify-content-center align-items-center">

                <Row>

                    <Col sm={12} xl={6} className="d-flex flex-column ps-4 mt-2">

                        <Badge text="Pricing"/>

                        <TitleAndSubtitle
                            title="Try before you pay"
                            subtitle="14-day free trial. All features. No credit card."/>

                        <BlueButton/>

                    </Col>

                    <Col sm={12} xl={6} className="d-flex flex-column">
                        <Card className="PricingCard">

                            <Card.Body>

                                <TitleAndSubtitle
                                    title="Full package"
                                    subtitle="Every feature we haves"
                                    variant="pricingTitle"
                                />

                                <TitleAndSubtitle
                                    title="€50 per month per 10 users"
                                    subtitle=""
                                    variant="pricingPackage"
                                />


                                <Row >
                                    <Col sm={12} xl={6}>
                                        <ul className="list-unstyled small">
                                            <li><img src={checkMark} alt="checkMark"/> GPS and manual time tracking</li>
                                            <li><img src={checkMark} alt="checkMark"/> Task manager</li>
                                            <li><img src={checkMark} alt="checkMark"/> File manager</li>
                                            <li><img src={checkMark} alt="checkMark"/> Group & direct chats</li>
                                        </ul>
                                    </Col>
                                    <Col sm={12} xl={6}>
                                        <ul className="list-unstyled small">
                                            <li><img src={checkMark} alt="checkMark"/> Photo reports</li>
                                            <li><img src={checkMark} alt="checkMark"/> Full data export</li>
                                            <li><img src={checkMark} alt="checkMark"/> Web and mobile access</li>
                                            <li><img src={checkMark} alt="checkMark"/> Email & chat support</li>
                                        </ul>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>


            </div>
        );
    }
}

