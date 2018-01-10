import React, {Component} from 'react';
import {uuid} from "../../../utils/Utils";
import $ from 'jquery';
import {CANC} from "../KeyPad";
import KeyPad from "../KeyPad";

/**
 * Expects:
 * - name: label caption
 * - changeAction: action to throw on change
 */

export default class FloatInput extends Component {
    constructor(props) {
        super(props);
        this.state = this.resetState(props)
    }

    resetState(props) {
        return {
            uuid: "float-input-" + uuid(),
            text: props.default.toString() || "0"
        }
    }

    componentWillReceiveProps(props){
        this.setState({
            text: props.default.toString() || "0"
        });
    }

    static isNumber(text) {
        return !isNaN(parseFloat(text));
    }

    onChange(event) {
        this.setState({
            text: event.target.value
        });
        this.mayCommitChange(event.target.value);
    }

    mayCommitChange(text) {
        if (FloatInput.isNumber(text) && this.props.commitAction) {
            this.props.commitAction(parseFloat(text));
        }
    }

    onChar(char) {
        let text = this.state.text;
        switch (char) {
            case CANC:
                text = "0";
                break;
            default:
                if(text === "0"){
                    text = char;
                }else {
                    text += char;
                }
                break;
        }

        this.mayCommitChange(text);
        this.setState({
            text: text
        });
    }

    render() {
        const text = this.state.text;
        const placeholder = this.props.placeholder;
        const disabled = this.props.disabled;

        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <input
                                id={this.state.uuid}
                                className="form-control"
                                placeholder={placeholder}
                                type="text"
                                disabled={disabled}
                                value={text || ""}
                                onChange={this.onChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="row top-sep">
                        <div className="col-sm-12">
                            <KeyPad
                                disabled={disabled}
                                onCharAction={this.onChar.bind(this)}/>
                        </div>
                    </div>
                </div>
            </div>);
    }

}