import React, {Component} from 'react';
import KeyboardButton, {SIZES} from "./KeyboardButton";
import KeyboardButtonSpace from "./KeyboardButtonSpace";

const NUMBERS = ['\\','1','2','3','4','5','6','7','8','9','0','\'','ì'];

const UPPERCASE = [
    ['Q','W','E','R','T','Y','U','I','O','P','é','*'],
    ['A','S','D','F','G','H','J','K','L','ç','°','§'],
    ['>','Z','X','C','V','B','N','M',';',':','_']
];
const LOWERCASE = [
    ['q','w','e','r','t','y','u','i','o','p','è','+'],
    ['a','s','d','f','g','h','j','k','l','ò','à','ù'],
    ['<','z','x','c','v','b','n','m',',','.','-']
];

export const BACKSPACE = "BACKSPACE";
export const LEFT = "ARROWLEFT";
export const RIGHT = "ARROWRIGHT";
export const SHIFT = "SHIFT";
export const CTRL = "CONTROL";
export const ALT = "ALT";
export const META = "META";
export const LOCK = "CAPSLOCK";
export const DELETE = "DELETE";

export default class Keyboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uppercase : false
        }
    }

    onButtonClick(char){
        this.props.onCharAction(char);
    }

    onDelClick(char){
        this.props.onCharAction(BACKSPACE);
    }

    onRightClick(char){
        this.props.onCharAction(RIGHT);
    }

    onLeftClick(char){
        this.props.onCharAction(LEFT);
    }

    onCapsLockClick(){
        this.setState(prevState => {
            return {
                uppercase: !prevState.uppercase
            };
        });
    }

    render() {
        let letters = this.state.uppercase ? UPPERCASE : LOWERCASE;

        let numbers = NUMBERS.map(n => <KeyboardButton reduced={this.props.reduced} key={n} char={n} onClick={this.onButtonClick.bind(this, n)}/>);
        let letters1 = letters[0].map(n => <KeyboardButton reduced={this.props.reduced} key={n} char={n} onClick={this.onButtonClick.bind(this, n)}/>);
        let letters2 = letters[1].map(n => <KeyboardButton reduced={this.props.reduced} key={n} char={n} onClick={this.onButtonClick.bind(this, n)}/>);
        let letters3 = letters[2].map(n => <KeyboardButton reduced={this.props.reduced} key={n} char={n} onClick={this.onButtonClick.bind(this, n)}/>);


        return (<div className="container-fluid">
            <div className="row">
                {numbers}
                <KeyboardButton reduced={this.props.reduced} char="canc" size={SIZES.MEDIUM} onClick={this.onDelClick.bind(this)}/>
            </div>
            <div className="row">
                <KeyboardButtonSpace reduced={this.props.reduced} size={SIZES.SMALL}/>
                {letters1}
            </div>
            <div className="row">
                <KeyboardButton reduced={this.props.reduced} icon="lock" size={SIZES.MEDIUM} onClick={this.onCapsLockClick.bind(this)}/>
                {letters2}
            </div>
            <div className="row">
                <KeyboardButtonSpace reduced={this.props.reduced} size={SIZES.SMALL}/>{letters3}
            </div>
            <div className="row">
                <KeyboardButtonSpace reduced={this.props.reduced} size={SIZES.HUGE}/>
                <KeyboardButton reduced={this.props.reduced} icon="angle-left" size={SIZES.XSMALL} onClick={this.onLeftClick.bind(this)}/>
                <KeyboardButton reduced={this.props.reduced} text="&nbsp;" char=" " size={SIZES.SPACE} onClick={this.onButtonClick.bind(this)}/>
                <KeyboardButton reduced={this.props.reduced} icon="angle-right" size={SIZES.XSMALL} onClick={this.onRightClick.bind(this)}/>
            </div>
        </div>);
    }

}