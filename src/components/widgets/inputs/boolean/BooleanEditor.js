import React, {Component} from 'react';
import SwitchInput from "../../SwitchInput";

export default class BooleanEditor extends Component {
    constructor(props) {
        super(props);
    }

    onConfirm(value){
        if(this.props.onConfirm){
            this.props.onConfirm(value);
        }
    }

    render() {
        const label = this.props.label;
        return <SwitchInput
            leftText={label}
            value={this.props.value}
            onToggle={value => this.onConfirm(value)}
        />;
    }

}