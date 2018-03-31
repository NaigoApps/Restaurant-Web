import React, {Component} from 'react';
import {distribute} from "../../../utils/Utils";
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
        if(this.props.onSelectPage){
            this.props.onSelectPage(index);
        }
    }

    select(option) {
        if (!option || this.isSelected(this.id(option)) && this.props.onDeselect) {
            this.props.onDeselect(this.id(option));
        } else if(this.props.onSelect){
            this.props.onSelect(this.id(option));
        }
    }

    id(option){
        if(option && this.props.id){
            return this.props.id(option);
        }
        return option;
    }

    isSelected(uuid){
        if(!this.props.multiSelect){
            return this.props.selected === uuid;
        }else{
            return this.props.selected.includes(uuid);
        }
    }

    renderOption(option){
        if(this.props.renderer){
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

        let currentPage = Math.min(this.props.page, optionsList.length - 1);

        pageButtons = this.buildPageButtons(optionsList, currentPage);

        optionsList = optionsList.map((group, index) => {
            if (index === currentPage) {
                let rowsGroups = distribute(group, cols);
                let rowsComps = rowsGroups.map((row, index) => {
                    let buttons = row.map(option => {
                        return (
                            <Column key={this.id(option)}>
                                <Button
                                    active={this.isSelected(this.id(option))}
                                    text={this.renderOption(option)}
                                    size="lg"
                                    type={colorRenderer ? colorRenderer(option) : "secondary"}
                                    commitAction={this.select.bind(this, option)}
                                />
                            </Column>
                        );
                    });

                    while (buttons.length < cols) {
                        buttons.push(<ColumnSpace key={buttons.length}/>);
                    }

                    return <Row key={index} grow topSpaced>{buttons}</Row>
                });

                while (rowsComps.length < rows) {
                    rowsComps.push(
                        <Row key={rowsComps.length} grow topSpaced>
                            <ColumnSpace/>
                        </Row>);
                }

                return rowsComps;
            }
            return null;
        });


        return <Row grow>
            <Column>
                <Row grow>
                    <Column>
                        {optionsList}
                    </Column>
                </Row>
                <Row topSpaced>
                    <Column>
                        {pageButtons}
                    </Column>
                </Row>
            </Column>
        </Row>;
    }

    buildPageButtons(groups, currentPage) {
        if (groups.length > 1) {
            let btns = [];
            groups.forEach((group, index) => {
                btns.push(
                    <Button
                        key={index}
                        active={currentPage === index}
                        commitAction={this.selectPage.bind(this, index)}
                        text={index + 1}
                    />
                );
            });
            return <nav>
                <ButtonGroup>
                    {btns}
                </ButtonGroup>
            </nav>
        }
        return null;
    }

}