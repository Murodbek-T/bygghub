import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import './BlueButton.css';

export default class BlueButton extends Component {
    render() {
        return (
         <Button className="BlueButton">
             Get Started For Free
         </Button>
        );
    }
}

