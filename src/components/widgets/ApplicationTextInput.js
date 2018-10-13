import React, {Component} from 'react';
import PopupContainer from "./PopupContainer";
import {ApplicationActions} from "../../actions/ApplicationActions";
import TextInput from "./inputs/text/TextInput";
import Column from "../../widgets/Column";
import Row from "../../widgets/Row";
import Button from "../../widgets/Button";

export default class ApplicationTextInput extends Component {
    constructor(props) {
        super(props);
    }

    confirmTextValue() {
        let data = this.props;
        let callback = data.callback;
        if (callback) {
            callback(data.value);
        }
        ApplicationActions.hideTextInput();
    }

    isValid() {
        let data = this.props;
        let value = data.value;
        return !data.checker || data.checker(value);
    }

    componentDidUpdate() {
        if (this.props.visible) {
            let textInput = global.$('#app-text-input');
            setTimeout(() => {
                textInput[0].setSelectionRange(this.props.caret, this.props.caret);
                textInput[0].focus();
            }, 100);
        }
    }

    render() {
        let data = this.props;
        return <PopupContainer
            id="app-text-input"
            visible={data.visible}
            blurCallback={() => ApplicationActions.hideTextInput()}>
            <Row>
                <Column>
                    {data.label}
                    <TextInput
                        id="app-text-input"
                        text={data.value}
                        onSetCaret={caret => ApplicationActions.textInputCaret(caret)}
                        onChar={char => ApplicationActions.textInputChar(char)}
                    />
                </Column>
            </Row>
            <Row topSpaced>
                <Column>
                    <Button icon="check"
                            type="success"
                            disabled={!this.isValid()}
                            commitAction={() => this.confirmTextValue()}/>
                </Column>
                <Column>
                    <Button icon="times" type="danger" commitAction={() => ApplicationActions.hideTextInput()}/>
                </Column>
            </Row>
        </PopupContainer>;
    }
}