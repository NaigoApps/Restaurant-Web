import React, {Component} from 'react';
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import Button from "../../../../widgets/Button";
import {ApplicationActions} from "../../../../actions/ApplicationActions";
import OrdinationsUtils from "../../../../pages/eveningsEditing/OrdinationsUtils";

export default class FloatEditor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let options = this.props.options;
        let value;
        if(this.props.currency){
            value = options.value !== null ? OrdinationsUtils.formatPrice(options.value) : "0€";
        }else{
            value = options.value !== null ? options.value.toString() : "0.0";
        }
        let text = <Row>
            <Column auto justify="center"><span><b>{options.label}</b>:</span></Column>
            <Column><span className="text-left">{value}</span></Column>
        </Row>;
        return <Button
            disabled={this.props.disabled}
            type={this.props.type}
            highPadding
            text={text}
            commitAction={() => ApplicationActions.showFloatInput(options)}
        />;
    }
}