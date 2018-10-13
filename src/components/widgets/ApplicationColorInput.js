import React, {Component} from 'react';
import PopupContainer from "./PopupContainer";
import {ApplicationActions} from "../../actions/ApplicationActions";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import Button from "../../widgets/Button";
import ColorInput from "./inputs/ColorInput";

export default class ApplicationColorInput extends Component {
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
        ApplicationActions.hideColorInput();
    }

    render() {
        let data = this.props;
        return <PopupContainer
            id="app-color-input"
            visible={data.visible}
            blurCallback={() => ApplicationActions.hideColorInput()}>
            <Row>
                <Column>
                    <Row>
                        <Column>
                            <h5>{data.label}</h5>
                        </Column>
                    </Row>
                    <Row ofList>
                        <Column>
                            <ColorInput
                                rows={data.rows}
                                cols={data.cols}
                                page={data.page}
                                selected={data.value}
                                options={data.values}

                                onSelect={option => ApplicationActions.colorInputSelect(option)}
                                onDeselect={(option) => ApplicationActions.colorInputDeselect(option)}
                                onSelectPage={index => ApplicationActions.colorInputPageChange(index)}
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
                        commitAction={() => ApplicationActions.hideColorInput()}/>
                </Column>
            </Row>
        </PopupContainer>;
    }
}