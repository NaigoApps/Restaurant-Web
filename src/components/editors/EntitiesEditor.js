import React, {Component} from 'react';
import {empty} from "./EntityEditor";
import EntitiesList from "../widgets/EntitiesList";
import PaginatedEntitiesList from "../widgets/PaginatedEntitiesList";

function camel(word) {
    return word.charAt(0).toUpperCase() + word.substr(1);
}

export default class EntitiesEditor extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const descriptor = this.props.descriptor;
        const created = descriptor.entities.created;
        const selected = descriptor.entities.selected;

        const list = EntitiesEditor.makeComponentsList(descriptor);

        let createButton;
        if (descriptor.components.creator && !selected && !created) {
            createButton = EntitiesEditor.makeCreateButton(descriptor);
        }

        return (
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        {list}
                    </div>
                </div>
                {createButton}
            </div>
        );
    }

    static makeComponentsList(descriptor) {
        if (descriptor.name && descriptor.name.length === 2) {
            return <PaginatedEntitiesList descriptor={descriptor}/>;
        } else {
            console.error("No entity name provided");
        }
    }

    static makeCreateButton(descriptor) {
        let createMethod = EntitiesEditor.resolveCreateMethod(descriptor);
        return (
            <div className="row text-center top-sep">
                <button className="btn btn-success"
                        onClick={createMethod}>{descriptor.components.creator.label || "Nuovo"}</button>
            </div>
        );
    }

    static resolveCreateMethod(descriptor) {
        let createMethod = descriptor.components.creator.actionsProvider[EntitiesEditor.beginCreation(descriptor.name[0])];
        if (!createMethod) {
            createMethod = empty;
            console.warn("Cannot find method " + EntitiesEditor.beginCreation(descriptor.name[0]));
        }
        return createMethod;
    }

    static beginCreation(name) {
        return "begin" + camel(name) + "Creation";
    }

}