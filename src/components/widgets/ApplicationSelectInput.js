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
        let data = this.props;
        return data.isValid === undefined || data.isValid(data.value);
    }

    confirmSelectValue() {
        let data = this.props;
        let callback = data.callback;
        if (callback) {
            callback(data.value);
        }
        ApplicationActions.hideSelectInput();
    }

    render() {
        let data = this.props;
        return <PopupContainer
            id="app-select-input"
            visible={data.visible}
            blurCallback={() => ApplicationActions.hideSelectInput()}
            size="sm">
            <Row>
                <Column>
                    <Row>
                        <Column>
                            <h5>{data.label}</h5>
                        </Column>
                    </Row>
                    <Row ofList>
                        <Column>
                            <SelectInput
                                rows={data.rows}
                                cols={data.cols}
                                page={data.page}
                                id={data.id}
                                multiSelect={data.multiSelect}
                                selected={data.value}
                                options={data.values}
                                renderer={data.renderer}
                                color={data.color}
                                colorRenderer={data.colorRenderer}

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