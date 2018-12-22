import React, {Component} from 'react';
import PopupContainer from "./PopupContainer";
import {ApplicationActions} from "../../actions/ApplicationActions";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import Button from "../../widgets/Button";
import IntegerInput from "./inputs/IntegerInput";
import PercentInput from "./inputs/PercentInput";

export default class ApplicationPercentInput extends Component {
    constructor(props) {
        super(props);
    }

    confirmPercentValue() {
        let data = this.props;
        let callback = data.callback;
        if (callback) {
            callback(data.value);
        }
        ApplicationActions.hidePercentInput();
    }

    render() {
        let data = this.props;
        return <PopupContainer
            id="app-perc-input"
            visible={data.visible}
            blurCallback={() => ApplicationActions.hidePercentInput()}>
            <Row>
                <Column>
                    {data.label}
                    <PercentInput
                        text={data.text}
                        onChange={text => ApplicationActions.percentInputChange(text)}
                        onChar={char => ApplicationActions.percentInputChar(char)}
                    />
                </Column>
            </Row>
            <Row topSpaced>
                <Column>
                    <Button icon="check"
                            type="success"
                            commitAction={() => this.confirmPercentValue()}/>
                </Column>
                <Column>
                    <Button icon="times" type="danger" commitAction={() => ApplicationActions.hidePercentInput()}/>
                </Column>
            </Row>
        </PopupContainer>;
    }
}