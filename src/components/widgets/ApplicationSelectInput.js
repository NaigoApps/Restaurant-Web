import React, {Component} from 'react';
import PopupContainer from "./PopupContainer";
import {ApplicationActions} from "../../actions/ApplicationActions";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import Button from "../../widgets/Button";
import SelectInput from "./inputs/SelectInput";

export default class ApplicationSelectInput extends Component {
    constructor(props) {
        super(props);
    }

    confirmSelectValue(){
        let data = this.props.data;
        let callback = data.get('callback');
        if(callback) {
            callback(data.get('value'));
        }
        ApplicationActions.hideSelectInput();
    }

    render() {
        let data = this.props.data;
        //FIXME provide ID, RENDERER, CALLBACK functions
        return <PopupContainer visible={data.get('visible')}>
            <Row>
                <Column>
                    {data.get('label')}
                    <SelectInput
                        rows={data.get('rows')}
                        cols={data.get('cols')}
                        page={data.get('page')}
                        id={data.get('id')}
                        selected={data.get('value')}
                        options={data.get('values')}
                        renderer={data.get('renderer')}
                        colorRenderer={data.get('colorRenderer')}

                        onSelect={option => ApplicationActions.selectInputChange(option)}
                        onDeselect={option => ApplicationActions.selectInputChange(null)}
                        onSelectPage={index => ApplicationActions.selectInputPageChange(index)}
                    />
                </Column>
            </Row>
            <Row topSpaced>
                <Column>
                    <Button icon="check" type="success" commitAction={() => this.confirmSelectValue()}/>
                </Column>
                <Column>
                    <Button icon="times" type="danger" commitAction={() => ApplicationActions.hideSelectInput()}/>
                </Column>
            </Row>
        </PopupContainer>;
    }
}