import React, {Component} from 'react';
import Row from "../../../../widgets/Row";
import Column from "../../../../widgets/Column";
import Button from "../../../../widgets/Button";
import {ApplicationActions} from "../../../../actions/ApplicationActions";

export default class FloatEditor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Row align="center" topSpaced>
            <Column sm="2" right>
                {this.props.label}
            </Column>
            <Column>
                <Button
                    highPadding
                    text={this.props.value.toString()}
                    commitAction={() => ApplicationActions.showFloatInput(
                        this.props.value,
                        this.props.callback,
                        this.props.label)}
                />
            </Column>
        </Row>
    }
}