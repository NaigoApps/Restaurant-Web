import React, {Component} from 'react';
import waitersPageActions from "./WaitersPageActions";
import Page from "../Page";
import waitersPageStore from "./WaitersPageStore";
import WaiterEditor from "./WaiterEditor";
import WaiterCreator from "./WaiterCreator";
import WaitersNavigator from "./WaitersNavigator";
import {findByUuid} from "../../utils/Utils";
import waitersEditorActions from "./WaitersEditorActions";
import NavPills from "../../widgets/NavPills";
import NavElement from "../../widgets/NavElement";
import NavElementLink from "../../widgets/NavElementLink";

const {Map} = require('immutable');

export default class WaitersPage extends Component {

    constructor(props) {
        super(props);
        this.state = waitersPageStore.getState();

        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        waitersPageStore.addChangeListener(this.updateState);

        waitersPageActions.initWaitersPage();
    }

    componentWillUnmount() {
        waitersPageStore.removeChangeListener(this.updateState);
    }

    updateState(state) {
        this.setState(state);
    }

    render() {
        let navContent = WaitersPage.makeNavContent(this.state.data);
        let pageContent = WaitersPage.makePageContent(this.state.data);
        return (
            <Page title="Camerieri">
                {navContent}
                {pageContent}
            </Page>
        )
    }

    static makePageContent(state) {
        if (state.get('selectedWaiter')) {
            return <WaiterEditor data={WaitersPage.makeWaiterEditorDescriptor(state)}/>
        } else if (state.get('createdWaiter')) {
            return <WaiterCreator data={WaitersPage.makeWaiterCreatorDescriptor(state)}/>
        } else {
            return <WaitersNavigator data={state}/>
        }
    }

    static makeWaiterEditorDescriptor(data) {
        return Map({
            waiter: findByUuid(data.get('waiters'), data.get('selectedWaiter')),
            statuses: data.get('waiterStatuses')
        })
    }

    static makeWaiterCreatorDescriptor(data) {
        return Map({
            waiter: data.get('createdWaiter')
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
            key="waiters"
            text="Camerieri"
            active={!state.get('selectedWaiter') && !state.get('createdWaiter')}
            commitAction={waitersEditorActions.deselectWaiter}
        />);
        if (state.get('selectedWaiter')) {
            elements.push(<NavElement
                key="selected"
                text={findByUuid(state.get('waiters'), state.get('selectedWaiter')).get('name')}
                active={true}
            />);
        } else if (state.get('createdWaiter')) {
            elements.push(<NavElement
                key="selected"
                text={state.get('createdWaiter').get('name') || "Nuovo cameriere"}
                active={true}
            />);
        }
        return <NavPills>{elements}</NavPills>;
    }
}