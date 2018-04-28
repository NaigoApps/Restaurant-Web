import React, {Component} from 'react';
import SelectInput from "./SelectInput";
import Column from "../../../widgets/Column";
import Button from "../../../widgets/Button";
import OkCancelModal from "../../../widgets/OkCancelModal";
import Row from "../../../widgets/Row";
import {ApplicationActions} from "../../../actions/ApplicationActions";

/**
 * Events:
 * - onSelect
 * - onDeselect
 * - onSelectPage
 *
 * - onShowModal
 * - onAbort
 * - onConfirm
 */

export default class SelectEditor extends Component {
    constructor(props) {
        super(props);
    }

    renderValue(value) {
        const options = this.props.options;
        if (!options.renderer) {
            return value;
        }
        return options.renderer(value);
    }

    findValue(value) {
        const options = this.props.options;
        if (!options.id) {
            return options.values.find(val => val === value) || null;
        } else {
            return options.values.find(val => options.id(val) === value) || null;
        }
    }

    render() {
        const options = this.props.options;

        return <Row align="center" topSpaced>
            <Column sm="2" right>
                {options.label}
            </Column>
            <Column auto>
                <Button
                    highPadding
                    text={this.renderValue(this.findValue(options.value))}
                    commitAction={() => ApplicationActions.showSelectInput(options)}
                />
            </Column>
        </Row>
    }

}