import React, {Component} from 'react';
import IntKeyPad from "../IntKeyPad";
import Column from "../../../widgets/Column";
import Row from "../../../widgets/Row";

const {Map} = require('immutable');

export default class IntegerInput extends Component {
    constructor(props) {
        super(props);
    }

    onChar(char) {
        if(this.props.onChar) {
            this.props.onChar(char);
        }
    }

    onChange(evt) {
        if(this.props.onChange) {
            this.props.onChange(evt.target.value);
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
                                id={this.props.uuid}
                                className="form-control"
                                placeholder={placeholder}
                                type="text"
                                disabled={disabled}
                                value={text || ""}
                                onChange={data => this.onChange(data)}/>
                        </Column>
                    </Row>
                    <Row topSpaced>
                        <Column>
                            <IntKeyPad
                                disabled={disabled}
                                onCharAction={this.onChar.bind(this)}/>
                        </Column>
                    </Row>
                </Column>
            </Row>);
    }

}