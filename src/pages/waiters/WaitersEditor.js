import React, {Component} from 'react';
import EntitiesEditor from "../../components/editors/EntitiesEditor";
import {TYPES} from "../../components/editors/EntityEditor";
import waitersEditorActions from "./WaitersEditorActions";
import waitersCreatorActions from "./WaitersCreatorActions";

export default class WaitersEditor extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <EntitiesEditor descriptor={this.getWaitersDescriptor()}/>
        )
    }

    getWaitersDescriptor() {
        return {
            name: ["waiter", "waiters"],
            entities: {
                list: this.props.waiters,
                selected: this.props.selected,
                created: this.props.created
            },
            components: {
                editor: {
                    actionsProvider: waitersEditorActions
                },
                creator: {
                    actionsProvider: waitersCreatorActions
                }
            },
            label: ["Cameriere", "Camerieri"],
            renderer: {
                name: w => w.name + " " + w.surname,
                color: w => {
                    switch (w.status) {
                        case "ATTIVO":
                            return "success";
                        case "SOSPESO":
                            return "warning";
                        case "RIMOSSO":
                            return "danger";
                    }
                    return "default";
                }
            },
            fields: [
                {
                    type: TYPES.STRING,
                    name: "name",
                    label: "Nome"
                },
                {
                    type: TYPES.STRING,
                    name: "surname",
                    label: "Cognome"
                },
                {
                    type: TYPES.STRING,
                    name: "cf",
                    label: "Codice Fiscale",
                },
                {
                    type: TYPES.SELECT,
                    name: "status",
                    optionsProvider: () => this.props.waiterStatuses,
                    label: "Stato"
                }
            ]
        };
    }
}