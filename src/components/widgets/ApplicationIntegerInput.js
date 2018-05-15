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
        let data = this.props.data;
        let callback = data.get('callback');
        if (callback) {
            callback(data.get('value'));
        }
        ApplicationActions.hideIntegerInput();
    }

    isValid() {
        let data = this.props.data;
        let value = data.get('value');
        let min = data.get('min');
        let max = data.get('max');
        return (min === undefined || min <= value) && (max === undefined || value <= max);
    }

    render() {
        let data = this.props.data;
        return <PopupContainer
            id="app-int-input"
            visible={data.get('visible')}
            blurCallback={() => ApplicationActions.hideIntegerInput()}>
            <Row>
                <Column>
                    {data.get('label')}
                    <IntegerInput
                        text={data.get('text')}
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