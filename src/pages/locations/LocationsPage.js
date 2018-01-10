import React, {Component} from 'react';
import Page from "../Page";
import locationsPageStore from "./LocationsPageStore";
import locationsPageActions from "./LocationsPageActions";
import locationsEditorActions from "./LocationsEditorActions";
import {findByUuid} from "../../utils/Utils";
import LocationEditor from "./LocationEditor";
import LocationCreator from "./LocationCreator";
import LocationsNavigator from "./LocationsNavigator";
import NavElementLink from "../../widgets/NavElementLink";
import NavElement from "../../widgets/NavElement";
import NavPills from "../../widgets/NavPills";

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
        let navContent = LocationsPage.makeNavContent(this.state);
        let pageContent = LocationsPage.makePageContent(this.state);
        return (
            <Page title="Postazioni">
                {navContent}
                {pageContent}
            </Page>
        )
    }

    static makePageContent(state) {
        if (state.selectedLocation) {
            return <LocationEditor data={LocationsPage.makeLocationEditorDescriptor(state)}/>
        } else if (state.createdLocation) {
            return <LocationCreator data={LocationsPage.makeLocationCreatorDescriptor(state)}/>
        } else {
            return <LocationsNavigator data={state}/>
        }
    }

    static makeLocationEditorDescriptor(data) {
        return {
            location: findByUuid(data.locations, data.selectedLocation),
            printers: data.printers
        }
    }

    static makeLocationCreatorDescriptor(data) {
        return {
            location: data.createdLocation,
            printers: data.printers
        }
    }

    static makeNavContent(state) {
        let elements = [];
        elements.push(<NavElementLink
            key="settings"
            text="Impostazioni"
            href="/restaurant/settings"
        />);
        elements.push(<NavElement
            key="locations"
            text="Postazioni"
            active={!state.selectedLocation && !state.createdLocation}
            commitAction={locationsEditorActions.deselectLocation}
        />);
        if (state.selectedLocation) {
            elements.push(<NavElement
                key="selected"
                text={findByUuid(state.locations, state.selectedLocation).name}
                active={true}
            />);
        } else if (state.createdLocation) {
            elements.push(<NavElement
                key="selected"
                text={state.createdLocation.name || "Nuova postazione"}
                active={true}
            />);
        }
        return <NavPills>{elements}</NavPills>;
    }
}