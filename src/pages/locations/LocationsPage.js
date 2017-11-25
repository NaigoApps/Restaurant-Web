import React, {Component} from 'react';
import Page from "../Page";
import EntitiesEditor from "../../components/editors/EntitiesEditor";
import {COMPONENTS, TYPES} from "../../components/editors/EntityEditor";
import locationsPageStore from "./LocationsPageStore";
import locationsPageActions from "./LocationsPageActions";
import locationsCreatorActions from "./LocationsCreatorActions";
import locationsEditorActions from "./LocationsEditorActions";
import locationsActions from "../../generic/LocationsActions";
import {findByUuid} from "../../utils/Utils";

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

            <Page title="Postazioni">
                <EntitiesEditor descriptor={this.getLocationsDescriptor()}/>
            </Page>
        )
    }

    locationRenderer(l){
        let printer = findByUuid(this.state.printers, l.printer);
        if(printer) {
            return l.name + " (Stampante " + printer.name + ")";
        }else{
            return l.name;
        }
    }

    getLocationsDescriptor() {
        return {
            name: ["location", "locations"],
            label: ["Postazione", "Postazioni"],
            renderer: {
                name: this.locationRenderer.bind(this)
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