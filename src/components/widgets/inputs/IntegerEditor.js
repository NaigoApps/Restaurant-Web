import React, {Component} from 'react';
import Row from "../../../widgets/Row";
import Column from "../../../widgets/Column";
import Button from "../../../widgets/Button";
import {ApplicationActions} from "../../../actions/ApplicationActions";

export default class IntegerEditor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Row align="center" topSpaced>
            <Column sm="2" right>
                {this.props.options.label}
            </Column>
            <Column auto>
                <Button
                    highPadding
                    text={this.props.options.value ? this.props.options.value.toString() : ""}
                    commitAction={() => ApplicationActions.showIntegerInput(this.props.options)}
                />
            </Column>
        </Row>
    }
}