import React, {Component} from 'react';
import Button from "../../../widgets/Button";
import Column from "../../../widgets/Column";
import Row from "../../../widgets/Row";
import {ApplicationActions} from "../../../actions/ApplicationActions";

export default class TTextEditor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let options = this.props.options;
        let value = options.value ? options.value.toString() : "";
        let text = <Row>
            <Column auto justify="center"><span><b>{options.label}</b>:</span></Column>
            <Column><span className="text-left">{value}</span></Column>
        </Row>;
        return <Button
            disabled={this.props.disabled}
            type={this.props.type || "secondary"}
            highPadding
            text={text}
            commitAction={() => ApplicationActions.showTextInput(options)}
        />;
    }
}