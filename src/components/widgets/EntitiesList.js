import React, {Component} from 'react';
import EntityEditor, {BUTTONS} from "../editors/EntityEditor";
import {camel, foo} from "../../utils/Utils";
import $ from 'jquery';

export default class EntitiesList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(){
        const entities = this.props.descriptor.entities.list;
        const selected = this.props.descriptor.entities.selected;
        entities.forEach(e => {
            if(e.uuid !== selected) {
                console.log("Hide " + e.uuid);
                $('#collapse_' + e.uuid).collapse('hide');
            }
        });
        console.log("Show " + selected);
        $('#collapse_' + selected).collapse('show');
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
        let className = ["accordion-title", "text-center"];
        if (uuid === this.props.descriptor.entities.selected) {
            className.push("selected");
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

        if (!created) {
            entitiesList = entities
            .filter(entity => selected ? selected === entity.uuid : true)
                .map((entity) => {
                        return (
                            <div className={this.panelType(descriptor, entity)} key={entity.uuid}>
                                <div className="panel-heading clickable" role="tab"
                                     onClick={this.selectEntity.bind(this, entity.uuid)}>
                                    <h5 className={this.headingClass(entity.uuid)}>
                                        {descriptor.renderer.name(entity)}
                                    </h5>
                                </div>
                                <div id={"collapse_" + entity.uuid}
                                     className={"panel-collapse collapse"}>
                                    <div className="panel-body">
                                        {this.getEditorComponent(entity)}
                                    </div>
                                </div>
                            </div>
                        );
                    }
                );
        }


        let creator;

        if (created) {
            if (descriptor.components.creator.component) {
                creator = descriptor.components.creator.component(EntitiesList.makeEntityDescriptor(descriptor, descriptor.components.creator.actionsProvider, false));
            } else {
                creator = <div className="panel editor-body panel-primary">
                    <div className="panel-heading" role="tab" id="heading_creator"
                         onClick={this.selectEntity.bind(this, null)}>
                        <h5 className="panel-title text-center">
                            <a role="button">&nbsp;{descriptor.renderer.name(created) || "Creazione " + descriptor.label[0]}</a>
                        </h5>
                    </div>
                    <div id="collapse_creator"
                         className="panel-collapse collapse in">
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

        return <div className="panel-group" id={"accordion_" + descriptor.name[0]} role="tablist"
                    aria-multiselectable="true">
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