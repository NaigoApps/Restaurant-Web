import React, {Component} from 'react';
import $ from 'jquery';
import {CANC} from "../../KeyPad";
import graphWizardActions from "./GraphWizardActions";
import KeyPad from "../../KeyPad";
import GraphWizardPage from "./GraphWizardPage";
import {uuid} from "../../../../utils/Utils";
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";

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
        graphWizardActions.setWizardData(this.props.wizardId, this.props.uuid, evt.target.value, this.props.identifier);
    }

    render() {
        const placeholder = this.props.placeholder;
        const text = this.getPageData();

        return (
            <GraphWizardPage>
                <Row>
                    <Column>
                        <input
                            id={this.state.uuid}
                            className="form-control"
                            placeholder={placeholder}
                            type="text"
                            value={text || ""}
                            onChange={this.onChange.bind(this)}/>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <KeyPad onCharAction={this.onChar.bind(this)}/>
                    </Column>
                </Row>
            </GraphWizardPage>
        )
    }

}