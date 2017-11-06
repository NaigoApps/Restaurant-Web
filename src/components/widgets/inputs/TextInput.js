import React, {Component} from 'react';
import {uuid} from "../../../utils/Utils";
import Keyboard, {BACKSPACE} from "./Keyboard";
import $ from 'jquery';

export default class TextInput extends Component {
    constructor(props) {
        super(props);
        this.state = this.resetState(props)
    }

    componentWillReceiveProps(props) {
        this.setState(this.resetState(props));
    }

    setCaretToStart() {
        this.setCaretPosition(0);
    }

    setCaretToEnd() {
        this.setCaretPosition(this.state.text.length);
    }

    setCaretPosition(pos) {
        let input = $("#" + this.state.uuid);
        input.focus();
        input[0].setSelectionRange(pos, pos);
    }

    resetState(props) {
        return {
            uuid: "text_input_" + uuid(),
            text: props.default || "",
            caret: props.default ? props.default.length : 0,
            hasChanged: false
        }
    }

    textChange(event) {
        this.setState({
            text: event.target.value,
            hasChanged: true
        });
    }

    commitChange() {
        if (this.state.hasChanged) {
            this.setState({
                hasChanged: false
            });
            if (this.props.commitAction) {
                this.props.commitAction(this.state.text);
            }
        }
    }

    enabledState() {
        return (!this.props.isDisabled || !this.props.isDisabled());
    }

    onChar(char) {
        let pos = this.state.caret;
        switch (char) {
            case BACKSPACE:
                this.setState(prevState => {
                    return {
                        text: prevState.text.slice(0, this.state.caret - 1) + prevState.text.slice(pos),
                        hasChanged: true
                    };
                });
                break;
            default:
                this.setState(prevState => {
                    return {
                        text: prevState.text.substr(0, pos) + char + prevState.text.substr(pos, prevState.text.length),
                        hasChanged: true
                    };
                });
                break;
        }
    }

    render() {
        const label = this.props.label;
        const placeholder = this.props.placeholder;
        const text = this.state.text;

        return (
            <div>
                <div className="row">
                    <input className="form-control" placeholder={placeholder} type="text" value={text || ""}/>
                </div>
                <div className="row">
                    <Keyboard onCharAction={this.onChar.bind(this)}
                              commitAction={this.commitChange.bind(this)}/>
                </div>
            </div>);
    }

}