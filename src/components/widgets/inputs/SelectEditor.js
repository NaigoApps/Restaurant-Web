import React, {Component} from 'react';
import Button from "../../../widgets/Button";
import {ApplicationActions} from "../../../actions/ApplicationActions";
import Column from "../../../widgets/Column";
import Row from "../../../widgets/Row";
import Text from "../../../widgets/Text";
import Color from "../../../utils/Color";
import RenderingData from "./RenderingData";

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

    static defaultComparator(a, b) {
        return -1;
    }

    static defaultColor(a) {
        return Color.black;
    }

    renderValue(value) {
        const options = this.props.options;
        if (!options.renderer || !value) {
            return value || "";
        }
        const result = options.renderer(value);
        if(result instanceof RenderingData){
            return result.text;
        }
        return result;
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
            const color = options.color || SelectEditor.defaultColor;

            value = options.value
                .sort(options.comparator || SelectEditor.defaultComparator)
                .map((v, i) => <Text key={i} color={color(v)}>
                    {((i > 0) ? ", " : "") + this.renderValue(this.findValue(v))}
                </Text>);
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