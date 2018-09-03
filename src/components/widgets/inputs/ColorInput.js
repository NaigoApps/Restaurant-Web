import React, {Component} from 'react';
import {distribute, uuid} from "../../../utils/Utils";
import Row from "../../../widgets/Row";
import ColumnSpace from "../../../widgets/ColumnSpace";
import Column from "../../../widgets/Column";
import Button from "../../../widgets/Button";
import ButtonGroup from "../../../widgets/ButtonGroup";
import ColorButton from "../../../widgets/ColorButton";

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

        const hueSpinner = ColorInput.buildHueSpinner(this.props.options.value);
        const satSpinner = ColorInput.buildSatSpinner(this.props.options.value);
        const lighSpinner = ColorInput.buildLigSpinner(this.props.options.value);

        const colors = this.props.options;

        const rows = this.props.rows || 3;
        const cols = this.props.cols || 3;
        const pageSize = rows * cols;

        let optionsList;
        let pageButtons;

        optionsList = distribute(colors, pageSize);

        let currentPage = Math.min(this.props.page, optionsList.size - 1);

        pageButtons = this.buildPageButtons(optionsList, currentPage);

        optionsList = optionsList.get(currentPage);
        optionsList = distribute(optionsList, cols);
        optionsList = optionsList.map((row, rowIndex) => {
            let buttons = row.map(option => {
                return (
                    <Column key={option}>
                        <ColorButton
                            active={this.isSelected(option)}
                            color={option}
                            commitAction={() => this.select(option)}
                        />
                    </Column>
                );
            });

            while (buttons.size < cols) {
                buttons = buttons.push(<ColumnSpace key={buttons.size}/>);
            }

            return <Row key={rowIndex} ofList={rowIndex > 0}>{buttons}</Row>
        });

        while (optionsList.size < rows) {
            optionsList = optionsList.push(
                <Row key={optionsList.size + uuid()} grow ofList>
                    <ColumnSpace/>
                </Row>);
        }

        return <Row>
            <Column bordered={this.props.bordered}>
                <Row>
                    <Column>
                        {optionsList}
                    </Column>
                </Row>
                {pageButtons}
            </Column>
        </Row>;
    }

    static buildHueSpinner(value){
        const hue = value.hue;

        const buttons = [];

        for(let i = 0;i < 360;i+=20){
            buttons.push(<Button />)
        }
    }

}