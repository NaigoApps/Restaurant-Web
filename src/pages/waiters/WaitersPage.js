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
        let navContent = WaitersPage.makeNavContent(this.state);
        let pageContent = WaitersPage.makePageContent(this.state);
        return (
            <Page title="Camerieri">
                {navContent}
                {pageContent}
            </Page>
        )
    }

    static makePageContent(state) {
        if (state.selectedWaiter) {
            return <WaiterEditor data={WaitersPage.makeWaiterEditorDescriptor(state)}/>
        } else if (state.createdWaiter) {
            return <WaiterCreator data={WaitersPage.makeWaiterCreatorDescriptor(state)}/>
        } else {
            return <WaitersNavigator data={state}/>
        }
    }

    static makeWaiterEditorDescriptor(data) {
        return {
            waiter: findByUuid(data.waiters, data.selectedWaiter),
            statuses: data.waiterStatuses
        }
    }

    static makeWaiterCreatorDescriptor(data) {
        return {
            waiter: data.createdWaiter
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
            key="waiters"
            text="Camerieri"
            active={!state.selectedWaiter && !state.createdWaiter}
            commitAction={waitersEditorActions.deselectWaiter}
        />);
        if (state.selectedWaiter) {
            elements.push(<NavElement
                key="selected"
                text={findByUuid(state.waiters, state.selectedWaiter).name}
                active={true}
            />);
        } else if (state.createdWaiter) {
            elements.push(<NavElement
                key="selected"
                text={state.createdWaiter.name || "Nuovo cameriere"}
                active={true}
            />);
        }
        return <NavPills>{elements}</NavPills>;
    }
}