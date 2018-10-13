import React, {Component} from 'react';
import Row from "../../../widgets/Row";
import Color from "../../../utils/Color";
import FlatButton from "../../../widgets/FlatButton";
import Column from "../../../widgets/Column";
import {ApplicationActions} from "../../../actions/ApplicationActions";

/**
 * Events:
 * - onSelectPage
 * - onSelect
 * - onDeselect
 */

export default class ColorInput extends Component {
    constructor(props) {
        super(props);
    }

    selectPage(index) {
        if (this.props.onSelectPage) {
            this.props.onSelectPage(index);
        }
    }

    select(option) {
        if (!option || this.isSelected(option) && this.props.onDeselect) {
            this.props.onDeselect(option);
        } else if (this.props.onSelect) {
            this.props.onSelect(option);
        }
    }

    isSelected(uuid) {
        return this.props.selected === uuid;
    }

    renderOption(option) {
        return <h5>{option}</h5>;
    }

    render() {

        const hueSpinner = ColorInput.buildHueSpinner(this.props.selected);
        const satSpinner = ColorInput.buildSatSpinner(this.props.selected);
        const lighSpinner = ColorInput.buildLigSpinner(this.props.selected);

        return <Row>
            <Column>
                <Row topSpaced>{hueSpinner}</Row>
                <Row topSpaced>{satSpinner}</Row>
                <Row topSpaced>{lighSpinner}</Row>
            </Column>
            <Column auto align="stretch">
                <FlatButton color={this.props.selected || Color.white} fill/>
            </Column>
        </Row>;
    }

    static buildHueSpinner(color) {
        if(color) {
            console.log(color.red);
            console.log(color.green);
            console.log(color.blue);
        }
        const buttons = [];
        for (let i = 0; i < 10; i++) {
            buttons.push(<Column key={i}>
                <FlatButton
                    active={color && this.similar(color.hue, i / 10)}
                    color={Color.fromHSL(i / 10, 1, 0.5)}
                    commitAction={() => ApplicationActions.colorInputSelect(i / 10, 1, 0.5)}
                />
            </Column>)
        }
        return buttons;
    }

    static buildSatSpinner(color) {
        const buttons = [];

        for (let i = 0; i <= 10; i++) {
            buttons.push(<Column key={i}>
                <FlatButton
                    active={color && this.similar(color.saturation, i / 10)}
                    color={Color.fromHSL(color ? color.hue : 0, i / 10, 0.5)}
                    commitAction={() => ApplicationActions.colorInputSelect(color.hue, i / 10, 0.5)}/>
            </Column>)
        }
        return buttons;
    }

    static buildLigSpinner(color) {
        const buttons = [];

        for (let i = 0; i <= 10; i++) {
            buttons.push(<Column key={i}>
                <FlatButton
                    active={color && this.similar(color.lightness, i / 10)}
                    color={Color.fromHSL(color ? color.hue : 0, color ? color.saturation : 0, i / 10)}
                    commitAction={() => ApplicationActions.colorInputSelect(color.hue, color.saturation, i / 10)}/>
            </Column>)
        }
        return buttons;
    }

    static similar(a, b, eps) {
        const delta = eps !== undefined ? eps : 0.01;
        return Math.abs(a - b) < delta;
    }
}