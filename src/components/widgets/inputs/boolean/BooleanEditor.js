import React, {Component} from 'react';
import Button from "../../../../widgets/Button";
import Column from "../../../../widgets/Column";
import Row from "../../../../widgets/Row";
import Icon from "../../../../widgets/Icon";

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
        let text = <Row>
            <Column auto justify="center">
                <span><b>{label}</b>:</span>
            </Column>
            <Column><span className="text-center boolean-check"><Icon
                name={this.props.value ? "check" : "remove"}
                type={this.props.value ? "success" : "danger"}
            /></span></Column>
        </Row>;
        return <Button
            highPadding
            text={text}
            commitAction={() => this.onConfirm(!this.props.value)}
        />;
    }

}