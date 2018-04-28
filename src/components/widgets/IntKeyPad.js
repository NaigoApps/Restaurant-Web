import React, {Component} from 'react';
import KeyboardButton, {SIZES} from "./inputs/KeyboardButton";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";

const NUMBERS = ['\\', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '\'', 'ì'];

const BUTTONS = [
    ['1', '2', '3', '4', '5'],
    ['6', '7', '8', '9', '0']
];

export default class IntKeyPad extends Component {
    constructor(props) {
        super(props);
    }

    onButtonClick(char) {
        this.props.onCharAction(char);
    }

    render() {
        const disabled = this.props.disabled;

        let n1 = BUTTONS[0].map(n => <KeyboardButton key={n} disabled={disabled} char={n}
                                                     onClick={() => this.props.onCharAction(n)}/>);
        let n2 = BUTTONS[1].map(n => <KeyboardButton key={n} disabled={disabled} char={n}
                                                     onClick={() => this.props.onCharAction(n)}/>);


        return (<Row>
            <Column>
                <Row justify="center">
                    {n1}
                </Row>
                <Row justify="center" ofList>
                    {n2}
                </Row>
            </Column>
            <Column auto>
                <Row justify="center" grow>
                    <KeyboardButton
                        disabled={disabled}
                        char="C"
                        size={SIZES.XSMALL}
                        onClick={() => this.props.onCharAction("CANC")}
                    />
                </Row>
            </Column>
        </Row>);
    }

}