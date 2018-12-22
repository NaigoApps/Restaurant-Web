import React, {Component} from 'react';
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import Button from "../../../../widgets/Button";
import {ApplicationActions} from "../../../../actions/ApplicationActions";
import OrdinationsUtils from "../../../../pages/eveningEditing/OrdinationsUtils";
import RoundButton from "../../../../widgets/RoundButton";

export default class FloatEditor extends Component {
    constructor(props) {
        super(props);
    }

    activateEditor(options){
        if(this.props.onClick){
            this.props.onClick();
        }
        ApplicationActions.showFloatInput(options);
    }

    render() {
        let options = this.props.options;
        let value;
        if (this.props.currency) {
            value = options.value !== null ? OrdinationsUtils.formatPrice(options.value) : "0€";
        } else {
            value = options.value !== null ? options.value.toString() : "0.0";
        }
        if (this.props.round) {
            const text = <Row>
                <Column>
                    <Row>
                        <Column><span className="text-center"><b>{options.label}</b></span></Column>
                    </Row>
                    <Row>
                        <Column><span className="text-center">{value}</span></Column>
                    </Row>
                </Column>
            </Row>;
            return <RoundButton
                disabled={this.props.disabled}
                type={this.props.type}
                text={text}
                commitAction={() => this.activateEditor(options)}
                size={this.props.size}
            />;
        } else {
            let label = null;
            if(options.label){
                label = <Column auto justify="center"><span><b>{options.label}</b>:</span></Column>;
            }
            const text = <Row>
                {label}
                <Column><span className="text-left">{value}</span></Column>
            </Row>;
            return <Button
                disabled={this.props.disabled}
                type={this.props.type}
                highPadding
                text={text}
                commitAction={() => this.activateEditor(options)}
                size={this.props.size}
            />;
        }
    }
}