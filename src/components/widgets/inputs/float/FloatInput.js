import React, {Component} from 'react';
import KeyPad from "../../KeyPad";
import Column from "../../../../widgets/Column";
import Row from "../../../../widgets/Row";

const {Map} = require('immutable');

export default class FloatInput extends Component {
    constructor(props) {
        super(props);
    }

    onChange(evt){
        if(this.props.onChange){
            this.props.onChange(evt.target.value);
        }
    }

    onChar(char) {
        if(this.props.onChar) {
            this.props.onChar(char);
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
                                className="form-control"
                                placeholder={placeholder}
                                type="text"
                                disabled={disabled}
                                value={text || ""}
                                onChange={evt => this.onChange(evt)}/>
                        </Column>
                    </Row>
                    <Row justify="center" topSpaced>
                        <Column auto>
                            <KeyPad
                                disabled={disabled}
                                onCharAction={this.onChar.bind(this)}/>
                        </Column>
                    </Row>
                </Column>
            </Row>);
    }

}