import React, {Component} from 'react';
import {uuid} from "../../../utils/Utils";
import $ from 'jquery';
import {CANC} from "../KeyPad";
import KeyPad from "../KeyPad";
import IntKeyPad from "../IntKeyPad";

/**
 * Expects:
 * - name: label caption
 * - changeAction: action to throw on change
 */

export default class PercentInput extends Component {
    constructor(props) {
        super(props);
        this.state = this.resetState(props)
    }

    resetState(props) {
        return {
            uuid: "perc-input-" + uuid(),
            text: props.default && props.default.toString() ? props.default.toString() : "0"
        }
    }

    componentWillReceiveProps(props){
        this.setState({
            text: props.default && props.default.toString() ? props.default.toString() : "0"
        });
    }

    static isPercent(text) {
        return !isNaN(parseInt(text)) && parseInt(text) <= 100;
    }

    onChange(event) {
        if(PercentInput.isPercent(event.target.value)) {
            this.setState({
                text: event.target.value
            });
            this.mayCommitChange(event.target.value);
        }
    }

    mayCommitChange(text) {
        if (PercentInput.isPercent(text) && this.props.commitAction) {
            this.props.commitAction(parseInt(text));
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

        if(PercentInput.isPercent(text)) {
            this.mayCommitChange(text);
            this.setState({
                text: text
            });
        }
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
                                value={text ? text + "%" : ""}
                                onChange={this.onChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="row top-sep">
                        <div className="col-sm-12">
                            <IntKeyPad
                                disabled={disabled}
                                onCharAction={this.onChar.bind(this)}/>
                        </div>
                    </div>
                </div>
            </div>);
    }

}