import React, {Component} from 'react';
import PopupContainer from "./PopupContainer";
import {ApplicationActions} from "../../actions/ApplicationActions";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import Button from "../../widgets/Button";
import IntegerInput from "./inputs/IntegerInput";

export default class ApplicationIntegerInput extends Component {
    constructor(props) {
        super(props);
    }

    confirmIntegerValue() {
        let data = this.props;
        let callback = data.callback;
        if (callback) {
            callback(data.value);
        }
        ApplicationActions.hideIntegerInput();
    }

    isValid() {
        let data = this.props;
        let value = data.value;
        let min = data.min;
        let max = data.max;
        return (min === undefined || min <= value) && (max === undefined || value <= max);
    }

    render() {
        let data = this.props;
        return <PopupContainer
            id="app-int-input"
            visible={data.visible}
            blurCallback={() => ApplicationActions.hideIntegerInput()}>
            <Row>
                <Column>
                    {data.label}
                    <IntegerInput
                        text={data.text}
                        onChange={text => ApplicationActions.integerInputChange(text)}
                        onChar={char => ApplicationActions.integerInputChar(char)}
                    />
                </Column>
            </Row>
            <Row topSpaced>
                <Column>
                    <Button icon="check"
                            type="success"
                            disabled={!this.isValid()}
                            commitAction={() => this.confirmIntegerValue()}/>
                </Column>
                <Column>
                    <Button icon="times" type="danger" commitAction={() => ApplicationActions.hideIntegerInput()}/>
                </Column>
            </Row>
        </PopupContainer>;
    }
}