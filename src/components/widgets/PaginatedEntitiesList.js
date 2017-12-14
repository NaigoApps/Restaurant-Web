import React, {Component} from 'react';
import EntityEditor, {BUTTONS} from "../editors/EntityEditor";
import {camel, distribute, findByUuid, foo, repartite} from "../../utils/Utils";
import $ from 'jquery';
import EntitiesList from "./EntitiesList";
import TouchButton from "../../widgets/TouchButton";
import TouchSpace from "../../widgets/TouchSpace";
import Button from "../../widgets/Button";

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
        const renderer = this.props.renderer;

        let entitiesList;
        let pageButtons;

        entitiesList = distribute(entities, 9);

        pageButtons = this.buildPageButtons(entitiesList);

        entitiesList = entitiesList.map((group, index) => {
            if (index === this.state.page) {
                let buttons = group.map(entity => {
                    return (
                        <Button
                            key={entity.uuid}
                            text={renderer.name(entity)}
                            type={renderer.color ? renderer.color(entity) : "secondary"}
                            commitAction={this.selectEntity.bind(this, entity.uuid)}/>
                    );
                });
                while (buttons.length < 8) {
                    buttons.push(<TouchSpace/>);
                }
                return buttons;
            }
            return null;
        });


        return <div className="row">
            <div className="col-sm-12">
                {entitiesList}
            </div>
            <div className="col-sm-12">
                {pageButtons}
            </div>
        </div>;
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
                    <li className={this.state.page === index ? "pagination-item clickable active" : "pagination-item clickable"}>
                        <a onClick={this.selectPage.bind(this, index)}>{index + 1}</a>
                    </li>
                );
            });
            return <nav>
                <ul className="pagination pagination-lg">
                    {btns}
                </ul>
            </nav>
        }
        return null;
    }

}