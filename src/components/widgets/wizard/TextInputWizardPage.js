import React, {Component} from 'react';
import Keyboard, {ALT, BACKSPACE, CTRL, DELETE, LEFT, LOCK, META, RIGHT, SHIFT} from "../inputs/Keyboard";
import {uuid} from "../../../utils/Utils";
import $ from 'jquery';
import graphWizardActions from "./graph-wizard/GraphWizardActions";
import GraphWizardPage from "./graph-wizard/GraphWizardPage";

export default class TextInputWizardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: "text_input_" + uuid(),
            position: 0
        }
    }

    getPageData() {
        return this.props.wizardData[this.props.identifier];
    }

    componentDidMount() {
        this.setState({
            position: this.getPageData().length
        });
    }

    componentDidUpdate() {
        let input = $("#" + this.state.uuid)[0];
        input.focus();
        input.setSelectionRange(this.state.position, this.state.position);
    }

    onChar(char, evt) {
        console.log(char);
        let text = this.getPageData();
        let pos = this.state.position;
        switch (char.toUpperCase()) {
            case BACKSPACE:
                if (pos > 0) {
                    graphWizardActions.setWizardData(this.props.wizardId, text.slice(0, pos - 1) + text.slice(pos), this.props.identifier);
                    this.setState({
                        position: pos - 1
                    });
                }
                break;
            case DELETE:
                if (pos < this.getPageData().length) {
                    graphWizardActions.setWizardData(this.props.wizardId, text.slice(0, pos) + text.slice(pos + 1), this.props.identifier);
                    this.setState({
                        position: pos
                    });
                }
                break;
            case LEFT:
                this.onLeft();
                break;
            case RIGHT:
                this.onRight();
                break;
            case SHIFT:
            case CTRL:
            case META:
            case ALT:
            case LOCK:
                break;
            default:
                if (char.length === 1) {
                    graphWizardActions.setWizardData(this.props.wizardId, text.substr(0, pos) + char + text.substr(pos, text.length), this.props.identifier);
                    this.setState({
                        position: pos + 1
                    });
                }
                break;
        }
        if (evt && evt.preventDefault) {
            evt.preventDefault();
        }
    }

    updateCaret() {
        let input = $("#" + this.state.uuid)[0];
        this.setState({
            position: input.selectionStart
        });
    }

    // onChange(evt) {
    //     let oldText = this.getPageData();
    //     let newText = evt.target.value;
    //     graphWizardActions.setWizardData(this.props.wizardId, newText, this.props.identifier);
    // }

    onLeft() {
        let pos = this.state.position;
        pos = Math.max(pos - 1, 0);
        this.setState({
            position: pos
        });
    }

    onRight() {
        let pos = this.state.position;
        pos = Math.min(pos + 1, this.getPageData().length);
        this.setState({
            position: pos
        })
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
                            onMouseUp={this.updateCaret.bind(this)}
                            onKeyDown={data => this.onChar(data.key, data)}
                        />
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