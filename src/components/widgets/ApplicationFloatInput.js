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
        let data = this.props.data;
        let callback = data.get('callback');
        if(callback) {
            callback(data.get('value'));
        }
        ApplicationActions.hideFloatInput();
    }

    render() {
        let data = this.props.data;
        return <PopupContainer visible={data.get('visible')}>
            <Row>
                <Column>
                    {data.get('label')}
                    <FloatInput
                        text={data.get('text')}
                        onChange={text => ApplicationActions.floatInputChange(text)}
                        onChar={char => ApplicationActions.floatInputChar(char)}
                    />
                </Column>
            </Row>
            <Row topSpaced>
                <Column>
                    <Button icon="check" type="success" commitAction={() => this.confirmFloatValue()}/>
                </Column>
                <Column>
                    <Button icon="times" type="danger" commitAction={() => ApplicationActions.hideFloatInput()}/>
                </Column>
            </Row>
        </PopupContainer>;
    }
}