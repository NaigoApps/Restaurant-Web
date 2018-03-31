import React, {Component} from 'react';
import {uuid} from "../../../utils/Utils";
import $ from 'jquery';
import KeyPad, {CANC} from "../KeyPad";
import GraphWizardPage from "./graph-wizard/GraphWizardPage";
import graphWizardActions from "./graph-wizard/GraphWizardActions";

export default class FloatInputWizardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: "float_input_" + uuid()
        }
    }

    componentDidMount() {
        let input = $("#" + this.state.uuid);
        input[0].setSelectionRange(this.getPageData().length, this.getPageData().length);
    }
    
    getPageData(){
        return this.props.wizardData[this.props.identifier];
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
                    graphWizardActions.setWizardData(this.props.wizardId, "", this.props.identifier);
                    input.focus();
                }
                break;
            default:
                graphWizardActions.setWizardData(this.props.wizardId, text.substr(0, pos) + char + text.substr(pos, text.length), this.props.identifier);
                input.focus();
                break;
        }
    }

    onChange(evt) {
        graphWizardActions.setWizardData(this.props.wizardId, evt.target.value, this.props.identifier);
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