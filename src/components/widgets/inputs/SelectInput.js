import React, {Component} from 'react';
import {distribute, uuid} from "../../../utils/Utils";
import Row from "../../../widgets/Row";
import ColumnSpace from "../../../widgets/ColumnSpace";
import Column from "../../../widgets/Column";
import Button from "../../../widgets/Button";
import ButtonGroup from "../../../widgets/ButtonGroup";

/**
 * Events:
 * - onSelectPage
 * - onSelect
 * - onDeselect
 */

export default class SelectInput extends Component {
    constructor(props) {
        super(props);
    }

    selectPage(index) {
        if (this.props.onSelectPage) {
            this.props.onSelectPage(index);
        }
    }

    select(option) {
        if (!option || this.isSelected(this.id(option)) && this.props.onDeselect) {
            this.props.onDeselect(this.id(option));
        } else if (this.props.onSelect) {
            this.props.onSelect(this.id(option));
        }
    }

    id(option) {
        if (option && this.props.id) {
            return this.props.id(option);
        }
        return option;
    }

    isSelected(uuid) {
        if (!this.props.multiSelect) {
            return this.props.selected === uuid;
        } else {
            return this.props.selected.includes(uuid);
        }
    }

    renderOption(option) {
        if (this.props.renderer) {
            return this.props.renderer(option);
        }
        return option;
    }

    render() {
        const entities = this.props.options;
        const colorRenderer = this.props.colorRenderer;

        const rows = this.props.rows || 3;
        const cols = this.props.cols || 3;
        const pageSize = rows * cols;

        let optionsList;
        let pageButtons;

        optionsList = distribute(entities, pageSize);

        let currentPage = Math.min(this.props.page, optionsList.size - 1);

        pageButtons = this.buildPageButtons(optionsList, currentPage);

        optionsList = optionsList.get(currentPage);
        optionsList = distribute(optionsList, cols);
        optionsList = optionsList.map((row, rowIndex) => {
            let buttons = row.map(option => {
                return (
                    <Column key={this.id(option)}>
                        <Button
                            active={this.isSelected(this.id(option))}
                            text={this.renderOption(option)}
                            type={colorRenderer ? colorRenderer(option) : "secondary"}
                            commitAction={this.select.bind(this, option)}
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

    buildPageButtons(groups, currentPage) {
        if (groups.size > 1 || this.props.alwaysShowPages) {
            let btns = [];
            groups.forEach((group, index) => {
                btns.push(
                    <Button
                        key={index}
                        active={currentPage === index}
                        commitAction={this.selectPage.bind(this, index)}
                        text={index + 1}
                        highPadding
                    />
                );
            });
            return <Row ofList>
                <Column>
                    <ButtonGroup>
                        {btns}
                    </ButtonGroup>
                </Column>
            </Row>
        }
        return null;
    }

}