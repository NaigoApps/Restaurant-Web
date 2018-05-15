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

    canConfirm() {
        let data = this.props.data;
        return data.get('isValid') === undefined || data.get('isValid')(data.get('value'));
    }

    confirmSelectValue() {
        let data = this.props.data;
        let callback = data.get('callback');
        if (callback) {
            callback(data.get('value'));
        }
        ApplicationActions.hideSelectInput();
    }

    render() {
        let data = this.props.data;
        return <PopupContainer
            id="app-select-input"
            visible={data.get('visible')}
            blurCallback={() => ApplicationActions.hideSelectInput()}>
            <Row>
                <Column>
                    <Row>
                        <Column>
                            <h5>{data.get('label')}</h5>
                        </Column>
                    </Row>
                    <Row ofList>
                        <Column>
                            <SelectInput
                                rows={data.get('rows')}
                                cols={data.get('cols')}
                                page={data.get('page')}
                                id={data.get('id')}
                                multiSelect={data.get('multiSelect')}
                                selected={data.get('value')}
                                options={data.get('values')}
                                renderer={data.get('renderer')}
                                colorRenderer={data.get('colorRenderer')}

                                onSelect={option => ApplicationActions.selectInputSelect(option)}
                                onDeselect={(option) => ApplicationActions.selectInputDeselect(option)}
                                onSelectPage={index => ApplicationActions.selectInputPageChange(index)}
                            />
                        </Column>
                    </Row>
                </Column>
            </Row>
            <Row topSpaced>
                <Column>
                    <Button
                        icon="check"
                        type="success"
                        disabled={!this.canConfirm()}
                        commitAction={() => this.confirmSelectValue()}
                    />
                </Column>
                <Column>
                    <Button
                        icon="times"
                        type="danger"
                        commitAction={() => ApplicationActions.hideSelectInput()}/>
                </Column>
            </Row>
        </PopupContainer>;
    }
}