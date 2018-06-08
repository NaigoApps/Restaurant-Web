import React, {Component} from 'react';
import Button from "../../../widgets/Button";
import {ApplicationActions} from "../../../actions/ApplicationActions";
import Column from "../../../widgets/Column";
import Row from "../../../widgets/Row";

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
        if (!options.renderer || !value) {
            return value || "";
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
        let value;
        if (!options.multiSelect) {
            value = this.renderValue(this.findValue(options.value));
        } else {
            value = options.value
                .map(v => this.renderValue(this.findValue(v)))
                .sort((s1, s2) => s1.trim().localeCompare(s2.trim()))
                .reduce((v1, v2) => v1 + ", " + v2)
        }
        let text = <Row>
            <Column auto justify="center">
                <span><b>{options.label}</b>:</span>
            </Column>
            <Column><span className="text-left">{value}</span></Column>
        </Row>;

        return <Button
            highPadding
            disabled={this.props.disabled}
            textRows={this.props.textRows}
            type={this.props.type}
            text={text}
            commitAction={() => ApplicationActions.showSelectInput(options)}
        />;
    }

}