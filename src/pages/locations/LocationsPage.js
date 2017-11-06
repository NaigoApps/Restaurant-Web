import React, {Component} from 'react';
import Page from "../Page";
import EntitiesEditor from "../../components/editors/EntitiesEditor";
import {SHOWN, TYPES} from "../../components/editors/EntityEditor";
import locationsPageStore from "./LocationsPageStore";
import locationsPageActions from "./LocationsPageActions";
import locationsCreatorActions from "./LocationsCreatorActions";
import locationsEditorActions from "./LocationsEditorActions";
import locationsActions from "../../generic/LocationsActions";

export default class LocationsPage extends Component {

    constructor(props) {
        super(props);
        this.state = locationsPageStore.getState();

        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        locationsPageStore.addChangeListener(this.updateState);

        locationsPageActions.initLocationsPage();
    }

    updateState(state) {
        this.setState(state);
    }

    componentWillUnmount() {
        locationsPageStore.removeChangeListener(this.updateState);
    }

    render() {

        return (

            <Page>
                <EntitiesEditor descriptor={this.getLocationsDescriptor()}/>
            </Page>
        )
    }

    getLocationsDescriptor() {
        return {
            name: ["location", "locations"],
            label: ["Postazione", "Postazioni"],
            renderer: {
                name: l => l.name
            },
            entities: {
                list: this.state.locations,
                selected: this.state.selectedLocation,
                created: this.state.createdLocation
            },
            components: {
                creator: {
                    actionsProvider: locationsCreatorActions
                },
                editor: {
                    actionsProvider: locationsEditorActions
                }
            },
            crudActionsProvider: locationsActions,
            fields: [
                {
                    type: TYPES.STRING,
                    name: "name",
                    label: "Nome"
                },
                {
                    type: TYPES.ENTITY,
                    name: "printer",
                    label: "Stampante",
                    options: this.state.printers,
                    renderer: p => p.name
                },
            ]
        };
    }
}