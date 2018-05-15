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
        let data = this.props.data;
        let callback = data.get('callback');
        if (callback) {
            callback(data.get('value'));
        }
        ApplicationActions.hideTextInput();
    }

    isValid() {
        let data = this.props.data;
        let value = data.get('value');
        return !data.get('checker') || data.get('checker')(value);
    }

    componentDidUpdate() {
        if (this.props.data.get('visible')) {
            let textInput = global.$('#app-text-input');
            setTimeout(() => {
                textInput[0].setSelectionRange(this.props.data.get('caret'), this.props.data.get('caret'));
                textInput[0].focus();
            }, 100);
        }
    }

    render() {
        let data = this.props.data;
        return <PopupContainer
            id="app-text-input"
            visible={data.get('visible')}
            blurCallback={() => ApplicationActions.hideIntegerInput()}>
            <Row>
                <Column>
                    {data.get('label')}
                    <TextInput
                        id="app-text-input"
                        text={data.get('value')}
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