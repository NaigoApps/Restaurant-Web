import React, {Component} from 'react';
import $ from 'jquery';
import GraphWizardPage from "./GraphWizardPage";
import {uuid} from "../../../../utils/Utils";
import {BACKSPACE} from "../../inputs/Keyboard";
import Keyboard from "../../inputs/Keyboard";
import graphWizardActions from "../GraphWizardActions";

export default class IntegerInputGraphWizardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: "integr_input_" + uuid(),
            text: props.default ? props.default(props.wizardData).toString() : "",
            hasChanged: false
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            text: props.default ? props.default(props.wizardData).toString() : "",
            hasChanged: false
        });
    }

    componentDidMount() {
        let input = $("#" + this.state.uuid);
        input[0].setSelectionRange(this.state.text.length, this.state.text.length);
    }

    isNumber(number) {
        return !isNaN(parseInt(number)) && parseInt(number).toString() === number;
    }

    onChar(char) {
        let input = $("#" + this.state.uuid)[0];
        let pos = input.selectionStart;
        let newText;
        switch (char) {
            case BACKSPACE:
                if (pos > 0) {
                    this.setState(prevState => {
                        newText = prevState.text.slice(0, pos - 1) + prevState.text.slice(pos);
                        if (this.isNumber(newText)) {
                            let wData = this.props.wizardData;
                            wData.pending.quantity = parseInt(newText);
                            graphWizardActions.setWizardData(wData);
                            return {
                                text: newText
                            };
                        } else {
                            return {
                                text: prevState.text
                            };
                        }
                    });
                    input.focus();
                    setTimeout(() => {
                        input.setSelectionRange(Math.max(0, pos - 1), Math.max(0, pos - 1));
                    }, 0);
                }
                break;
            default:
                this.setState(prevState => {
                    newText = prevState.text.substr(0, pos) + char + prevState.text.substr(pos, prevState.text.length);
                    if (this.isNumber(newText)) {
                        let wData = this.props.wizardData;
                        wData.pending.quantity = parseInt(newText);
                        graphWizardActions.setWizardData(wData);
                        return {
                            text: newText
                        };
                    } else {
                        return {
                            text: prevState.text
                        };
                    }
                });
                input.focus();
                setTimeout(() => {
                    input.setSelectionRange(pos + 1, pos + 1);
                }, 0);
                break;
        }
    }

    onChange(evt) {
        this.setState({
            text: evt.target.value
        });
        if (this.isNumber(evt.target.value)) {
            let wData = this.props.wizardData;
            wData.pending.quantity = parseInt(evt.target.value);
            graphWizardActions.setWizardData(wData);
        }
    }

    onLeft() {
        let input = $("#" + this.state.uuid);
        let pos = input[0].selectionStart;
        pos = Math.max(pos - 1, 0);
        input.focus();
        input[0].setSelectionRange(pos, pos);
    }

    onRight() {
        let input = $("#" + this.state.uuid);
        let pos = input[0].selectionStart;
        pos = Math.min(pos + 1, this.state.text.length);
        input.focus();
    }

    render() {
        const placeholder = this.props.placeholder;
        const text = this.state.text;

        return (
            <GraphWizardPage>
                <div className="row">
                    <div className="col-sm-12">
                        <input
                            id={this.state.uuid}
                            className="form-control"
                            placeholder={placeholder}
                            type="text"
                            value={text || ""}
                            onChange={this.onChange.bind(this)}/>
                    </div>
                </div>
                <div className="row top-sep">
                    <div className="col-sm-12">
                        <Keyboard onCharAction={this.onChar.bind(this)}/>
                    </div>
                </div>
            </GraphWizardPage>
        )
    }

}