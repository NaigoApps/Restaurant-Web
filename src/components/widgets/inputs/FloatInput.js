import React, {Component} from 'react';
import Keyboard, {BACKSPACE} from "./Keyboard";
import {uuid} from "../../../utils/Utils";
import $ from 'jquery';

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

    componentWillReceiveProps(props) {
        this.setState(this.resetState(props));
    }

    resetState(props) {
        return {
            uuid: "float_input_" + uuid(),
            number: props.default || 0.0,
            hasChanged: false
        }
    }

    numberChange(event) {
        this.setState({
            number: event.target.value,
            hasChanged: true
        });
    }

    commitChange() {
        if (this.state.hasChanged) {
            if (this.props.commitAction) {
                this.props.commitAction(this.state.number);
            }
            this.setState({
                hasChanged: false
            });
        }
    }

    onChar(char) {
        switch (char) {
            case BACKSPACE:
                this.setState(prevState => {
                    return {
                        number: parseInt(prevState.number.toString().slice(0, -1) || "0"),
                        hasChanged: true
                    };
                });
                break;
            default:
                this.setState(prevState => {
                    return {
                        number: parseInt(prevState.number.toString() + char),
                        hasChanged: true
                    };
                });
                break;
        }
    }

    showKeyboard() {
        $("#" + this.state.uuid).modal("show");
        $("#" + this.state.uuid).on("hide.bs.modal", this.commitChange.bind(this));
    }

    render() {
        const label = this.props.label;
        const number = this.state.number;
        const placeholder = this.props.placeholder;

        return (
            <div>
                <div className="input-group">
                    <span className="input-group-addon">{this.props.unit || ""}</span>
                    <input
                        className="form-control"
                        placeholder={placeholder}
                        type="number" value={number || "0"}
                        onChange={this.numberChange.bind(this)}
                        onBlur={this.commitChange.bind(this)}/>
                    <span className="input-group-btn">
                    <button type="button" className="btn btn-primary" onClick={this.showKeyboard.bind(this)}>
                        <span className="glyphicon glyphicon-menu-down"/>
                    </button>
                </span>
                </div>
                <div className="modal fade" id={this.state.uuid}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="input-group">
                                    <span className="input-group-addon">{this.props.unit || ""}</span>
                                    <input
                                        className="form-control"
                                        placeholder={placeholder}
                                        type="number" value={number || "0"}
                                        readOnly={true}/>
                                </div>
                            </div>
                            <div className="modal-body">
                                <Keyboard onCharAction={this.onChar.bind(this)}
                                          commitAction={this.commitChange.bind(this)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }

}