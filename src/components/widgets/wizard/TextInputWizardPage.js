import React, {Component} from 'react';
import WizardPage from "./WizardPage";
import Keyboard, {BACKSPACE, LEFT, RIGHT} from "../inputs/Keyboard";
import {uuid} from "../../../utils/Utils";
import $ from 'jquery';

export default class TextInputWizardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: "text_input_" + uuid(),
            text: props.default || "",
            hasChanged: false
        }
    }

    componentWillReceiveProps(props){
        this.setState({
            text: props.default || "",
            hasChanged: false
        });
    }

    componentDidMount() {
        let input = $("#" + this.state.uuid);
        input[0].setSelectionRange(this.state.text.length, this.state.text.length);
    }

    onChar(char) {
        let input = $("#" + this.state.uuid)[0];
        let pos = input.selectionStart;
        switch (char) {
            case BACKSPACE:
                if (pos > 0) {
                    this.setState(prevState => {
                        return {
                            text: prevState.text.slice(0, pos - 1) + prevState.text.slice(pos),
                            hasChanged: true
                        };
                    });
                    input.focus();
                    setTimeout(() => {
                        input.setSelectionRange(Math.max(0, pos - 1), Math.max(0, pos - 1));
                    }, 0);
                }
                break;
            case LEFT:
                this.onLeft();
                break;
            case RIGHT:
                this.onRight();
                break;
            default:
                this.setState(prevState => {
                    return {
                        text: prevState.text.substr(0, pos) + char + prevState.text.substr(pos, prevState.text.length),
                        hasChanged: true
                    };
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
            text: evt.target.value,
            hasChanged: true
        })
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
        input[0].setSelectionRange(pos, pos);
    }

    render() {
        const placeholder = this.props.placeholder;
        const text = this.state.text;

        return (
            <WizardPage
                pageData={text}
                goBackAction={this.props.goBackAction}
                goOnAction={this.props.goOnAction}
                abortAction={this.props.abortAction}
                confirmAction={this.props.confirmAction}
                valid={true}>
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
            </WizardPage>
        )
    }

}