import React, {Component} from 'react';
import {Tab, Col, Nav, Container, Row} from "react-bootstrap";
import first from "../assets/p1.png";
import second from "../assets/p2.png";
import third from "../assets/p3.png";
import fourth from "../assets/p4.png";

export default class OmOss extends Component {
    render() {
        return (

            <Container>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column mt-2">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Om oss</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Team</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">Why</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="fourth">Plans</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>

                        <Col sm={9}>
                            <Tab.Content className="mt-3">

                                <Tab.Pane eventKey="first">
                                    <img src={first} alt="first"/>
                                    <p>You seeeeee who is the boss here Bitaw</p>
                                </Tab.Pane>


                                <Tab.Pane eventKey="second">
                                    <img src="https://spoilertown.com/wp-content/uploads/2024/06/warrior-2011.webp"
                                         alt="second"/>
                                    <p>WWWWWWho is the boss here Bitaw</p>
                                    <p>WWWWWWho is the boss here Bitaw Second line we are Warriors EEEEEI</p>

                                </Tab.Pane>


                                <Tab.Pane eventKey="third">
                                    <img src={third} alt="third"/>
                                    <p>You seeeeee who is the boss here Bitaw. We WIN</p>
                                </Tab.Pane>

                                <Tab.Pane eventKey="fourth">
                                    <img src={fourth} alt="fourth"/>
                                    <p>You seeeeee who is the boss here Bitaw. We WIN like we always DO</p>
                                </Tab.Pane>

                            </Tab.Content>
                        </Col>
                    </Row>

                </Tab.Container>
            </Container>

        )
    }
}

