import React, {Component} from 'react';
import PopupContainer from "./PopupContainer";
import FloatInput from "./inputs/float/FloatInput";
import {ApplicationActions} from "../../actions/ApplicationActions";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import Button from "../../widgets/Button";

export default class ApplicationFloatInput extends Component {
    constructor(props) {
        super(props);
    }

    confirmFloatValue(){
        let data = this.props;
        let callback = data.callback;
        if(callback) {
            callback(data.value);
        }
        ApplicationActions.hideFloatInput();
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
            id="app-float-input"
            blurCallback={() => ApplicationActions.hideFloatInput()}
            visible={data.visible}>
            <Row>
                <Column>
                    {data.label}
                    <FloatInput
                        text={data.text}
                        onChange={text => ApplicationActions.floatInputChange(text)}
                        onChar={char => ApplicationActions.floatInputChar(char)}
                    />
                </Column>
            </Row>
            <Row topSpaced>
                <Column>
                    <Button
                        icon="check"
                        type="success"
                        disabled={!this.isValid()}
                        commitAction={() => this.confirmFloatValue()}
                    />
                </Column>
                <Column>
                    <Button icon="times" type="danger" commitAction={() => ApplicationActions.hideFloatInput()}/>
                </Column>
            </Row>
        </PopupContainer>;
    }
}