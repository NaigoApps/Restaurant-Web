import React, {Component} from 'react';
import Column from "../../../../widgets/Column";
import Row from "../../../../widgets/Row";
import Button from "../../../../widgets/Button";
import BooleanInput from "./BooleanInput";

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
        return <Row align="center" topSpaced>
            <Column sm="2" right>
                <label><b>{label}</b></label>
            </Column>
            <Column auto>
                <BooleanInput
                    value={this.props.value}
                    onConfirm={value => this.onConfirm(value)}/>
            </Column>
        </Row>;
    }

}