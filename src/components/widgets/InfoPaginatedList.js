import React, {Component} from 'react';
import {BUTTONS} from "../editors/EntityEditor";
import {distribute} from "../../utils/Utils";
import Button from "../../widgets/Button";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import ButtonGroup from "../../widgets/ButtonGroup";
import ColumnSpace from "../../widgets/ColumnSpace";

export default class InfoPaginatedList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            info: null
        }
    }

    select(option) {
        this.setState({
            info: option
        });
        if (!option || this.isSelected(this.id(option)) && this.props.deselectMethod) {
            this.props.deselectMethod(this.id(option));
        } else if(this.props.selectMethod){
            this.props.selectMethod(this.id(option));
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

    render() {
        const entities = this.props.entities;
        const renderer = this.props.renderer;
        const colorRenderer = this.props.colorRenderer;

        const rows = this.props.rows || 3;
        const cols = this.props.cols || 3;
        const pageSize = rows * cols;

        let optionsList;
        let pageButtons;

        optionsList = distribute(entities, pageSize);

        pageButtons = this.buildPageButtons(optionsList);

        optionsList = optionsList.map((group, index) => {
            if (index === this.state.page) {
                let rowsGroups = distribute(group, cols);
                let rowsComps = rowsGroups.map((row, index) => {
                    let buttons = row.map(entity => {
                        return (
                            <Column key={this.id(entity)}>
                                <Button
                                    active={this.isSelected(this.id(entity))}
                                    text={renderer(entity)}
                                    type={colorRenderer ? colorRenderer(entity) : "secondary"}
                                    commitAction={this.select.bind(this, entity)}
                                    fullHeight
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

        let infoPanel = this.buildInfoPanel();

        return <Row grow>
            <Column>
                <Row grow>
                    <Column sm="10">
                        {optionsList}
                    </Column>
                    <Column sm="2">
                        <h5>Info</h5>
                        {infoPanel}
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

    selectPage(index) {
        this.setState({
            page: index
        });
    }

    buildInfoPanel() {
        let pages = React.Children.map(this.props.children, (child) => React.cloneElement(child, {
            entity: this.state.info
        }));
        return React.Children.toArray(pages)[0];
    }

    buildPageButtons(groups) {
        if (groups.length > 1) {
            let btns = [];
            groups.forEach((group, index) => {
                btns.push(
                    <Button
                        key={index}
                        active={this.state.page === index}
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