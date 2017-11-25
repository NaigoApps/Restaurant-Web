import React, {Component} from 'react';
import EntityEditor, {BUTTONS} from "../editors/EntityEditor";
import {camel, distribute, findByUuid, foo, repartite} from "../../utils/Utils";
import $ from 'jquery';
import EntitiesList from "./EntitiesList";
import TouchButton from "../../widgets/TouchButton";
import TouchSpace from "../../widgets/TouchSpace";

export default class PaginatedEntitiesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0
        }
    }

    panelType(descriptor, entity) {
        let className = ["panel", "editor-body"];
        if (descriptor.renderer.color) {
            className.push("panel-" + descriptor.renderer.color(entity));
        } else {
            className.push("panel-default")
        }
        return className.join(" ");
    }

    selectEntity(uuid) {
        if (!uuid) {
            EntitiesList.resolveDeselectMethod(this.props.descriptor)();
        }
        if (this.props.descriptor.entities.selected !== uuid) {
            EntitiesList.resolveSelectMethod(this.props.descriptor)(uuid);
        } else {
            EntitiesList.resolveDeselectMethod(this.props.descriptor)();
        }
    }

    isSelected(uuid) {
        return uuid === this.props.descriptor.entities.selected;
    }

    getEditorComponent(entity) {
        let editorComponent;
        if (this.props.descriptor.components.editor.component) {
            editorComponent = this.props.descriptor.components.editor.component(entity);
        } else {
            editorComponent = <EntityEditor
                entity={entity}
                descriptor={EntitiesList.makeEntityDescriptor(
                    this.props.descriptor,
                    this.props.descriptor.components.editor.actionsProvider,
                    true)}/>;
        }
        return editorComponent;
    }

    render() {
        const descriptor = this.props.descriptor;
        const entities = descriptor.entities.list;
        const created = descriptor.entities.created;
        const selected = descriptor.entities.selected;

        let entitiesList;
        let pageButtons;

        if (!created) {
            if (!selected) {
                entitiesList = distribute(entities, 8);

                pageButtons = this.buildPageButtons(entitiesList);

                entitiesList = entitiesList.map((group, index) => {
                    if (index === this.state.page) {
                        let buttons = group.map(entity => {
                            return (
                                <TouchButton
                                    key={entity.uuid}
                                    text={descriptor.renderer.name(entity)}
                                    type={descriptor.renderer.color ? descriptor.renderer.color(entity) : "default"}
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
            } else {
                entitiesList = this.getEditorComponent(findByUuid(entities, selected));
            }
        }


        let creator;

        if (created) {
            if (descriptor.components.creator.component) {
                creator = descriptor.components.creator.component(EntitiesList.makeEntityDescriptor(descriptor, descriptor.components.creator.actionsProvider, false));
            } else {
                creator = <EntityEditor
                    entity={created}
                    descriptor={EntitiesList.makeEntityDescriptor(
                        descriptor,
                        descriptor.components.creator.actionsProvider
                        , false)}/>
            }
        }

        return <div className="row">
            <div className="col-sm-12">
                <div className="row">
                    {entitiesList}
                    {creator}
                </div>
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
                    <li className={this.state.page === index ? "clickable active" : "clickable"}>
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

    static makeEntityDescriptor(descriptor, actionsProvider, immediate) {
        return {
            name: descriptor.name[0],
            renderer: descriptor.renderer,
            actionsProvider: actionsProvider,
            immediate: immediate,
            fields: descriptor.fields,

            customComponent: descriptor.customComponent
        }
    }

    static resolveSelectMethod(descriptor) {
        let selectMethod = descriptor.components.editor.actionsProvider['select' + camel(descriptor.name[0])];
        if (!selectMethod) {
            console.warn("Unresolved method select" + camel(descriptor.name[0]));
            selectMethod = foo;
        }
        return selectMethod;
    }

    static resolveDeselectMethod(descriptor) {
        let deselectMethod = descriptor.components.editor.actionsProvider['deselect' + camel(descriptor.name[0])];
        if (!deselectMethod) {
            console.warn("Unresolved method deselect" + camel(descriptor.name[0]));
            deselectMethod = foo;
        }
        return deselectMethod;
    }
}