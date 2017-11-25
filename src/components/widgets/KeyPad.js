import React, {Component} from 'react';
import KeyboardButton, {SIZES} from "./inputs/KeyboardButton";

const NUMBERS = ['\\','1','2','3','4','5','6','7','8','9','0','\'','ì'];

const BUTTONS = [
    ['1','2','3'],
    ['4','5','6'],
    ['7','8','9'],
    ['0','.']
];

export const CANC = "CANC";

export default class KeyPad extends Component {
    constructor(props) {
        super(props);
    }

    onButtonClick(char){
        this.props.onCharAction(char);
    }

    onDelClick(char){
        this.props.onCharAction(CANC);
    }

    render() {
        let n1 = BUTTONS[0].map(n => <KeyboardButton key={n} char={n} onClick={this.onButtonClick.bind(this, n)}/>);
        let n2 = BUTTONS[1].map(n => <KeyboardButton key={n} char={n} onClick={this.onButtonClick.bind(this, n)}/>);
        let n3 = BUTTONS[2].map(n => <KeyboardButton key={n} char={n} onClick={this.onButtonClick.bind(this, n)}/>);
        let n4 = BUTTONS[3].map(n => <KeyboardButton key={n} char={n} onClick={this.onButtonClick.bind(this, n)}/>);


        return (<div className="container-fluid">
            <div className="row text-center">
                {n1}
            </div>
            <div className="row text-center">
                {n2}
            </div>
            <div className="row text-center">
                {n3}
            </div>
            <div className="row text-center">
                {n4}
                <KeyboardButton char="C" size={SIZES.XSMALL} onClick={this.onDelClick.bind(this)}/>
            </div>
        </div>);
    }

}