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

const {fromJS} = require('immutable');

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
        let navContent = LocationsPage.makeNavContent(this.state.data);
        let pageContent = LocationsPage.makePageContent(this.state.data);
        return (
            <Page title="Postazioni">
                {navContent}
                {pageContent}
            </Page>
        )
    }

    static makePageContent(state) {
        if (state.get('selectedLocation')) {
            return <LocationEditor data={LocationsPage.makeLocationEditorDescriptor(state)}/>
        } else if (state.get('createdLocation')) {
            return <LocationCreator data={LocationsPage.makeLocationCreatorDescriptor(state)}/>
        } else {
            return <LocationsNavigator data={state}/>
        }
    }

    static makeLocationEditorDescriptor(data) {
        return fromJS({
            location: findByUuid(data.get('locations'), data.get('selectedLocation')),
            printers: data.get('printers')
        })
    }

    static makeLocationCreatorDescriptor(data) {
        return fromJS({
            location: data.get('createdLocation'),
            printers: data.get('printers')
        })
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
            active={!state.get('selectedLocation') && !state.get('createdLocation')}
            commitAction={locationsEditorActions.deselectLocation}
        />);
        if (state.get('selectedLocation')) {
            elements.push(<NavElement
                key="selected"
                text={findByUuid(state.get('locations'), state.get('selectedLocation')).get('name')}
                active={true}
            />);
        } else if (state.get('createdLocation')) {
            elements.push(<NavElement
                key="selected"
                text={state.get('createdLocation').get('name') || "Nuova postazione"}
                active={true}
            />);
        }
        return <NavPills>{elements}</NavPills>;
    }
}