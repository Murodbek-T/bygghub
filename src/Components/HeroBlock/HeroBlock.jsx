import React, {Component} from 'react';
import {Col, Row} from "react-bootstrap";
import TitleAndSubtitle from "../TitleAndSubtitle/TitleAndSubtitle";
import BlueButton from "../BlueButton/BlueButton";
import phone1 from "../../assets/p1.png";
import './HeroBlock.css';
import Features from "../Features3/Features";
import one from "../../assets/1.svg";
import two from "../../assets/2.svg";
import three from "../../assets/3.svg";
import Badge from "../Badge/Badge";

export default class HeroBlock extends Component {
    render() {
        return (

            <div className="HeroBlock">

                <Row>

                    <Col xs={12} xl={6} className="LeftMargin d-flex flex-column">

                        <Badge text="Built by construction pros, for construction pros"/>

                        <TitleAndSubtitle
                            title={<>Get rid of chaos<br/>and boring paperwork</>}
                            subtitle={<>Automate work time-tracking, keep tasks, documents,<br/>and team communication
                                in one place.</>}
                        />

                        <BlueButton/>

                    </Col>

                    <Col xs={12} xl={6} className="RightMargin">

                        <div className="GlowWrapper">

                            <div className="HeroGlow"></div>
                            <img src={phone1} alt="App preview" className="imgHero"/>

                        </div>


                    </Col>

                </Row>


                <Row className="mt-5 mt-md-6">


                    <Col md={12}>

                        <TitleAndSubtitle
                            align="left"
                            title="We know what problems you have"
                            subtitle="because we had them too"
                        />

                    </Col></Row>

                <Row>
                    <Col md={4} className="d-flex flex-column justify-content-center align-items-center">
                        <Features image={one} title={<>Collecting work hours <br/>manually</>}
                                  subtitle="takes forever — and it’s full of mistakes"/>
                    </Col>

                    <Col md={4} className="d-flex flex-column justify-content-center align-items-center">
                        <Features image={two} title={<>I can’t see who’s <br/>working and what’s</>}
                                  subtitle="actually getting done — unless I call around all day."/>
                    </Col>

                    <Col md={4} className="d-flex flex-column justify-content-center align-items-center">
                        <Features image={three} title={<>Info gets lost in different places</>}
                                  subtitle="while I juggle WhatsApp, email, and paper"/>
                    </Col>
                </Row>


            </div>
        )

    }
}

