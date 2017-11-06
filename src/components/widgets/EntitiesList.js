import React, {Component} from 'react';
import EntityEditor, {ACTIONS, BUTTONS, LAYOUT} from "../editors/EntityEditor";
import {camel, findByUuid, foo} from "../../utils/Utils";
import EntitiesEditor from "../editors/EntitiesEditor";

export default class EntitiesList extends Component {
    constructor(props) {
        super(props);
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

    headingClass(uuid) {
        let className = ["panel-title", "text-center"];
        if (uuid === this.props.descriptor.entities.selected) {
            className.push("h5");
        } else {
            className.push("h6");
        }
        return className.join(" ");
    }


    selectEntity(uuid) {
        if (!this.props.descriptor.entities.selected) {
            EntitiesList.resolveSelectMethod(this.props.descriptor)(uuid);
        } else {
            EntitiesList.resolveDeselectMethod(this.props.descriptor)(uuid);
        }
    }

    isSelected(uuid) {
        return uuid === this.props.descriptor.entities.selected;
    }


    render() {
        const descriptor = this.props.descriptor;
        const entities = descriptor.entities.list;
        const created = descriptor.entities.created;
        const selected = descriptor.entities.selected;

        let entitiesList;
        if (!created) {
            entitiesList = entities
                .filter(entity => selected ? selected === entity.uuid : true)
                .map((entity) => {
                        if (descriptor.components.editor.component) {
                            return descriptor.components.editor.component(entity);
                        } else {
                            return (
                                <div className={this.panelType(descriptor, entity)} key={entity.uuid}>
                                    <div className="panel-heading" role="tab" id={"heading_" + entity.uuid}
                                         onClick={this.selectEntity.bind(this, entity.uuid)}>
                                        <h5 className={this.headingClass(entity.uuid)}>
                                            <a role="button">{descriptor.renderer.name(entity)}</a>
                                        </h5>
                                    </div>
                                    <div id={"collapse_" + entity.uuid}
                                         className={"panel-collapse collapse" + (this.isSelected(entity.uuid) ? " in" : "")}
                                         role="tabpanel">
                                        <div className="panel-body">
                                            <EntityEditor
                                                entity={entity}
                                                descriptor={EntitiesList.makeEntityDescriptor(
                                                    descriptor,
                                                    descriptor.components.editor.actionsProvider,
                                                    true)}/>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    }
                );
        }


        let creator;

        if (created) {
            if (descriptor.components.creator.component) {
                creator = descriptor.components.creator.component(EntitiesList.makeEntityDescriptor(descriptor, descriptor.components.creator.actionsProvider, false));
            } else {
                creator = <div className="panel editor-body panel-primary">
                    <div className="panel-heading" role="tab" id="heading_creator">
                        <h5 className="panel-title text-center">
                            <a role="button">&nbsp;{descriptor.renderer.name(created)}&nbsp;</a>
                        </h5>
                    </div>
                    <div id="collapse_creator"
                         className="panel-collapse collapse in"
                         role="tabpanel">
                        <div className="panel-body">
                            <EntityEditor
                                entity={created}
                                descriptor={EntitiesList.makeEntityDescriptor(
                                    descriptor,
                                    descriptor.components.creator.actionsProvider
                                    , false)}/>
                        </div>
                    </div>
                </div>
            }
        }

        return <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
            {entitiesList}
            {creator}
        </div>;
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