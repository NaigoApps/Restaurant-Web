import React, {Component} from 'react';
import $ from 'jquery';
import {CANC} from "../../KeyPad";
import graphWizardActions from "../GraphWizardActions";
import KeyPad from "../../KeyPad";
import GraphWizardPage from "./GraphWizardPage";
import {uuid} from "../../../../utils/Utils";

export default class IntegerInputWizardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: "integer_input_" + uuid()
        }
    }

    getPageData(){
        let number = this.props.wizardData[this.props.identifier];
        if(typeof number === "number"){
            return number.toString();
        }
        return number;
    }

    componentDidMount() {
        let input = $("#" + this.state.uuid);
        input[0].setSelectionRange(this.getPageData().length, this.getPageData().length);
    }

    isNumber() {
        return !isNaN(parseFloat(this.getPageData().length));
    }

    onChar(char) {
        let text = this.getPageData();
        let input = $("#" + this.state.uuid)[0];
        let pos = input.selectionStart;
        switch (char) {
            case CANC:
                if (pos > 0) {
                    graphWizardActions.setWizardData("", this.props.identifier);
                    input.focus();
                }
                break;
            default:
                graphWizardActions.setWizardData(text.substr(0, pos) + char + text.substr(pos, text.length), this.props.identifier);
                input.focus();
                break;
        }
    }

    onChange(evt) {
        graphWizardActions.setWizardData(evt.target.value, this.props.identifier);
    }

    render() {
        const placeholder = this.props.placeholder;
        const text = this.getPageData();

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
                        <KeyPad onCharAction={this.onChar.bind(this)}/>
                    </div>
                </div>
            </GraphWizardPage>
        )
    }

}