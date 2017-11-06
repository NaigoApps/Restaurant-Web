import React, {Component} from 'react';
import Button from "../../widgets/Button";
import EntitiesEditor from "./EntitiesEditor";
import TextEditor from "../widgets/inputs/TouchTextEditor";
import SelectEditor from "../widgets/inputs/SelectEditor";
import FloatEditor from "../widgets/inputs/FloatEditor";
import {camel, uuid} from "../../utils/Utils";
import BooleanEditor from "../widgets/inputs/BooleanEditor";
import EntitySelectEditor from "../widgets/inputs/EntitySelectEditor";
import IntegerEditor from "../widgets/inputs/IntegerEditor";
import $ from "jquery";

export const TYPES = {
    INT: "int",
    FLOAT: "float",
    STRING: "string",
    SELECT: "select",
    ENTITY: "entity",
    ENTITIES: "entitites",
    BOOLEAN: "boolean",
    CUSTOM: "custom"
};

export const ACTIONS = {
    CREATE: "create",
    EDIT: "edit",
    DELETE: "delete"
};

export const SHOWN = {
    EDITOR: "EDITOR",
    CREATOR: "CREATOR"
};

export const LAYOUT = {};

export function empty() {

}

export default class EntityEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uuid: "ee_" + uuid()
        }
    }

    static makePropertiesEditors(descriptor, entity) {
        return descriptor.fields
            .filter(f =>
                !f.shown ||
                (entity.uuid && f.shown.includes(SHOWN.EDITOR)) ||
                (!entity.uuid && f.shown.includes(SHOWN.CREATOR)))
            .map(field => EntityEditor.makePropertyEditor(descriptor, entity, field));
    }

    render() {
        const descriptor = this.props.descriptor;
        const entity = this.props.entity;

        if (entity) {
            let components = EntityEditor.makePropertiesEditors(descriptor, entity);

            let buttons = this.makeButtons(descriptor, entity);
            let deleteButton = (entity.uuid && !descriptor.undeletable) ? EntityEditor.makeDeleteButton(descriptor, entity) : null;

            return (
                <div className="form">
                    {components}
                    {buttons}
                    <div className="pull-right">
                        {deleteButton}
                    </div>
                </div>
            )
        }
        return <div/>;

    }

    makeButtons(descriptor, entity) {
        let buttons = [];
        if (!descriptor.immediate) {
            let confirmMethod = EntityEditor.resolveCreateMethod(descriptor, entity);
            buttons.push(<Button key="confirm_btn" type="success" icon="ok" text="Conferma"
                                 commitAction={confirmMethod}/>);
        }
        return <div className="text-center">{buttons}</div>;
    }

    static makePropertyEditor(descriptor, entity, property) {
        switch (property.type) {
            case TYPES.STRING:
                return EntityEditor.renderStringEditor(descriptor, entity, property);
            case TYPES.INT:
                return EntityEditor.renderIntEditor(descriptor, entity, property);
            case TYPES.FLOAT:
                return EntityEditor.renderFloatEditor(descriptor, entity, property);
            case TYPES.SELECT:
                return EntityEditor.renderSelectEditor(descriptor, entity, property);
            case TYPES.ENTITIES:
                return EntityEditor.renderEntitiesEditor(descriptor, entity, property);
            case TYPES.ENTITY:
                return EntityEditor.renderEntityEditor(descriptor, entity, property);
            case TYPES.BOOLEAN:
                return EntityEditor.renderBooleanEditor(descriptor, entity, property);
            case TYPES.CUSTOM:
                return EntityEditor.renderCustomEditor(descriptor, entity, property);
            default:
                console.warn("Cannot render type " + property.type);
                return <div key={Math.random()}/>;
        }
    }

    static renderCustomEditor(descriptor, property) {
        return property.customComponent(property);
    }

    static renderEntitiesEditor(descriptor, entity, property) {
        return <EntitiesEditor
            key={property.name}
            descriptor={property}/>;
    }

    static renderEntityEditor(descriptor, entity, property) {
        return <EntitySelectEditor
            key={property.name}
            value={entity[property.name]}
            descriptor={property}
            commitAction={EntityEditor.resolveUpdateMethod(descriptor, entity, property)}
        />
    }

    static renderStringEditor(descriptor, entity, property) {
        return <TextEditor
            key={property.name}
            descriptor={property}
            value={entity[property.name]}
            commitAction={EntityEditor.resolveUpdateMethod(descriptor, entity, property)}
        />
    }

    static renderBooleanEditor(descriptor, entity, property) {
        return <BooleanEditor
            key={property.name}
            descriptor={property}
            value={entity[property.name]}
            commitAction={EntityEditor.resolveUpdateMethod(descriptor, entity, property)}
        />
    }

    static renderIntEditor(descriptor, entity, property) {
        return <IntegerEditor
            key={property.name}
            descriptor={property}
            value={entity[property.name]}
            commitAction={EntityEditor.resolveUpdateMethod(descriptor, entity, property)}
        />
    }

    static renderFloatEditor(descriptor, entity, property) {
        return <FloatEditor
            key={property.name}
            descriptor={property}
            value={entity[property.name]}
            commitAction={EntityEditor.resolveUpdateMethod(descriptor, entity, property)}
        />
    }

    static renderSelectEditor(descriptor, entity, property) {
        return <SelectEditor
            key={property.name}
            descriptor={property}
            value={entity[property.name]}
            commitAction={EntityEditor.resolveUpdateMethod(descriptor, entity, property)}
        />
    }

    static resolveCreateMethod(descriptor, entity) {
        let createMethod = descriptor.actionsProvider[createMethodName(descriptor.name)];
        if (createMethod) {
            createMethod = createMethod.bind(descriptor.actionsProvider, entity);
        } else {
            createMethod = empty;
            console.warn("Cannot find method " + createMethodName(descriptor.name));
        }
        return createMethod;
    }

    static resolveUpdateMethod(descriptor, entity, property) {
        let updateFunc = descriptor.actionsProvider[updateMethodName(descriptor.name, property.name)];
        if (updateFunc) {
            updateFunc = updateFunc.bind(descriptor.actionsProvider, entity.uuid)
        } else {
            updateFunc = empty;
            console.warn("Cannot find method " + updateMethodName(descriptor.name, property.name));
        }
        return updateFunc;
    }

    static makeDeleteButton(descriptor, entity) {
        let button;
        let deleteMethod = EntityEditor.resolveDeleteMethod(descriptor, entity);
        let showDeleteModal = () => {
            $("#del_" + descriptor.name).modal("show")
        };
        button = (
            <div>
                <Button key="delete_btn" icon="trash" type="danger" size="sm" text={descriptor.renderer.name(entity)} commitAction={showDeleteModal}/>
                <div className="modal fade" id={"del_" + descriptor.name}>
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title text-danger" id="gridSystemModalLabel">Eliminare?</h4>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-lg btn-danger" data-dismiss="modal"
                                        onClick={deleteMethod}>Sì
                                </button>
                                <button className="btn btn-lg btn-primary" data-dismiss="modal">No</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        return button;
    }

    static resolveDeleteMethod(descriptor, entity) {
        let deleteMethod = descriptor.actionsProvider[deleteMethodName(descriptor.name)];
        if (deleteMethod) {
            deleteMethod = deleteMethod.bind(descriptor.actionsProvider, entity.uuid);
        } else {
            deleteMethod = empty;
            console.warn("Cannot find method " + deleteMethodName);
        }
        return deleteMethod;
    }
}

function updateMethodName(entityName, prop) {
    return "update" + camel(entityName) + camel(prop);
}

function createMethodName(entityName) {
    return "create" + camel(entityName);
}

function deleteMethodName(entityName) {
    return "delete" + camel(entityName);
}