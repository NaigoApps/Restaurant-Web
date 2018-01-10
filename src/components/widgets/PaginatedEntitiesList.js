import React, {Component} from 'react';
import {BUTTONS} from "../editors/EntityEditor";
import {distribute} from "../../utils/Utils";
import Button from "../../widgets/Button";
import Row from "../../widgets/Row";
import Column from "../../widgets/Column";
import ButtonGroup from "../../widgets/ButtonGroup";
import GridButton from "../../widgets/GridButton";
import ColumnSpace from "../../widgets/ColumnSpace";

export default class PaginatedEntitiesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0
        }
    }

    selectEntity(uuid) {
        if (!uuid || this.props.selected === uuid) {
            this.props.deselectMethod();
        }
        this.props.selectMethod(uuid);
    }

    isSelected(uuid) {
        return uuid === this.props.selected;
    }

    render() {
        const entities = this.props.entities;
        const selected = this.props.selected;
        const renderer = PaginatedEntitiesList.rendererFromProps(this.props.renderer);

        const rows = this.props.rows || 3;
        const cols = this.props.cols || 3;
        const pageSize = rows * cols;

        let entitiesList;
        let pageButtons;

        entitiesList = distribute(entities, pageSize);

        pageButtons = this.buildPageButtons(entitiesList);

        entitiesList = entitiesList.map((group, index) => {
            if (index === this.state.page) {
                let rowsGroups = distribute(group, cols);
                let rowsComps = rowsGroups.map((row, index) => {
                    let buttons = row.map(entity => {
                        return (
                            <Column key={entity.uuid} type={renderer.color ? renderer.color(entity) : "secondary"} bordered>
                                <GridButton
                                    text={renderer.name(entity)}
                                    commitAction={this.selectEntity.bind(this, entity.uuid)}/>
                            </Column>
                        );
                    });

                    while (buttons.length < cols) {
                        buttons.push(<ColumnSpace key={buttons.length}/>);
                    }

                    return <Row key={index}>{buttons}</Row>
                });

                while (rowsComps.length < rows) {
                    rowsComps.push(
                        <Row key={rowsComps.length}>
                            <ColumnSpace/>
                        </Row>);
                }

                return rowsComps;
            }
            return null;
        });


        return <Row>
            <Column>
                <Row>
                    <Column>
                        {entitiesList}
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

    static rendererFromProps(renderer) {
        if (typeof renderer === "function") {
            return {
                name: renderer
            };
        } else if (renderer.name) {
            return renderer;
        }
        return {
            name: () => "???"
        }
    }
}