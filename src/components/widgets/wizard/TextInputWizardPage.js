import React, {Component} from 'react';
import Keyboard, {BACKSPACE, LEFT, RIGHT} from "../inputs/Keyboard";
import {uuid} from "../../../utils/Utils";
import $ from 'jquery';
import graphWizardActions from "./GraphWizardActions";
import GraphWizardPage from "./graph/GraphWizardPage";

export default class TextInputWizardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: "text_input_" + uuid()
        }
    }

    getPageData(){
        return this.props.wizardData[this.props.identifier];
    }
    
    componentDidMount() {
        let input = $("#" + this.state.uuid);
        input[0].setSelectionRange(this.getPageData().length, this.getPageData().length);
    }

    onChar(char) {
        let text = this.getPageData();
        let input = $("#" + this.state.uuid)[0];
        let pos = input.selectionStart;
        switch (char) {
            case BACKSPACE:
                if (pos > 0) {
                    graphWizardActions.setWizardData(this.props.wizardId, text.slice(0, pos - 1) + text.slice(pos), this.props.identifier);
                    input.focus();
                }
                break;
            case LEFT:
                this.onLeft();
                break;
            case RIGHT:
                this.onRight();
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
        pos = Math.min(pos + 1, this.getPageData().length);
        input.focus();
        input[0].setSelectionRange(pos, pos);
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
                        <Keyboard onCharAction={this.onChar.bind(this)}/>
                    </div>
                </div>
            </GraphWizardPage>
        )
    }

}