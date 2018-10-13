import React, {Component} from 'react';
import Column from "../../../../widgets/Column";
import Row from "../../../../widgets/Row";
import Keyboard, {BACKSPACE, DELETE, LEFT, RIGHT} from "../Keyboard";

const {Map} = require('immutable');

export default class TextInput extends Component {
    constructor(props) {
        super(props);
    }

    onKeyDown(data){
        if(this.props.onChar) {
            if (data.key === "ArrowLeft") {
                this.props.onChar(LEFT);
            } else if (data.key === "ArrowRight") {
                this.props.onChar(RIGHT);
            }
        }
    }

    onChar(char, evt) {
        if(this.props.onChar) {
            if(char && !evt){
                this.props.onChar(char);
            }else {
                switch (evt.inputType) {
                    case "deleteContentBackward":
                        this.props.onChar(BACKSPACE);
                        break;
                    case "deleteContentForward":
                        this.props.onChar(DELETE);
                        break;
                    default:
                        if (char) {
                            this.props.onChar(char);
                        }
                        break;
                }
            }
        }
    }

    updateCaret() {
        if(this.props.onSetCaret) {
            let input = global.$("#" + this.props.id)[0];
            this.props.onSetCaret(input.selectionStart);
        }
    }

    render() {
        const text = this.props.text;
        const placeholder = this.props.placeholder;
        const disabled = this.props.disabled;

        return (
            <Row>
                <Column>
                    <Row>
                        <Column>
                            <input
                                id={this.props.id}
                                className="form-control"
                                placeholder={placeholder}
                                type="text"
                                disabled={disabled}
                                value={text || ""}
                                onMouseUp={() => this.updateCaret()}
                                onKeyDown={data => this.onKeyDown(data)}
                                onChange={data => this.onChar(data.nativeEvent.data, data.nativeEvent)}/>
                        </Column>
                    </Row>
                    <Row topSpaced>
                        <Column>
                            <Keyboard
                                disabled={disabled}
                                onCharAction={this.onChar.bind(this)}/>
                        </Column>
                    </Row>
                </Column>
            </Row>);
    }

}