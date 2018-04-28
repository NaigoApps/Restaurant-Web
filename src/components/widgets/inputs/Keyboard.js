import React, {Component} from 'react';
import KeyboardButton, {SIZES} from "./KeyboardButton";
import KeyboardButtonSpace from "./KeyboardButtonSpace";
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";

const NUMBERS = ['\\', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '\'', 'ì'];

const UPPERCASE = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'é', '*'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ç', '°', '§'],
    ['>', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ';', ':', '_']
];
const LOWERCASE = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'è', '+'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ò', 'à', 'ù'],
    ['<', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '-']
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
            uppercase: false
        }
    }

    onButtonClick(char) {
        this.props.onCharAction(char);
    }

    onDelClick(char) {
        this.props.onCharAction(BACKSPACE);
    }

    onRightClick(char) {
        this.props.onCharAction(RIGHT);
    }

    onLeftClick(char) {
        this.props.onCharAction(LEFT);
    }

    onCapsLockClick() {
        this.setState(prevState => {
            return {
                uppercase: !prevState.uppercase
            };
        });
    }

    render() {
        let letters = this.state.uppercase ? UPPERCASE : LOWERCASE;

        let numbers = NUMBERS.map(n => <KeyboardButton size={SIZES.XXSMALL} reduced={this.props.reduced} key={n}
                                                       char={n} onClick={this.onButtonClick.bind(this, n)}/>);
        let letters1 = letters[0].map(n => <KeyboardButton size={SIZES.XXSMALL} reduced={this.props.reduced} key={n}
                                                           char={n} onClick={this.onButtonClick.bind(this, n)}/>);
        let letters2 = letters[1].map(n => <KeyboardButton size={SIZES.XXSMALL} reduced={this.props.reduced} key={n}
                                                           char={n} onClick={this.onButtonClick.bind(this, n)}/>);
        let letters3 = letters[2].map(n => <KeyboardButton size={SIZES.XXSMALL} reduced={this.props.reduced} key={n}
                                                           char={n} onClick={this.onButtonClick.bind(this, n)}/>);


        return <Row customCss="keyboard">
            <Column>
                <Row>
                    {numbers}
                    <KeyboardButton char="canc" size={SIZES.XXSMALL}
                                    onClick={this.onDelClick.bind(this)}/>
                </Row>
                <Row topSpaced>
                    {letters1}
                </Row>
                <Row topSpaced>
                    <KeyboardButton icon="lock"
                                    size={SIZES.XXSMALL}
                                    onClick={this.onCapsLockClick.bind(this)}/>
                    {letters2}
                </Row>
                <Row topSpaced>
                    {letters3}
                </Row>
                <Row topSpaced>
                    <KeyboardButton icon="angle-left" size={SIZES.XXSMALL}
                                    onClick={this.onLeftClick.bind(this)}/>
                    <KeyboardButton text="&nbsp;" char=" " size={SIZES.MEDIUM}
                                    onClick={this.onButtonClick.bind(this)}/>
                    <KeyboardButton icon="angle-right" size={SIZES.XXSMALL}
                                    onClick={this.onRightClick.bind(this)}/>
                </Row>
            </Column>
        </Row>;
    }
}