import React, {Component} from 'react';
import {distribute, uuid} from "../../../utils/Utils";
import Row from "../../../widgets/Row";
import ColumnSpace from "../../../widgets/ColumnSpace";
import Column from "../../../widgets/Column";
import Button from "../../../widgets/Button";
import ButtonGroup from "../../../widgets/ButtonGroup";
import RenderingData from "./RenderingData";
import TextButton from "../../../widgets/TextButton";

/**
 rows: int
 cols: int
 page: int
 options: array
 renderer: function object => string
 colorRenderer: function object =>

 onSelect
 onDeselect
 onSelectPage
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
        let renderingData;
        if (this.props.renderer) {
            renderingData = this.props.renderer(option);
            if (renderingData instanceof RenderingData) {
                return renderingData;
            }
            renderingData = new RenderingData(renderingData, null);
        } else {
            renderingData = new RenderingData(option, null);
        }
        return renderingData;
    }

    render() {
        const entities = this.props.options;

        const rows = this.props.rows || 3;
        const cols = this.props.cols || 3;
        const pageSize = rows * cols;

        let optionsList;
        let pageButtons;

        optionsList = distribute(entities, pageSize);
        const realRows = Math.max(
            ...optionsList.map(list => Math.ceil(list.length / cols)));
        let currentPage = Math.min(this.props.page, optionsList.length - 1);

        pageButtons = this.buildPageButtons(optionsList, currentPage);

        optionsList = optionsList[currentPage];
        optionsList = distribute(optionsList, cols);
        optionsList = optionsList.map((row, rowIndex) => {
            let buttons = row.map(option => {
                const color = this.props.color ? this.props.color(option) : null;
                const bg = this.props.colorRenderer ? this.props.colorRenderer(option) : "secondary";
                const renderData = this.renderOption(option);
                if (!renderData.backgroundColor) {
                    renderData.backgroundColor = bg;
                }
                return (
                    <Column key={uuid()}>
                        <TextButton
                            color={color}
                            active={this.isSelected(this.id(option))}
                            backgroundColor={renderData.backgroundColor}
                            text={renderData.text}
                            commitAction={() => this.select(option)}
                        />
                    </Column>
                );
            });

            while (buttons.length < cols) {
                buttons.push(<ColumnSpace key={buttons.length}/>);
            }

            return <Row key={rowIndex} ofList={rowIndex > 0}>{buttons}</Row>
        });

        while (optionsList.length < realRows) {
            optionsList.push(
                <Row key={optionsList.length + uuid()} grow ofList>
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
        if (groups.length > 1 || this.props.alwaysShowPages) {
            let btns = [];
            groups.forEach((group, index) => {
                btns.push(
                    <Button
                        key={index}
                        active={currentPage === index}
                        commitAction={() => this.selectPage(index)}
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