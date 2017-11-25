import React, {Component} from 'react';
import waitersPageActions from "./WaitersPageActions";
import Page from "../Page";
import WaitersEditor from "./WaitersEditor";
import waitersPageStore from "./WaitersPageStore";

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
        const waiters = this.state.waiters;
        const waiterStatuses = this.state.waiterStatuses;
        const selectedWaiter = this.state.selectedWaiter;
        const created = this.state.inCreationWaiter;

        return (
            <Page title="Camerieri">
                <WaitersEditor
                    waiters={waiters}
                    waiterStatuses={waiterStatuses}
                    selected={selectedWaiter}
                    created={created}/>
            </Page>
        )
    }
}